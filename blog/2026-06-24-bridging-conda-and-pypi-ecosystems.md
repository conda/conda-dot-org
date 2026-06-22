---
title: "Bridging conda and PyPI ecosystems: install PyPI packages with conda install"
slug: "2026-06-24-bridging-conda-and-pypi-ecosystems"
authors: [dashagurova, dbouquin]
tags: [conda, pip, PyPI, conda-pypi]
description: "Stop reaching for `pip` inside your conda environments. With the conda-pypi beta, `conda install` can now pull pure Python packages from PyPI directly, alongside your conda packages in a single solve."
image: img/blog/2026-06-24-bridging-conda-and-pypi-ecosystems/conda-pypi-logo.png
---

***tl;dr:** Stop reaching for `pip` inside your conda environments. With the conda-pypi beta, `conda install` can now pull pure Python packages from PyPI directly, alongside your conda packages*

<!-- truncate -->

You needed a package. It wasn't on conda-forge. You typed `pip install <package>` and went back to work.
Most conda users have done this. Most of us have also paid for it later, when the environment broke in a way that took half a day to untangle. Users have built up coping strategies over the years: more careful pinning, better hygiene, install order rules, accepting that conda environments with pip in them are a little fragile. But users have no choice because [Python Package Index (PyPI)](https://pypi.org/) is where most Python packages live. The newest libraries land there first. The long-tail packages never make it to conda channels.

Conda community has been working on [various approaches](https://conda.github.io/conda-pypi/why/potential-solutions/) to this problem, and we are very excited for you to try it. Starting in `conda 26.5`, you can opt into conda-pypi beta where conda's solver knows about packages on PyPI. Not by calling pip behind the scenes. Not by converting wheels into conda packages first. PyPI packages become real candidates the solver can consider, the same way conda packages are. 

## Why mixing conda and pip breaks things

Plenty has been written about this, so we'll keep it short. Conda has its own picture of your environment. It knows what conda installed, what those packages depend on, and what versions agree with each other. When you run `pip install` in your conda environment, pip builds its own picture, separately, and writes files on top of conda's. Neither tool has the full view. Things look fine until something later asks both halves to agree, they can't, and you're three Stack Overflow tabs deep trying to figure out which one moved.

The reasin is simple - `conda` and `pip` come from different ecosystems with different ideas about what a package even is. Mahe Iram Khan made the case in in [*Conda and pip are two ecosystems, not just tools*](https://conda.org/blog/2026-05-07-conda-and-pip-ecosystems), and Jannis Leidel and Daniel Bast went deeper in the [*Conda ≠ PyPI: Why Conda Is More Than a Package Manager*](https://conda.org/blog/conda-is-not-pypi) blog series.

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

The second command appends the conda-pypi channel. It's a public channel hosted on anaconda.org that gives conda a view of Python packages from PyPI (around 600,000 pure Python wheels). Appending makes it a fallback source, for when your conda channel is missing that one package or dependency you need. Channel priority works the way it always has, and we recommend keeping your conda channels first.

[Learn more in full documentation](https://conda.github.io/conda-pypi/quickstart/)

## Basic usage

**Install packages**

Install everything with `conda install`, without switching to pip:

```shell
conda install <conda-package> <pypi-package>
```
Conda will resolve dependencies across both regular conda packages and wheel packages in a single solve. When a wheel package is selected, conda downloads the artifact directly from PyPI.org and installs it into the environment while tracking it like any other conda package.

**Export your environment**

Export an `environment.yml`:

```shell
conda export --file environment.yml
```

PyPI packages show up in the regular dependencies list. There's no separate pip section to maintain, and anyone who recreates the environment from the file gets the same packages from the same sources.

Conda 26.5.0 also includes native multi-platform lockfile support, so an environment with both conda and PyPI packages can be locked across Linux, macOS, and Windows in a single file. [Learn more about lockfile support in conda CLI →](https://conda.github.io/conda-lockfiles/)

To export a lockfile:

```shell
conda export --file conda-lock.yml --platform=win-64
```

**Editable installs**

Some users only reach for `pip` inside a conda environment to do editable installs of a project they're developing. That workflow is part of the beta too, through a [`pypi` subcommand](https://conda.github.io/conda-pypi/features/#editable-package-support):

```shell
conda pypi install -e .
```

## How it works

The approach in this beta makes pure Python wheels a first-class format that conda channels can describe and conda clients can install. The specification behind it is the [Repodata Wheel Dupport](https://github.com/conda/ceps/pull/145) Conda Enhencement Proposal, and the design discussion is still open if you want to read it or get involved. This beta is the first implementation of that spec: the conda-pypi channel on anaconda.org and the conda-pypi plugin in conda CLI.

#### The conda-pypi channel

Repodata is the metadata file every conda channel publishes so clients can resolve dependencies. By describing PyPI wheels in that same format, conda's solver can consider them right alongside conda packages. Same solve, same index, same priority rules.

The conda-pypi channel translates PyPI metadata into repodata that conda can understand. It's hosted on anaconda.org for the beta, and download URLs point straight at the files on PyPI. Wheel artifacts are not rehosted.

The channel contains pure Python wheels only, by design. A package that depends on numpy or a compiled C library still gets those dependencies from conda channels. That's where conda is strongest, and that's not changing. What changes is that the pure Python packages sitting on top of that foundation no longer need a separate tool to install.

#### The conda-pypi plugin

The [conda-pypi plugin](https://github.com/conda/conda-pypi) handles the install side. When rattler solver picks a wheel, the plugin unpacks it and registers it as a first-class package in conda environment. It shows up in `conda list`, participates in future solves, exports cleanly, and locks like any other conda package. Because the solver knew about it from the start, all the dependencies line up. There's no second tool doing things behind conda's back.

Name mapping is built in. PyPI calls it `typing-extensions`, conda calls it `typing_extensions`, and the channel handles the translation automatically. Your dependencies line up with the conda packages you already have, with no configuration on your end.

## Beta limitations

A few rough edges we already know about.

 - `conda search` doesn't work with the conda-pypi channel enabled. To find a package in the meantime, search on anaconda.org directly.
 - Extras syntax isn't wired up at the command line yet. `conda install package[extra]` will fail. Extras declared inside package metadata are handled during the solve, so dependencies of a package's extras still resolve correctly. You just can't request them from the CLI.
 - No web UI available during beta. You cannot browse packages in conda-pypi channel on anaconda.org.

## We need your feedback

We've been working toward this for years, and we're releasing it in beta because what we need now is real environments hitting real edge cases. We need to find the failures we can't predict from inside our own test suites.

If something works in a way that surprises you, tell us. If something breaks, tell us. If the workflow still feels wrong somewhere, tell us that too. Beta feedback is what turns this into the solution you actually want, and what moves it from opt-in to default.

File an issue on [GitHub](https://github.com/conda/conda/issues), chat with us on [Zulip](https://conda.zulipchat.com/), or stop by [conda community office hours](https://conda.org/community/calendar), biweekly on Mondays.