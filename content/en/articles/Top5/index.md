---
title: "Top 5 Software Architectural Patterns"
date: 2023-11-16T10:22:22-08:00
draft: false
---


## Top 5 Software Architectural patterns

Software Architectures are the foundations to Software systems. Choice and correct use of 
an appropriate pattern is really important when building large software systems

### 1. Layered Architecture

A system is separated into sub-systems as distictictly different layers that communicates 
to each other layer it is adjacent to. 

A very common example of Architecture is the following list of layers

- Presentation Layer 
- Business Layer 
- Persistence Layer 
- Database Layer 

![](/images/layered_pic.png)


A very widely used pattern that includes UI patterns like MVP as it allows for the 
separation of Data Layer, Business Logic layer and User Presentation (UI) layers
Each layer having a distinct responsibility makes it so the changes in one layer 
will only impact the adjacent layer and not all the components of the system

Iterative development of each layer warrants the compatibility changes with adjacent
layers


### Event Driven Architecture

Production and consumption of `events` between losely coupled softare components. 
The software components that produce and consume events can be very diverse but they 
can still function incredibly well for high-traffic scalable systems. 

It also allows for minimizing the dependencies to the `event` structures within certain 
categories ( `topic` ) only. 

![](/images/events_pic.png)


One commonly used and discussed widely pattern is the CQRS pattern. This patterns allows for the 
separation of write-operations ( commands ) and read-operations ( queries ). 
In GraphQL terminology, read-operations are `Queries` and write-operations are `Mutations`

One of the most important middleware here is the MessageBroker or the Pub-Sub system that all
software systems communicate through. Most commonly used ones are:
Kafka, RabbitMQ
and most commonly used protocols are:
MQTT, AMQP and STOMP


### Microservices Architecture 

In this pattern , software application is developed as a collection of services. 
In this model, It provides the framework to develop, deploy, and maintain microservices
architecture diagrams and services independently.

![](/images/microservices_pic.png)

Much of the structures around Cloud Engineering have very good automation for building 
and deploying microservices to live systems withot any downtime. 

As a modern application pattern, this is certainly one of the best patterns that
we use these days ( 2023 ) 


### Microkernel Architecture 

Here we separate the main part of the software system into a `core` component 
and surround it with components we call `Plug-in` . 
All plugins are dependent on the core itself but isolates the dependencies across
plugins.

![](/images/microkernel_pic.png)


Software lifecycle of the `core` and the `Plug-in` can be very different here. e.g. In the traditional OS, the device drivers are like `Plug-in`  and can have their own software lifecycle.

### Monolithic Architecture 

This pattern is the traditional model of designing sofftware applications. In this model 
softwae application is developed as a single unit, one single codebase but with many different 
subcomponents organized in the same codebase. 

![](/images/monolithic_pic.png)

All the software components in a monolithic system are interdependent
Monolitic pattern based systems are geared towards high-performance, simplicity and 
a broad support for underlying hardware systems that it is dependent on. 



