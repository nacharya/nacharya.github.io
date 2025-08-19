---
title: "Mermaid Test Simple"
date: 2025-08-18
draft: false
description: "Simple test for Mermaid diagrams"
mermaid: true
---

## Simple Diagram Test

This should render as a diagram:

```mermaid
graph TD
    A[Start] --> B[End]
```

## Using Shortcode

{{< mermaid >}}
graph LR
X[Input] --> Y[Output]
{{< /mermaid >}}

Both should render as actual diagrams, not code blocks.
