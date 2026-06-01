---
title: "Conda and pip are two ecosystems, not just tools"
slug: "2026-05-07-conda-and-pip-ecosystems"
authors: [forgottenprogramme]
tags: [conda, pip, packaging ecosystems, python packaging]
description: "`conda` and `pip` are two parallel ecosystems trying to solve different problems rather than two competing tools"
image: img/blog/2026-04-06-march-releases/banner.jpg
---


## Preface

This post is adapted from a talk I gave at PyConDE & PyData 2026.

In it, I walk through the evolution of Python packaging, from `distutils` to `pip`, and later to `conda`, and how these tools emerged in response to different needs within the Python community.

The ideas in this post are based on my experience as a maintainer in the conda ecosystem and conversations I’ve had with users and contributors over time. A recurring theme in those discussions is the tendency to frame `conda` and `pip` as competing tools.

What I’ve found more useful is to view them instead as parts of different ecosystems, shaped by different constraints and priorities. That perspective also helps explain why mixing them can sometimes lead to unexpected behavior in practice.

This post is an attempt to share that perspective in a more structured form.

<!-- truncate -->

# Conda and Pip: A Story of Two Ecosystems

If you've spent any time in the Python world, you've probably heard some version of this question:

> "Should I use `conda` or `pip`?"

It usually comes up framed as a debate, sometimes even a heated one. People pick sides, compare features, and argue about which tool is "better."

But that framing misses something fundamental.

**`conda` and `pip` were never meant to compete in the first place.**

---

## How We Got Here

To understand why, it helps to take a step back and look at how Python packaging evolved.

In the early days, Python came with `distutils`, a module that let developers distribute and install software. If you wanted to install a package, you'd typically run something like `python setup.py install`. It worked, but just barely. There was no concept of uninstalling a package, no way to track dependencies, and improvements moved slowly because it was tied to Python's release cycle.

Frustration with these limitations led to the creation of `setuptools` in 2004. It extended distutils and introduced Easy Install, one of the first tools that could fetch packages from PyPI, the Python Package Index. For the first time, dependency management became part of the story, though still incomplete. Uninstalling packages, however, was still not really possible.

Then came `pip` in 2008, and things started to feel more modern. `pip` added proper uninstall support, better dependency handling, and, something people really appreciated at the time, clearer error messages. Around the same time, `virtualenv` introduced isolated environments, which solved a growing problem: everything had previously been installed into a single global directory. That meant different projects could easily break each other.

With virtual environments, each project got its own isolated space. Suddenly, it was possible to work on multiple projects without dependency conflicts. `pip` and `virtualenv` together became the standard workflow for a large part of the Python community.

---

## The Gap `pip` Didn't Fill

For many developers, this combination was more than enough. But there was an entire group of users for whom it wasn't.

Scientific computing introduced a different set of challenges. Libraries like `NumPy` and `SciPy` rely heavily on compiled `C` and `Fortran` code. Early versions of `pip` didn't handle these non-Python dependencies well, which meant users often had to install system-level libraries manually. That process could be fragile, confusing, and platform-dependent.

This is the context in which `conda` was created in 2012 by Anaconda, Inc. (at the time called Continuum Analytics).

`conda` took a different approach from the beginning. It was not limited to Python packages. Instead, it was designed as a general-purpose package and environment manager that could handle both Python and non-Python packages.

That meant it could install and manage compiled libraries like `C` and `Fortran` dependencies in the same way it handled Python packages.

And that difference in design philosophy is crucial.

**`conda` wasn't trying to be a better version of `pip`. It was trying to solve a different problem.**

---

## Tools vs Ecosystems

Once you see that, the "Conda vs `pip`" debate starts to feel a bit misplaced.

A more useful way to think about them is as **ecosystems**, not tools.

When you start thinking about `conda` and `pip` in terms of ecosystems, it becomes clear that they have different objectives and different design constraints. As a result, different tools naturally emerge within each ecosystem.

For example, newer tools like **uv** and **Poetry** belong to the `pip` ecosystem, while tools like **mamba** and **pixi** belong to the `conda` ecosystem.

---

## Differences

There are architectural and distributional differences between the two ecosystems.

