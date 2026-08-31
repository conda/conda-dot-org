---
title: May 2026 Releases
slug: 2026-05-20-may-releases
authors: [ryanskeith]
tags:
  - announcement
  - conda
  - conda-build
  - conda-libmamba-solver
  - conda-rattler-solver
  - conda-pypi
description: |
  May releases of conda and conda-build are out—native lockfiles, a snappier CLI, v1 recipe builds improvements and conda-pypi. 🎉
image: img/blog/2026-05-20-may-releases/banner.png
---

The May 2026 releases span **conda**, **conda-build**, **conda-libmamba-solver**, **conda-pypi**, and **conda-rattler-solver**! 🎉 You'll find them on the **main** and **conda-forge** channels.

For **conda**, lockfiles are a first-class workflow now, the CLI is lighter on everyday commands, and there is more under the hood for channel metadata and future dependency specs. Step-by-step opt-in for beta previews—**Rattler** and **conda-pypi**—is on **[New features to try](https://docs.conda.io/projects/conda/en/stable/new-features.html)**.

<!-- truncate -->

For **conda-build**, v1 recipes and faster test environments are the highlights.

## conda [26.5.0](https://github.com/conda/conda/releases/tag/26.5.0)

**Lockfiles without extra tooling.** `conda export`, `conda create`, and `conda install` understand **`conda-lock.yaml`** and **`pixi.lock`** out of the box. Multi-platform locks are supported, and recreating from a lock skips the solver—handy for CI and for sharing exact environments across machines.

**A snappier CLI.** Startup and initialization are cheaper across the board; even `conda -V` takes a fast path now. Sharded repodata support also lives in conda core, continuing the push toward more performant searches and solves.

**Previews worth watching.** The docs page covers two opt-in betas we would love feedback on: the **Rattler solver** and **installing PyPI packages with `conda install`** via the **conda-pypi** channel. What is stable, what is beta, and how to turn things on are all spelled out on **[New features to try](https://docs.conda.io/projects/conda/en/stable/new-features.html)**.

**For plugin authors and early adopters.** New hooks and knobs include **`conda_exception_observers`** and **`context.preview`** (opt-in feature previews via config or `CONDA_PREVIEW`). There is also groundwork in **MatchSpec** for conditional dependencies and optional groups—building blocks for richer environment specs down the road.

**Polish you might notice.** Clearer help text around lockfile workflows, warnings when exports miss pip/uv-installed packages, and assorted Windows and PowerShell fixes.

Full changelog: [26.5.0 on GitHub](https://github.com/conda/conda/releases/tag/26.5.0)

## conda-build [26.5.0](https://github.com/conda/conda-build/releases/tag/26.5.0)

If you maintain recipes or run conda-build in CI, this release is worth a look.

**v1 recipes, conda-build native.** Builds for **`recipe.yaml`** v1 recipes now go through the **`py-rattler-build` Python API** instead of shelling out to the `rattler-build` CLI.

**Faster test environments.** The new **`test_env_template`** option clones a pre-built template when it exactly matches what a test needs, instead of creating a fresh env from scratch every time.

**Allowlist, not whitelist.** Recipe keys **`missing_dso_allowlist`** and **`runpath_allowlist`** are the preferred names now; older `*_whitelist` keys still work but are headed for removal in **27.3**.

**Quality-of-life fixes.** Windows builds no longer hit **`WinError 206`** on very long command lines; v1 **`.conda`** packages can upload to anaconda.org when **`anaconda_upload`** is on; and **`conda_build_config.yaml`** parsing is quieter when the old numpy warning did not apply.

Full changelog: [26.5.0 on GitHub](https://github.com/conda/conda-build/releases/tag/26.5.0)

## conda-libmamba-solver [26.4.1](https://github.com/conda/conda-libmamba-solver/releases/tag/26.4.1)/[26.4.2](https://github.com/conda/conda-libmamba-solver/releases/tag/26.4.2)

- Cross-platform lockfile export shows the **target platform** in progress messages; sharded repodata cache uses **WAL mode** with a longer busy timeout to avoid `database is locked` errors; **`add_pip_as_python_dependency`** is honored again when sharded repodata is enabled.
- Serializes SQLite cache access through the cache thread to reduce lock contention; configuration guide updates for sharded repodata.

Full changelogs: [26.4.1](https://github.com/conda/conda-libmamba-solver/releases/tag/26.4.1), [26.4.2](https://github.com/conda/conda-libmamba-solver/releases/tag/26.4.2)

## conda-pypi [0.9.0](https://github.com/conda/conda-pypi/releases/tag/0.9.0)

conda-pypi has moved out of the conda-incubator.

- Adds **upload timestamps** to PyPI metadata conversion; fixes for virtual wheel re-extraction and **`fn`** field sourcing from URLs.
- **`EXTERNALLY-MANAGED`** file placement is **disabled during the community beta**—conda logs an informational notice instead, with plans to re-enable once migration tooling exists.
- Uses the configured **solver backend** via the plugin manager rather than hard-depending on conda-rattler-solver.
- Documentation now covers the **`conda-pypi`** channel.

Full changelog: [0.9.0](https://github.com/conda/conda-pypi/releases/tag/0.9.0)

## conda-rattler-solver [0.1.0](https://github.com/conda/conda-rattler-solver/releases/tag/0.1.0)

- First release aligned with **conda 26.5**—including **sharded repodata (v3)** support and **conditional dependencies / extras** in user input.
- Handles **`PackagesNotFoundInChannelsError`** from conda 26.3+.

See **[New features to try](https://docs.conda.io/projects/conda/en/stable/new-features.html)** for how to opt in.

Full changelog: [0.1.0](https://github.com/conda/conda-rattler-solver/releases/tag/0.1.0)

## Other releases this month

A few more projects shipped in May without a deep dive here:

- [**grayskull** v3.1.1](https://github.com/conda/grayskull/releases/tag/v3.1.1)
- [**conda-lockfiles** 0.2.0](https://github.com/conda/conda-lockfiles/releases/tag/0.2.0)
- [**conda-recipe-manager** v0.10.3](https://github.com/conda/conda-recipe-manager/releases/tag/v0.10.3)
- [**conda-meta-mcp** 0.1.2](https://github.com/conda-incubator/conda-meta-mcp/releases/tag/0.1.2)
- [**conda-standalone** 26.3.2.post1](https://github.com/conda/conda-standalone/releases/tag/26.3.2.post1)

## We ❤️ our community

Thank you to everyone who landed changes across these releases. A special welcome to contributors who contributed for the first time:

- [@costajohnt](https://github.com/costajohnt) in [conda#15801](https://github.com/conda/conda/pull/15801)
- [@dlaehnemann](https://github.com/dlaehnemann) in [conda-build#5767](https://github.com/conda/conda-build/pull/5767)
- [@prady0t](https://github.com/prady0t) in [conda#15950](https://github.com/conda/conda/pull/15950)
- [@smartcoder0777](https://github.com/smartcoder0777) in [conda#15710](https://github.com/conda/conda/pull/15710)
- [@VedantMadane](https://github.com/VedantMadane) in [conda#15773](https://github.com/conda/conda/pull/15773)
