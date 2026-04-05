+++
title = "Async Rust with Tokio: Futures, Streams, and Channels — and How They Compare to Go"
date = 2026-04-05T10:00:00-07:00
draft = false
description = "A deep dive into Rust's async model — Futures, Tokio, Streams, and Channels — with direct comparisons to Go goroutines, channels, and context cancellation."
tags = ["rust", "go", "async", "tokio", "concurrency"]
+++

Go's concurrency model is famously approachable: goroutines are lightweight, channels are built into the language, and `context` handles cancellation without much ceremony. But Rust's async story — built on stackless futures, the Tokio runtime, and a rich channel ecosystem — is compelling in a different way. It pushes more decisions to compile time, eliminates data races by construction, and delivers higher concurrency density with less memory.

This post works through Rust async from first principles and puts it side-by-side with Go at every step.

<!--more-->

---

## The Model: Stackless Futures vs Stackful Goroutines

Every Go goroutine gets its own stack — initially small (around 2 KB), but able to grow. The scheduler is preemptive: the runtime can pause a goroutine at any point and run another. You write sequential-looking code and the runtime handles everything.

```go
go func() {
    result := fetchData()   // blocks this goroutine, not the OS thread
    process(result)
}()
```

Rust futures are **stackless**. The compiler transforms an `async fn` into a state machine — a struct that captures all the local variables needed to resume at the next `.await`. No stack allocation per task. The Tokio runtime _polls_ these state machines: a task runs until it hits an `.await` that can't complete yet, then yields back to the scheduler.

```rust
tokio::spawn(async {
    let result = fetch_data().await;   // explicit yield point
    process(result).await;
});
```

**What this means in practice:**

| | Rust / Tokio | Go |
|---|---|---|
| Suspension points | Explicit — every `.await` | Implicit — runtime decides |
| Memory per task | ~100 bytes (state machine) | ~2 KB (initial stack) |
| Data races | Impossible — borrow checker | Possible — `go vet` / `-race` helps |
| Scheduling | Cooperative, work-stealing | Preemptive, work-stealing |
| Recursion in async | Requires `Box::pin` | Works naturally |

The tradeoff: Go is easier to write. Rust gives you tighter control and higher concurrency density at the cost of more explicit code.

---

## Spawning Tasks

### Go

```go
go func() {
    fmt.Println("hello from goroutine")
}()
```

Goroutines fire and forget. Returning a value requires a channel.

### Rust

```rust
let handle = tokio::spawn(async {
    42  // the task's return value
});

let result = handle.await.unwrap();  // JoinHandle<i32>
println!("result: {}", result);
```

`tokio::spawn` returns a `JoinHandle<T>` — a typed, awaitable handle to the task's result. The task runs concurrently; `.await` on the handle blocks until it completes.

**Key difference**: In Go, you must route results through a channel manually. In Rust, the task's return value is part of the type system from the start.

---

## Channels

Rust's `tokio::sync` module provides three flavours of channel, each with a distinct contract:

### mpsc — Multi-Producer, Single-Consumer

The Go default: many senders, one receiver. Tokio makes the buffer bound explicit.

**Go**
```go
ch := make(chan string, 32)   // buffered

go func() {
    ch <- "ping"
}()

msg := <-ch
fmt.Println(msg)
```

**Rust**
```rust
use tokio::sync::mpsc;

let (tx, mut rx) = mpsc::channel::<String>(32);
let tx2 = tx.clone();   // clone the sender — receiver stays unique

tokio::spawn(async move {
    tx.send("ping".into()).await.unwrap();
});

tokio::spawn(async move {
    tx2.send("pong".into()).await.unwrap();
});

while let Some(msg) = rx.recv().await {
    println!("{msg}");
}
// loop exits cleanly when all Senders are dropped — no explicit close needed
```

Go channels need an explicit `close(ch)` to terminate a `range` loop. Rust's mpsc channel closes automatically when the last `Sender` is dropped — the receiver sees `None`.

---

### oneshot — Single Value, Request/Response

Go has no oneshot primitive. The idiom is a buffered channel of size 1:

**Go**
```go
reply := make(chan int, 1)

go func() {
    reply <- expensiveWork()
}()

result := <-reply
```