- **Package formats**
  `conda` packages are distributed in `.conda` or `.tar.bz2` formats. In the pip ecosystem, packages are distributed mainly as `.whl` (wheel files) or `.tar.gz` source distributions.

- **Metadata structures**
  Both ecosystems ship packages with "metadata" that helps package managers understand how to install and resolve dependencies, but they organize it differently. Each ecosystem uses its own directory structure and conventions for storing this information.

- **Package locations**
  `conda` packages are distributed through *channels* such as `conda-forge` and `mains`. `pip` packages, on the other hand, are distributed through package *indices*, most notably PyPI (Python Package Index).

- **Package distribution**
  Packages on PyPI are typically uploaded by the original authors.
  On the conda side, packages are distributed through channels. `conda-forge` performs downstream repackaging, and both authors and non-authors can upload packages there. There is however a "screening process" before packages can become available on `conda-forge`.
  The Anaconda `main` channel is restricted, and only Anaconda engineers can publish packages to it.

- **Non-Python dependencies**
  Packages on PyPI are typically uploaded by the original authors.
  On the conda side, packages are distributed through channels. `conda-forge` performs downstream repackaging, and both authors and non-authors can upload packages there. There is however a "screening process" before packages can become available on `conda-forge`.
  The Anaconda `main` channel is restricted, and only Anaconda engineers can publish packages to it.


---

## When Worlds Collide

Problems start to appear when these ecosystems are mixed without understanding how they interact.

At first glance, using `pip` inside a `conda` environment might seem harmless. In fact, it's quite common. But under the hood, the two tools don't share information with each other. `conda` keeps track of what it installs, and `pip` keeps track of what it installs, but neither fully understands the other.

This can lead to subtle and confusing issues. For example, `conda` may list a package as installed even after `pip` has removed it. Or `conda` might refuse to update a package because it doesn't recognize how it was installed. From the user's perspective, everything looks inconsistent, and debugging becomes frustrating.

What makes this especially tricky is that the errors don't always point clearly to the root cause. You might see a failure in your code and not realize it stems from a mismatch between package managers.

---

## Why Mixing Still Happens

Despite these pitfalls, people continue to mix `conda` and `pip`, and often for good reasons.

One of the biggest factors is sheer scale. PyPI hosts hundreds of thousands of packages, far more than what's available in `conda` channels. Inevitably, you'll encounter a package that exists only on PyPI.

Another reason is version availability. Even when a package exists in `conda`, the latest version might not be there yet. If you need that specific version, `pip` becomes the quickest option.

And then there's the reality of learning and experimentation. Developers often follow tutorials, copy commands from forums, and try different solutions until something works. In the process, it's easy to end up with a mix of tools, and a fragile environment.

---

## Bridging the Gap

Recognizing this reality, the community has been exploring ways to improve interoperability between the two ecosystems.

One of the latest efforts is [`conda-pypi`](https://github.com/conda/conda-pypi), which brings PyPI packages into the standard `conda` workflow. Instead of reaching for `pip`, users can install compatible PyPI wheels directly through `conda`, with PyPI wheels handled as first-class artifacts alongside traditional `conda` packages.

This approach preserves the consistency and reliability that `conda` environments are known for, while giving users access to the broader pure Python ecosystem on PyPI.

It also adds guardrails to help maintain environment consistency. When enabled, it can block accidental pip install commands that could otherwise introduce conflicts or leave the environment in an unpredictable state, encouraging a more reliable and reproducible workflow.

`conda-pypi` represents an important shift in how the ecosystem thinks about interoperability: rather than treating PyPI and `conda` as competing worlds, it acknowledges that users often need both, and provides tooling designed to make that interaction smoother and safer.

---

## A Shift in Perspective

If there's one idea I hope you take away from this, it's this:

**Stop thinking in terms of "which tool is better."**

Start thinking in terms of ecosystems and context.

When you understand the problems each ecosystem was designed to solve, their differences start to make sense. You become more intentional about your choices, and less frustrated when things behave the way they do.

And perhaps most importantly, you begin to see the bigger picture.

Tools come and go. New ones will replace old ones. But ecosystems, the communities, ideas, and design principles behind them, tend to last much longer.
