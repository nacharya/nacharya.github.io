---
title: "Testing Mermaid Diagrams"
date: 2025-01-18
draft: false
description: "A test post to demonstrate Mermaid diagram functionality in Hugo"
mermaid: true
---

This post demonstrates how to use Mermaid diagrams in your Hugo site. There are two ways to include Mermaid diagrams:

## Method 1: Using Code Fences

You can use standard markdown code fences with the `mermaid` language identifier:

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

## Method 2: Using the Mermaid Shortcode

You can also use the custom shortcode:

{{< mermaid >}}
sequenceDiagram
participant Alice
participant Bob
Alice->>John: Hello John, how are you?
loop Healthcheck
John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts prevail!
John-->>Alice: Great!
John->>Bob: How about you?
Bob-->>John: Jolly good!
{{< /mermaid >}}

## More Complex Example

Here's a more complex flowchart:

```mermaid
flowchart LR
    A[Start] --> B{Is it?}
    B -->|Yes| C[OK]
    C --> D[Rethink]
    D --> B
    B ---->|No| E[End]
```

## Class Diagram Example

```mermaid
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    class Cat {
        +boolean indoor
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat
```

All diagrams should render properly and adapt to your site's theme automatically.
