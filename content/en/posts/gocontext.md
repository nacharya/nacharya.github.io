+++ 
draft = false
date = 2023-09-28T14:36:37-07:00
title = "Go: Contexts, Channels & Goroutines"
tags = ["go"]
categories = []
+++


## Go: Contexts, Channels & Goroutines

### Concurrency

In Computer Science `Concurrency` is  very important because efficient resource management of core resources like Processor, Memory and Network usage. Any large complex probelem can be broken down into smaller problem tasks that can be handled concurrently. This also allows applications to be faster and scale efficiently. 

When tasks can be broken down into smaller tasks, responsiveness of systems can be enhanced and also create better human interactiveness. 

Concurrency is one of a fundamental aspect of `go` programming language. Three core features in `go` language that are very important are:

#### __Subroutines__

Also known as `goroutine` , it is a lightweight execution thread and a function that executes concurrently with the rest of the program. Compared to threads, `goroutines` are extremely cheap, have a very low overhead and are widely used. 

#### __Channels__

It is a mechanishm that allows multiple `goroutines` to communicate bi-directionally in a very effective manner completely lock-free

It can almost be viewed as a commonly used unix `pipe`

#### __Context__

Context provides a mechanism to control the lifecycle, cancellation, and propagation of requests across multiple goroutines.

`context` is a standard package of Golang that makes it easy to pass request-scoped values, cancelation signals, and deadlines across API boundaries to all the goroutines involved in handling a request.

### Examples

Code examples always makes the concepts look very clear. 

#### Context : TODO

The simplest way of using a `context` is the use of `context.TODO()`.

```go
import "context"

func doWork(ctx context.Context) {
    fmt"Work Done!"
}

func main() {
    ctx :=  context.TODO()
    doWork(ctx)
}
```

This form of `context` use is very handy if you are passing any information across layers but needs to call a API with context for immediate things t get done. 

#### Context : WithValue

Here is an example use of adding data into context and using it in multiple layers

```go

import (
    "context"
)

func PlaceSecrets(ctx context.Context) context.Context {
    return ctx.WithValue(ctx, "openapi-key", "adasd123113dsd33")
}

func doWork(ctx context.Context) {
    apiKey := ctx.Value("openapi-key")
    ChatGPT_APICall(apiKey)
}

func main() {
    ctx := context.Background()
    ctx = PlaceSecrets(ctx)
    doWork(ctx)
}
```


#### Context: WithTimeout

There are many use case scenarios where systems should be designed to fail if a certain deadline is not met. 

Let's conside the following example

```go

// forever loop that keep doing the work 
func doWork(ctx context.Context) {
    for {
        select {
        case <-ctx.Done():
            // this goroutine gets this if the timeout exceeded
            err := ctx.Err()
            fmt.Println("Timed out: ", err)
            return
        default:
            // kee doing this work in a forever loop
            fmt.Println("Working...")
        }
        time.Sleep(100 * time.Millisecond)
    }
}


func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
    defer cancel()
    // Let's spin off a subrutine to do the work 
    go doWork(ctx)
    select {
    case <-ctx.Done():
        fmt.Println("Timeout Exceeded")
    }
}
```

As you can see, there is good case of the use of a `timeout` when a `goroutine` is assigned a task to work on. If the timeout exceeds, the `goroutine` terminates cleanly.


#### Goroutines: Special word `go`

Here is a very simple example 

```go

func doWork() {
    for i:=0; i < 20; i++ {
        fmt.Println("Working ...")
    }
    fmt.Println("Work over")
}

func main() {
    fmt.Println("main starts")
    go doWork()
    fmt.Println("main sleeps")
    time.Sleep(5 * time.Second)
    fmt.Println("main ends")
}
```

As you can see, the `doWork` here is spun  off as if it was a `thread->Create`. This is much more lightweight but it is the same concept. 

#### Channel

```go
package main

import "fmt"

func HttpServer(port string) {
    // will contain and HTTP server listener
    // Please refer to Gin, Mux frameworks
}

func ReceiveCloudMessages(dataStream chan string) {
    // Cloud API to receive messages e.g. AWS SQS
    str := aws.ReceiveMessage()
    // Now we place it in the channel
    dataStream <- str
}

func main() {

  // Spin off a Webserver in a goroutine
  go HttpServer(":8080")

  // create a stream that received messages from a Cloud service
  // generic string message types 
  // We also create a goroutine that receives messages from a cloud service
  newStream := func() <-chan string {
    edStream := make(chan string)
    go ReceiveCloudMessages(edStream)
    return edStream
  }
  dataStream := newStream()

  // now we loop forever reading from the channel
  // and simply printing it
  for {
    rcvMessage, ok := <-dataStream
    if ok {
        fmt.Println("Received: ", rcvMessage)
    }
    time.Sleep(3 * time.Second)
  }
  
}
```

Here the `goroutine` that receives messages from a Cloud Service ( e.g. AWS SQS ) and 
places them in the channel. The main thread is looping reading throgh the channel.
It then prints the message received in the channel


