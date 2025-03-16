+++
title = "Why Rust ?"
date = 2025-03-15T18:18:15-07:00
draft = false
+++

It's a question that I've been asked a lot lately, and I think it's worth looking into.
Rust is a systems programming language that runs blazingly fast, prevents segfaults, and guarantees thread safety.
It's a language that's been around for a while, but it's only recently started to gain popularity.
After all it has made it to 14 in the [TIOBE index](https://www.tiobe.com/tiobe-index/)
It is the most admired language in [Stack Overflow Survery for 2024](https://survey.stackoverflow.co/2024/technology/#admired-and-desired)

....  So why Rust? Why now? .....

Some of the core language features that make sense are [here](https://nacharya.github.io/posts/rust_lang/) . 
If you actively use it for a product, you find that 

### Advantages: 

- It is as fast as C, C++ for all systems programming tasks.. Yes, It is. :-)
- Memory safety is way better that even C, C++. Most folks will not believe it until they use it.
- A very strict compiler that enforces `Memory Efficiency`  and fixes bugs at compile time.
- A really good package manager `cargo` that makes it easy to manage dependencies. A large 
  ecosystem of 3rd party libraries in [crates.io](https://crates.io/)
- Once you get past the learning curve, you will find that it is a very productive language.
  that allows you to focus on the high level features, the architecture and the design of the system
- `Rust` Has entered the Linux Kernel Planet 
- [Great community](https://rust.code-maven.com/user-groups)

### Downsides:

- The learning curve is steep. It is not a language that you can pick up in a weekend.
- The compiler is very strict. Some folks may not like it but it is a feature, not a bug.
- Most of the 3rd party libraries are not as mature as those in C, C++ or Python... but they are getting there.
- Threading , Async is not as simple as `go`. The structure is really good with [Tokio](https://tokio.rs/) but not very easy to use
- Evolution continues ......

### Conclusion:

Given that the Big tech companies' use of `rust` is on the rise, if you look at 
the [Rust Foundation](https://foundation.rust-lang.org/) and the [Rust Foundation Blog](https://foundation.rust-lang.org/blog/),
it is clear that `Rust` is here to stay. It is a language that is going to be around for a while.

### Tools:

- VS Code Plugin for Rust, [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
- Neovim Plugin [rust-tools](https://github.com/simrat39/rust-tools.nvim)
- Examples [Rust By Example](https://doc.rust-lang.org/rust-by-example/)

[Install](https://www.rust-lang.org/tools/install) , [Learn](https://www.rust-lang.org/learn) , [Play](https://play.rust-lang.org/?version=stable&mode=debug&edition=2024) and [Contribute](https://www.rust-lang.org/community) to the Rust Ecosystem.


Have fun !! 


