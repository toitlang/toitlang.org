---
title: The future of Toit
date: 2026-11-16
author: Florian Loitsch
description: The road ahead for Toit, from sandboxed execution of agent-written programs to language improvements and broader hardware support.
---

We have just released Toit v2.0.0, and it's natural to think about the future of this project. As Toit's principal maintainer, I want to share the direction I see for the project and the work ahead.

Toit was initially developed in our startup Toitware. Even though the "toitware" brand is still visible in many places - be it copyright, or the GitHub organization that holds most of the Toit packages - Toitware itself doesn't exist anymore. We had to shut down in 2024. Since then, Toit has been developed as an open-source project with contributions from volunteers. There is no indication that this will change: speaking for myself, Toit is still my pet project, and I will continue investing time into it.

At the same time, as agents write more code, the role of a programming language changes. Readability still matters for reviewing their work, but so does the environment in which their code runs. This raises the question: what does this change for Toit?

The way we see it, there are two important reasons for Toit:

1. It's nice to read (especially once used to it). Humans still review code frequently, and having a language that is easier to read makes that process much easier.
2. Toit's containers provide a good starting point for sandboxed execution of code written by agents.

## Syntax and simplicity

One of Toit's goals was always to make it enjoyable for programmers to work in it. It's a high-level language with GC, it has good libraries, and the syntax is very clean (no noisy parentheses or semicolons). These same properties also make it easier to review code in Toit.

There are, however, a few items that we want to improve:

- Generics. They will make the code noisier, but will make code easier to reason about.
- Defer. The current `try/finally` is awkward and heavy. A simple `defer` like in other languages should help us there.
- Exceptions. We want to have a better way to catch and handle exceptions. The design is still open; an approach similar to Java's or Dart's is one option.

## Toit as an AI target

One of the selling points of Toit always was the containerization. This same functionality and architecture make Toit an attractive target for AI generated code. Instead of worrying that a badly written function will bring down the whole embedded system, Toit runs each container with its own heap and execution environment guarding against most crashes.

In the future we would like to improve Toit's containers. While they help contain accidental failures, they aren't secure yet. They are not safe enough to allow a device manufacturer to let their users run code on the chip. We want to change that. Using bytecode verification and more dynamic checks we should be able to provide good isolation. We see a future where, for example, a heat pump is not configured through a few buttons or a rigid Android app, but by an agent writing a program that will run on that machine. It could then adapt its operation to electricity prices, weather forecasts, and occupancy.

For this vision to happen we need to make Toit's VM secure and configurable. Some containers will have full system access. Others might only be allowed to call vetted Toit services. We will also need to enforce limits on memory and CPU usage.

Expect to see more work in that area.

## Desktop

We like writing and reading code in Toit, so we are considering improving some areas that will make Toit a real alternative to scripting languages like Python or Lua. Off the top of my head:

- Foreign function interface.
- Global handling of signals/termination.
- Ahead-of-time compilation to native machine code.

Toit is already a very capable scripting language for the desktop. Closing these remaining gaps will make it even more attractive.

There is also a personal incentive behind this work: it will allow us to rewrite our tooling in Toit. This means that Jaguar, written in Go, will eventually be replaced with a Toit version. The last one to disappear is probably the program behind [pkg.toit.io](http://pkg.toit.io) which is also a Go program.

## Hardware

We have recently added support for the first non-ESP32 architecture: the EC618 (similar to the QCX216 which should also work).

Next in the pipeline:

- Pi Pico
- NRF5340 and NRF52840
- ESP32H2 and ESP32S31

We hope to continue that trend with more and more supported hardware.

At the same time, there is also a noticeable growth in packages for sensors and peripherals. Here too, we hope to continue improving the landscape. I'm really waiting for great NFC support. Hopefully soon.

## Fleet management

[Artemis](https://github.com/toitware/artemis) is still under active development, with the goal of making it less dependent on our own servers. In the future, it will be *much* easier to replace our servers with different backends, some of which might even just be HTTP servers (like GitHub Pages).

This refactoring will make Artemis easier to integrate with systems such as Home Assistant, Cloudflare, and GitHub Pages.

## Outlook

AI is fundamentally changing how software is written, and it has already changed the priorities of this project. We see Toit as a good fit for programs that AI agents want to run on embedded systems due to Toit's containerization, and will primarily focus on that use case. This includes more support for other architectures and chips, as well as improvements to the sandboxing of containers. We also think that Toit is already a good language for reviewing AI generated code, and will continue improving the language itself.

As AI capabilities evolve, we will revisit these priorities. For now, we will work hard to make Toit a programming language and framework we enjoy working in.
