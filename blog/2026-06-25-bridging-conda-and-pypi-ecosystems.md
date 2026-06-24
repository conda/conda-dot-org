---
title: "Bridging conda and PyPI ecosystems: Install PyPI packages with conda install"
slug: "2026-06-25-bridging-conda-and-pypi-ecosystems"
authors: [dashagurova]
tags: [conda, pip, PyPI, conda-pypi]
description: |
    conda-pypi beta enables conda CLI to install pure Python packages from PyPI natively and alongside conda packages in a single dependency solve, without a separate pip step
image: img/blog/2026-06-25-bridging-conda-and-pypi-ecosystems/conda-pypi-logo.png
---

Here is a situation a lot of conda users know: you are working in conda environment, you reach for one more package, and it isn't in any conda channel you have configured. The conda way forward isn't obvious, so you run `pip install <some-package>`. The package installs successfully, your work continues, and the decision appears harmless. Then, perhaps the following day or several months later, the environment breaks while you are installing, updating, or removing something that seems completely unrelated.

<!-- truncate -->

After spending an afternoon tracing the problem, you discover that there is an entire body of tribal knowledge around using `conda` and `pip` in the same environment: install conda first and pip last, pin this, don't touch that, special cases on top of special cases. Follow all of it and you can usually keep an environment standing, but what you're left with is fragile, a careful multi-step routine you have to maintain by hand and hope no one else disturbs.

