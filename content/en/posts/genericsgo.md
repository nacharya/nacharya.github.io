---
title: "Generics in the Go Language"
date: 2021-12-21T14:37:03-08:00
draft: false
tags: []
categories: []
---

## Generics in Go

Some well known documents from the past

- [Type parameters proposal](https://go.googlesource.com/proposal/+/refs/heads/master/design/43651-type-parameters.md)

- [Why Generics?](https://go.dev/blog/why-generics)

- [The Next Steps](https://go.dev/blog/generics-next-step)

It is December 2021 and ....we have [Go 1.18 beta 1](https://go.dev/blog/go1.18beta1) available.
The Golang team is hard at work on Golang 1.18, which will be released in February 2022, and it looks like it’s going to be a big one.

Once upon a time in C++, when templates were introduced, lots of templates with amazing capabilities came into light, then came STL and standardized most of it to make things extremely powerful and usable.

Hoping Generics will play the same with `go`. It is too early to tell so let's wait and see.

### Playing with Generics in Go

It is always fun to look at simple cases of generics and understand how to utilize the generics.
Here we start defining a collection of of some `type` of elements and call it a type `MArray` ( My Array )

```go
type MArray(type T) struct {
    things []T
}
```

So `MArray` is a collection of things of `type` T. Here "T" is the completely generic `type`

Let's say here is a list of methods we want to write on this generic `Marray`

- <ins> PushBack </ins> : Add a things into the Array
- <ins> Size </ins> : The length of the Array. Similar to the `len` function
- <ins> Append </ins> : Append a thing into the Array
- <ins> GetItem </ins> : Retieve the nth elemen in the Array
- <ins> Map </ins> : Apply a function to each element in `MArray` and returns a new `MArray`
- <ins> RemoveItem </ins> : Remove an nth element from the `MArray` and shrink the Array

#### PushBack & Append

Here is a function for the `MArray` type struct that has one of the T as input and
it appends it into the Array

```go

func (this *MArray(T)) PushBack(e T) *MArray(T) {
  this.things = append(this.things, e)
  return this
}

func (this *MArray(T)) Append(e T) *MArray(T) {
  this.things = append(this.things, e)
  return this
}

```

#### GetItem & RemoveItem

Retrieve the nth element in the Array specified by `i`
Returns the element in the Array of type `T`

```go
func (this *MArray(T)) GetItem(i int) T {
  return this.things[i]
}
```

Let's get things interesting by removing an element from the Array

Remove the nth element of the Array. This example does not care much about ordering,
it is an approach speed of removal is more important than order

```go
func (this *Marray(T)) RemoveItem(i int) *MArray(T) {
    this.things[i] = this.things[len(this.things)-1]
    this.things = this.things[:len(this.things)-1]
    return this
}
```

#### Size & Map

Let's retrieve the length of the Array with the `Size` function

```go
func (this *MArray(T)) Size() int {
  return len(this.things)
}
```

Now let's implement a simple `Map` function
It takes the `MArray` , a function to apply, then it applies the function and
returns a `MArray` resulted after applying the function to each element of MArray

```go
func Map(type F, T)(array MArray(F), f func(F) T) *MArray(T) {
  var retlist MArray(T)
  for i := 0; i < array.Size(); i++ {
    el := array.GetItem(i)
    retlist.PushBack(f(el))
  }
  return &res
}
```

### Conclusions

- If you are a golang developer, you will be able to use Generics soon.
  It will help you write a single codebase for multipel datatype instead of having to
  write the same set of functions for 15 different types.

- Go is a simple language and keeps things that way. Build times are fast, code execution is fast and
  efficient. Generics introduces a trade off but keeps the simplicity.

- Something to look forward to in `go`
