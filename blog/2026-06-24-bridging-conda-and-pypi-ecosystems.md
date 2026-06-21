---
title: "Bridging conda and PyPI ecosystems: install PyPI packages with `conda install`"
slug: "2026-06-24-bridging-conda-and-pypi-ecosystems"
authors: [dashagurova, dbouquin]
tags: [conda, pypi]
description: |
  
image: img/blog/2026-06-24-bridging-conda-and-pypi-ecosystems/conda-pypi-logo.png
---

***tl;dr:** Conda CLI users can now install pure Python packages from PyPI through `conda install`. They resolve in the same solve as your conda packages, no separate pip step needed.*

<!-- truncate -->

Conda package channels like conda-forge cover a lot of ground. Almost everything most users need, most of the time. But there's always that one package. The cutting-edge library that just shipped and isn't on conda-forge yet, or the dependency that only ever existed on PyPI in the first place. The install guide says `pip install <cool-new-package>`, and you're moving fast, so you do it. It works. You move on.

A week later something breaks in a way that has nothing to do with what you just changed, and you lose half a day to it. That experience has shaped how people write install guides, build environments, and debug the messes that come after. It's also quietly eroded a lot of users' trust in conda.

Conda community has been working on a solution for years, and we finally have something ready for you to try. Starting in conda 26.5.0, you can opt into a beta where conda's solver knows about packages on PyPI. Not by calling pip behind the scenes. Not by converting wheels into conda packages first. PyPI packages become real candidates the solver can consider, the same way conda packages are. One `conda install`, one solver, full environment management.

## What's wrong with mixing conda and pip

Plenty has been written about this, so we'll keep it short.

Conda and pip each see only their own half of your environment. Conda knows what conda installed. Pip knows what pip installed. Neither has the full picture, and that's why the break shows up far from the command that caused it. It's not a bug. It's the predictable result of running two package managers in the same environment.

The reason is that they're built for different ecosystems, with different assumptions about what a package even is. Mahe Iram Khan made the case well in [*Conda and pip are two ecosystems, not just tools*](#), and Jannis Leidel and Daniel Bast went deeper in the [*Conda ≠ PyPI*](#) blog series.

This conda-pypi beta is the conda community's most recent attempt to build a bridge and make it easier for users. We think it's the most promising of those attempts, and we need to hear from you to know if we're right.

## Getting started: opt in to try

Make sure to update conda first:

```shell
conda install -n base "conda>=26.5.3"
```

Then opt in by switching to the rattler solver and adding the conda-pypi channel:

```shell
conda config --set solver rattler
conda config --append channels conda-pypi
```

The first command switches your conda solver to rattler, a drop-in replacement Rust-based solver that's also currently in beta and on track to become the default in the next major conda release. Rattler is a faster, modern alternative built by the team at Prefix.dev, and it's the solver that powers Pixi.

The second command appends the conda-pypi channel. It's a public channel hosted on anaconda.org that gives conda a view of Python packages from PyPI (around 600,000 pure Python wheels). Appending makes it a fallback source, for when conda-forge is missing that one package or dependency you need. Channel priority works the way it always has, and we recommend keeping your conda channels first.

## Basic usage

**Installing packages**

Install everything with `conda install`, without switching to pip:

```shell
conda install <conda-package> <pypi-package>
```

Conda resolves both in the same solve. If a package is in a conda channel, you get the conda package. If it's only on PyPI, you get the wheel. Either way it lands in your environment as a tracked conda package.

**Exporting your environment**

Export an `environment.yml`:

```shell
conda export --file environment.yml
```

PyPI packages show up in the regular dependencies list. There's no separate pip section to maintain, and anyone who recreates the environment from the file gets the same packages from the same sources.

Conda 26.5.0 also includes multi-platform lockfile support, so an environment with both conda and PyPI packages can be locked across Linux, macOS, and Windows in a single file. [lockfile docs →](#)

To export a lockfile:

```shell
conda export --file conda-lock.yml --platform=win-64
```

**Editable installs**

Some users only reach for `pip` inside a conda environment to do editable installs of a project they're developing. That workflow is part of the beta too, through a `pypi` subcommand:

```shell
conda pypi install -e .
```

[Learn more in full documentation](#)

## How it works

Conda-pypi is the third or fourth shape this idea has taken. Earlier attempts called pip from inside conda. Others converted wheels to conda packages on the fly into a local channel. Each one solved part of the problem and broke something else.

The approach in this beta makes pure Python wheels a first-class format that conda channels can describe and conda clients can install. The specification behind it is the [Wheels in Repodata CEP](#), and the design discussion is still open if you want to read it or get involved. This beta is the first implementation of that spec: the conda-pypi channel on anaconda.org and the conda-pypi plugin in conda CLI.

#### The conda-pypi channel

Repodata is the metadata file every conda channel publishes so clients can resolve dependencies. By describing PyPI wheels in that same format, conda's solver can consider them right alongside conda packages. Same solve, same index, same priority rules.

The conda-pypi channel translates PyPI metadata into repodata that conda can understand. It's hosted on anaconda.org for the beta, and download URLs point straight at the files on PyPI. Nothing is rehosted.

The channel contains pure Python wheels only, by design. A package that depends on numpy or a compiled C library still gets those dependencies from conda channels. That's where conda is strongest, and that's not changing. What changes is that the pure Python packages sitting on top of that foundation no longer need a separate tool to install.

#### The conda-pypi plugin

The plugin handles the install side. When the solver picks a wheel, the plugin unpacks it and registers it as a first-class conda package. It shows up in `conda list`, participates in future solves, exports cleanly, and locks like any other package. Because the solver knew about it from the start, all the dependencies line up. There's no second tool doing things behind conda's back.

Name mapping is built in. PyPI calls it `typing-extensions`, conda calls it `typing_extensions`, and the channel handles the translation automatically. Your dependencies line up with the conda packages you already have, with no configuration on your end.

## Beta limitations

A few rough edges we already know about.

 - `conda search` doesn't work with the conda-pypi channel enabled. To find a package in the meantime, search on anaconda.org directly.
 - Extras syntax isn't wired up at the command line yet. `conda install package[extra]` will fail. Extras declared inside package metadata are handled during the solve, so dependencies of a package's extras still resolve correctly. You just can't request them from the CLI.

## We need your feedback

We've been working toward this for years, and we're releasing it in beta because what we need now is real environments hitting real edge cases. We need to find the failures we can't predict from inside our own test suites.

If something works in a way that surprises you, tell us. If something breaks, tell us. If the workflow still feels wrong somewhere, tell us that too. Beta feedback is what turns this into the solution you actually want, and what moves it from opt-in to default.

File an issue on [GitHub](#), chat with us on [Zulip](#), or stop by conda community office hours, biweekly on Mondays.