---
title: "Projects"
date: 2021-09-07T18:19:10-08:00
draft: false
---

## Projects

### [Wealth Forecast](https://github.com/nacharya/wfc)

Wealth Forecast is a personal finance and stock prediction application that pulls live market data from Yahoo Finance to build and manage an investment portfolio. It applies machine learning models — SVM, Random Forest, and Linear Regression — to generate financial predictions, letting you compare approaches side by side and arrive at a more robust forecast. The tool works both as a command-line application and as an interactive Jupyter notebook, supporting workflows from quick portfolio snapshots to deeper quantitative analysis of holdings and buy/sell history. A Streamlit-based web interface is also available for a more visual experience.

### [Playground](https://github.com/nacharya/playground)

Playground is a polyglot monorepo built to explore and compare modern languages and frameworks at production quality. It runs six services side by side — Go, Rust, Python, TypeScript, F#, and React — all wired together over a shared gRPC contract defined in Protobuf3, with the full stack orchestrated via Docker Compose. Each service demonstrates idiomatic patterns for its language: Go worker pools and channel pipelines, Rust async/await with Actix-web and Tonic, PyTorch CNN training with live Streamlit charts, TypeScript end-to-end type safety with tRPC and WebSockets, F# discriminated unions and Railway-oriented programming, and React with Zustand, React Query, and drag-and-drop Kanban. Infrastructure-as-code for AWS, Azure, and GCP is included via Terraform modules. It serves as both a learning reference and a living testbed for architectural patterns across the stack.

### [Looma](https://www.looma.education/)

Looma — developed by VillageTech Solutions (founded 1996, rebranded Looma Education in 2019) — is a solar-powered, self-contained educational platform designed to bring high-quality digital learning to schools in rural Nepal with little to no electricity or internet connectivity. The device packages a projector, computer, speakers, and a full offline copy of the Nepali government curriculum into a portable, rugged unit — a "world in a box" — enabling teachers to deliver interactive, media-rich lessons in the most remote classrooms. My involvement spans from 2012 to the present and has touched nearly every layer of the system: early hardware design and field deployment, core software development, cloud enablement to scale content delivery and management, containerization to simplify deployment and updates across distributed devices, and most recently AI and LLM integration to enhance learning experiences. Looma has since been deployed across hundreds of schools, earned recognition from Stanford and international development organizations, and remains one of the most meaningful intersections of technology and human impact I have worked on.