The conda community has been working on [various approaches](https://conda.github.io/conda-pypi/why/potential-solutions/) to this problem, and we are very excited for you to try our latest project. Starting in `conda 26.5.0`, you can **opt into the conda-pypi beta**, in which conda's solver knows about pure Python packages hosted on PyPI.org and can install them natively, in the same solve as your conda packages, with no pip step and no broken environment waiting for you later.

## Why mixing conda and pip breaks things

Because both conda and pip install Python packages, it is natural to think of them as interchangeable tools for the same job. The important difference is that pip installs Python packages, while conda manages a broader environment that can include the Python interpreter, compiled C and Fortran libraries, command line programs, and other non Python dependencies. Conda resolves those components together and records what it installed in conda-meta.

Consider an environment in which conda installs `numpy` and records a consistent set of packages. Later, pip installs another package that requires a different version of `numpy` and changes files in `site-packages`. Pip does not update conda-meta, because conda's internal record is outside pip's responsibility. The files in the environment and conda's understanding of the environment may now disagree.

When conda next solves the environment, it reasons from metadata that may no longer describe what is actually installed. The resulting failure can appear during an operation far removed from the pip command that introduced the inconsistency, which is one reason these problems can be so difficult to diagnose.

Neither tool has behaved incorrectly, but the environment broke anyway. The problem is that two package managers have modified the same environment while maintaining separate models of its contents. Mahe Iram Khan explains this distinction in [*Conda and pip are two ecosystems, not just tools*](https://conda.org/blog/2026-05-07-conda-and-pip-ecosystems), and the [*Conda ≠ PyPI: Why Conda Is More Than a Package Manager*](https://conda.org/blog/conda-is-not-pypi) series by Jannis Leidel and Daniel Bast examines the differences between the ecosystems in more depth.

So the question, then, is how can `conda` make packages from PyPI available without giving up its coherent model of the environment? Our answer is this conda-pypi beta!

## conda-pypi beta: native Python wheel support

Conda-pypi beta makes pure Python wheels a first-class package format that conda channels can describe and conda clients can install. The specification behind it is the [Repodata Wheel support](https://github.com/conda/ceps/pull/145) Conda Enhancement Proposal, and the design discussion is still open if you want to read it or get involved. This beta is the first implementation of that spec: the conda-pypi channel on anaconda.org and the conda-pypi plugin in conda CLI.

**The conda-pypi channel**

Repodata is the metadata file every conda channel publishes so clients can resolve dependencies. By describing PyPI wheels in that same format, conda's solver can consider them right alongside conda packages.

The **conda-pypi channel** translates PyPI metadata into repodata that conda can understand. It's hosted on anaconda.org, and download URLs point straight at the files on PyPI. The artifacts themselves are not copied or rehosted. The channel also handles package name differences between the two ecosystems. For example, PyPI may call a package `typing-extensions`, while a conda channel uses `typing_extensions`. The channel maps those names so that dependencies can resolve against the conda packages already available from the configured sources.

Only pure Python wheels are included. A pure Python package can still depend on numpy or another compiled library, but those dependencies continue to come from the configured conda channels.

**The conda-pypi plugin**

The [conda-pypi plugin](https://github.com/conda/conda-pypi) handles the install side. When the solver selects a wheel, the plugin unpacks it and registers the installed package with conda. The package appears in `conda list`, participates in future solves, and can be included in environment exports and lockfiles. Because the package was part of the original solve, conda knows both that it exists and which dependencies were selected with it. There is no second installer changing the environment afterward.

## Getting started

Make sure to update conda first:

```shell
conda install -n base "conda>=26.5.3"
```

Then opt in by switching to the rattler solver and adding the conda-pypi channel:

```shell
conda config --set solver rattler
conda config --append channels conda-pypi
```
The first command switches your solver to a Rust-based solver that's also in beta. It's built on the [rattler project](https://github.com/conda/rattler) from the team at Prefix.dev and uses the same solver backend pixi relies on. It's where conda's solving is heading, so the beta is a good time to test it against your real workflows; you can run it on its own, and rattler issues go to its own tracker.

The second command appends the conda-pypi channel to your channel configuration. It's a public channel hosted on anaconda.org that gives conda access to the metadata of around 600,000 pure Python wheels on PyPI. Channel priority works as it always has, and we recommend keeping your conda channels first. conda-pypi is a source for conda to find additional packages, not a replacement for conda channels you rely on.

[Learn more in our full documentation](https://conda.github.io/conda-pypi/quickstart/)

## Basic usage

**Installing packages**

Install everything with `conda install` without switching to pip:

```shell
conda install <conda-package> <pypi-package>
```
Conda will resolve dependencies across both regular conda packages and wheel packages in a single solve. When a wheel package is selected, conda downloads the artifact directly from PyPI.org and installs it into the environment while tracking it like any other conda package.

**Exporting and recreating your environment**

Because wheel packages are represented in conda's environment model, they can be included in standard environment exports:

```shell
conda export --file environment.yml --from-history
```

Packages installed through conda-pypi appear in the regular dependency list rather than in a separate pip section. When another user recreates the environment, conda can resolve and install the complete package set through the same workflow.

Conda 26.5 also introduced native multi platform lockfile support, allowing an environment containing both conda and PyPI packages to be locked for Linux, macOS, and Windows in a single file. [Learn more about lockfile support in conda CLI](https://conda.github.io/conda-lockfiles/)

For example:

```shell
conda export --file conda-lock.yml --platform=win-64
```
See the [conda lockfiles documentation](https://conda.github.io/conda-lockfiles/) for information about the available formats and platform options.

**Editable installs**

Some developers use pip inside a conda environment primarily because they need an editable installation of a project they are developing locally. The beta supports that workflow through the [`pypi` subcommand](https://conda.github.io/conda-pypi/features/#editable-package-support):

```shell
conda pypi install -e .
```

## Beta limitations

Here are a few rough edges we already know about:

 - `conda search` does not currently work when the conda-pypi channel is enabled. We are planning to add support in the next major release. Until then, just use `conda install <pypi-package>`
 - Extras cannot yet be requested through the command line. `conda install package[extra]` will fail. Extras declared inside package metadata are handled during the solve, so dependencies of a package's extras still resolve correctly. You just can't request them from the CLI.
 - The conda-pypi channel does not currently have a browsable package interface on anaconda.org.

## We need your feedback

We've been working toward this for years, and we're releasing it in beta because what we need now is real environments hitting real edge cases. We need to find the failures we can't predict from inside our own test suites.

If something works in a way that surprises you, tell us. If something breaks, tell us. If the workflow still feels wrong somewhere, tell us that, too. Beta feedback is what turns this into the solution you actually want, and what moves it from opt-in to default.

File an issue on [GitHub](https://github.com/conda/conda/issues), chat with us on [Zulip](https://conda.zulipchat.com/), or stop by [conda community office hours](https://conda.org/community/calendar), biweekly on Mondays.