**Rust**
```rust
use tokio::sync::oneshot;

let (tx, rx) = oneshot::channel::<i64>();

tokio::spawn(async move {
    let result = expensive_work().await;
    tx.send(result).ok();   // send is not async — fires and forgets
});

match rx.await {
    Ok(result) => println!("got {result}"),
    Err(_)     => println!("sender dropped before sending"),
}
```

The Rust version is explicit about the contract: exactly one value, exactly once. If the sender is dropped before sending, the receiver gets `Err` — no silent deadlock.

---

### broadcast — Fan-Out to Many Receivers

Go channels are single-consumer. Broadcasting to multiple goroutines requires a separate pattern (a sync loop that forwards to per-goroutine channels). Tokio provides this natively:

**Go (manual fan-out)**
```go
func broadcast(in <-chan string, consumers int) []<-chan string {
    outs := make([]chan string, consumers)
    for i := range outs {
        outs[i] = make(chan string, 16)
    }
    go func() {
        for msg := range in {
            for _, out := range outs {
                out <- msg   // every consumer gets every message
            }
        }
        for _, out := range outs { close(out) }
    }()
    // return as read-only
    result := make([]<-chan string, consumers)
    for i, o := range outs { result[i] = o }
    return result
}
```

**Rust**
```rust
use tokio::sync::broadcast;

let (tx, _) = broadcast::channel::<String>(16);

for id in 0..3 {
    let mut rx = tx.subscribe();   // each subscriber gets every message
    tokio::spawn(async move {
        while let Ok(msg) = rx.recv().await {
            println!("subscriber {id}: {msg}");
        }
    });
}

tx.send("hello everyone".into()).unwrap();
```

`broadcast::channel` is a first-class primitive. Subscribers that fall too far behind get a `RecvError::Lagged` error rather than silently blocking the sender.

---

## Streams — Async Iterators

Go uses channels as lazy sequences: a goroutine generates values, the caller ranges over the channel. Works well, but channels are not composable — there's no built-in `.map`, `.filter`, or `.take`.

**Go (channel as stream)**
```go
func naturals(ctx context.Context) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := 0; ; n++ {
            select {
            case out <- n:
            case <-ctx.Done():
                return
            }
        }
    }()
    return out
}

ctx, cancel := context.WithTimeout(context.Background(), time.Second)
defer cancel()

for n := range naturals(ctx) {
    fmt.Println(n)
}
```

**Rust (Stream with combinators)**
```rust
use tokio_stream::{self as stream, StreamExt};
use std::time::Duration;

let s = stream::iter(0..)
    .filter(|n| n % 2 == 0)        // keep even numbers
    .map(|n| n * n)                 // square them
    .take(5)                        // stop after 5
    .throttle(Duration::from_millis(100));  // rate limit

tokio::pin!(s);
while let Some(val) = s.next().await {
    println!("{val}");   // 0, 4, 16, 36, 64
}
```

Rust streams compose like iterators. You build a lazy pipeline — nothing runs until you call `.next().await`. The `StreamExt` trait brings `.map`, `.filter`, `.take`, `.chunks`, `.throttle`, `.timeout`, and more.

---

## Cancellation: `select!` vs Context

Go's cancellation model passes a `context.Context` explicitly through every call. Any function that should be cancellable accepts a `ctx` argument and checks `ctx.Done()`.

**Go**
```go
ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()

select {
case result := <-doWork(ctx):
    fmt.Println("done:", result)
case <-ctx.Done():
    fmt.Println("timed out:", ctx.Err())
}
```

This is clean and readable. The downside: every function in the chain must accept and thread the context — it's a convention, not enforced by the compiler.

**Rust**
```rust
use tokio::time::{sleep, Duration};

tokio::select! {
    result = do_work() => {
        println!("done: {result:?}");
    }
    _ = sleep(Duration::from_secs(5)) => {
        println!("timed out");
        // do_work() future is dropped here — cancellation is implicit
    }
}
```

In Rust, dropping a future cancels it. When `select!` picks the timeout branch, the `do_work()` future is immediately dropped — its destructor runs, releasing any held resources. No explicit cancellation token threading required.

For deeper cancellation (propagating into subtasks), Rust uses a `CancellationToken` from `tokio_util`:

