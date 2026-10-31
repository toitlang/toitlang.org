---
title: Toit v2.0.0
date: 2026-10-31
author: Florian Loitsch
description: Celebrating Toit v2.0.0 after more than four years of alpha development.
---

After more than four years of alpha development, 2,000+ commits, 500,000+ lines changed, and 200+ alpha releases, Toit [v2.0.0](https://github.com/toitlang/toit/releases/tag/v2.0.0) is finally here.

Toit began as closed-source software developed by Toitware. It later became an open-source project, and volunteers have continued improving it even after Toitware shut down in 2024.

Despite the "alpha" label, Toit has been stable for a long time. Two things kept us from calling it v2.0.0: we still had some breaking changes planned, and there was always another important feature we wanted to include.

Recently, we landed a refactoring that lets peripheral APIs accept pin numbers directly instead of requiring `gpio.Pin` objects. That was the last major breaking change on our list for v2.0.0.

As for waiting until all the important features are finished: we have accepted that this moment will never come. Even now, there are open PRs for a formatter, compiler resolution improvements, and support for more architectures, among other major features. Those will follow in future releases.

Here are a few highlights since Toit was open-sourced:

- Broader hardware support, including the Arm-based EC618 and almost all ESP32 variants.
- A unified `toit` command and improvements that make Toit a more capable desktop scripting language.
- A rewritten package manager and a growing package ecosystem.
- Mixins for sharing implementations across classes.
- Firmware envelopes, allowing users to customize their firmware without rebuilding the SDK.
- Compiler and runtime improvements.
- Significantly better hardware testing.
- Syntax highlighting for Toit on GitHub.

Enjoy!
