+++
title = "Math, Emoji and Diagrams in Hugo"
date = "2026-03-20"
description = "Working examples of KaTeX math typesetting, emoji shortcodes, and Mermaid diagrams in Hugo with the Blowfish theme."
tags = ["markdown", "math", "mermaid", "emoji"]
math = true
+++

A practical reference for three content extensions that go beyond basic Markdown: mathematical notation via KaTeX, emoji shortcodes, and Mermaid diagrams.
<!--more-->

---

## Math Typesetting with KaTeX

Enable math on any page by adding `math = true` to the front matter. Hugo uses [KaTeX](https://katex.org/) for rendering.

#### Inline math

Wrap inline expressions with `\\(` and `\\)`.

The famous Euler identity: \\( e^{i\pi} + 1 = 0 \\)

The golden ratio: \\( \varphi = \dfrac{1 + \sqrt{5}}{2} \approx 1.618 \\)

Bayes' theorem: \\( P(A \mid B) = \dfrac{P(B \mid A)\, P(A)}{P(B)} \\)

#### Block math

Wrap block expressions with `$$`.

Quadratic formula:
$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

Normal distribution (Gaussian):
$$
f(x) = \frac{1}{\sigma \sqrt{2\pi}}\, e^{-\frac{1}{2}\left(\frac{x - \mu}{\sigma}\right)^2}
$$

Gradient descent update rule:
$$
\theta_j := \theta_j - \alpha \frac{\partial}{\partial \theta_j} J(\theta)
$$

Matrix multiplication:
$$
C_{ij} = \sum_{k=1}^{n} A_{ik} \cdot B_{kj}
$$

---

## Emoji

Set `enableEmoji = true` in `hugo.toml` (already enabled), then use shorthand codes directly in Markdown.

#### Tech & tools

:rocket: `:rocket:`
:computer: `:computer:`
:gear: `:gear:`
:wrench: `:wrench:`
:bar_chart: `:bar_chart:`
:brain: `:brain:`
:electric_plug: `:electric_plug:`
:cloud: `:cloud:`

#### Status & feedback

:white_check_mark: `:white_check_mark:`
:x: `:x:`
:warning: `:warning:`
:bulb: `:bulb:`
:fire: `:fire:`
:eyes: `:eyes:`
:tada: `:tada:`

#### People & places

:wave: `:wave:`
:handshake: `:handshake:`
:earth_americas: `:earth_americas:`
:house: `:house:`

Full reference: [emoji-cheat-sheet.com](https://www.webfx.com/tools/emoji-cheat-sheet/)

---

## Mermaid Diagrams

Use the `{{</* mermaid */>}}` shortcode. No front matter flag needed — Blowfish loads the Mermaid.js library automatically when the shortcode is present.

#### Flowchart — request routing

{{< mermaid >}}
flowchart LR
    A[Client Request] --> B{Auth Check}
    B -->|valid| C[Rate Limiter]
    B -->|invalid| D[401 Unauthorized]
    C -->|within limit| E[API Handler]
    C -->|exceeded| F[429 Too Many Requests]
    E --> G[(Database)]
    E --> H[Cache]
    G --> I[Response]
    H --> I
{{< /mermaid >}}

#### Sequence diagram — OAuth flow

{{< mermaid >}}
sequenceDiagram
    participant U as User
    participant A as App
    participant O as Auth Server
    participant R as Resource API

    U->>A: Click Login
    A->>O: Authorization Request
    O->>U: Login Page
    U->>O: Credentials
    O->>A: Auth Code
    A->>O: Exchange Code for Token
    O->>A: Access Token
    A->>R: API Call + Token
    R->>A: Protected Resource
    A->>U: Display Data
{{< /mermaid >}}

#### State diagram — deployment pipeline

{{< mermaid >}}
stateDiagram-v2
    [*] --> Pending
    Pending --> Building : trigger
    Building --> Testing : build ok
    Building --> Failed : build error
    Testing --> Deploying : tests pass
    Testing --> Failed : tests fail
    Deploying --> Live : deploy ok
    Deploying --> Failed : deploy error
    Failed --> Pending : retry
    Live --> [*]
{{< /mermaid >}}