```rust
use tokio_util::sync::CancellationToken;

let token = CancellationToken::new();
let child = token.child_token();

tokio::spawn(async move {
    tokio::select! {
        _ = child.cancelled() => println!("subtask cancelled"),
        _ = do_subtask()      => println!("subtask done"),
    }
});

// elsewhere:
token.cancel();   // propagates to all child tokens
```

---

## Structured Concurrency: JoinSet vs errgroup

Running N tasks and waiting for all of them — with error collection.

**Go (errgroup)**
```go
import "golang.org/x/sync/errgroup"

g, ctx := errgroup.WithContext(context.Background())
g.SetLimit(4)   // at most 4 concurrent

for i := 0; i < 10; i++ {
    i := i
    g.Go(func() error {
        return process(ctx, i)
    })
}

if err := g.Wait(); err != nil {
    log.Fatal(err)
}
```

**Rust (JoinSet)**
```rust
use tokio::task::JoinSet;

let mut set = JoinSet::new();

for i in 0..10_u32 {
    set.spawn(async move { process(i).await });
}

while let Some(res) = set.join_next().await {
    match res {
        Ok(val) => println!("ok: {val}"),
        Err(e)  => eprintln!("task panicked: {e}"),
    }
}
// all tasks are joined (or aborted) before `set` is dropped
```

`JoinSet` aborts all running tasks when it is dropped — structured concurrency is enforced by ownership, not convention.

---

## A Complete Example: Pipeline with Fan-Out

Workers pull jobs from a shared queue, process them concurrently, and funnel results to a single collector.

**Go**
```go
func pipeline(jobs []int) []int {
    in := make(chan int, len(jobs))
    for _, j := range jobs { in <- j }
    close(in)

    out := make(chan int, len(jobs))
    var wg sync.WaitGroup

    for w := 0; w < 4; w++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for j := range in {
                out <- j * j
            }
        }()
    }

    go func() { wg.Wait(); close(out) }()

    var results []int
    for r := range out { results = append(results, r) }
    return results
}
```

**Rust**
```rust
use tokio::sync::mpsc;
use tokio::task::JoinSet;

async fn pipeline(jobs: Vec<i64>) -> Vec<i64> {
    let (tx, mut rx) = mpsc::channel::<i64>(64);
    let mut set = JoinSet::new();

    for chunk in jobs.chunks(jobs.len().div_ceil(4)) {
        let tx = tx.clone();
        let chunk = chunk.to_vec();
        set.spawn(async move {
            for j in chunk {
                tx.send(j * j).await.ok();
            }
        });
    }
    drop(tx);   // close the sender side once all workers are spawned

    let collector = tokio::spawn(async move {
        let mut results = Vec::new();
        while let Some(r) = rx.recv().await { results.push(r); }
        results
    });

    set.join_all().await;   // wait for all workers
    collector.await.unwrap()
}
```

The Rust version makes the ownership of the sender explicit: cloning `tx` for each worker, then `drop(tx)` to signal that no more messages are coming — no `close(out)` in a separate goroutine.

---

## Summary

| Capability | Go | Rust / Tokio |
|---|---|---|
| Spawn a task | `go func()` | `tokio::spawn(async { })` |
| Multi-producer channel | `make(chan T, n)` | `mpsc::channel(n)` |
| Single-value response | buffered `chan T` (size 1) | `oneshot::channel()` |
| Broadcast to N | manual forwarding loop | `broadcast::channel(n)` |
| Lazy async sequences | channel + goroutine | `Stream` + combinators |
| Timeout / cancellation | `select` + `context` | `tokio::select!` + drop semantics |
| Wait for N tasks | `errgroup` | `JoinSet` |
| Data race prevention | `-race` flag at runtime | borrow checker at compile time |

Go wins on **simplicity and readability** — the mental model is smaller and the language does more for you. Rust wins on **correctness guarantees and resource efficiency** — data races are compile errors, tasks are cheaper per unit, and the type system prevents misuse of channels.

For network services handling tens of thousands of concurrent connections, Rust async's lower per-task overhead becomes significant. For most backend services where developer velocity matters more than microseconds, Go remains an excellent choice.
