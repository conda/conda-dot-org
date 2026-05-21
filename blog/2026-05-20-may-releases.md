---
title: May 2026 Releases
slug: 2026-05-20-may-releases
authors: [ryanskeith]
tags:
  - announcement
  - conda
  - conda-build
description: |
  conda 26.5.0 and conda-build 26.5.0 are out—native lockfiles, a snappier CLI, v1 recipe builds improvements and conda-pypi. 🎉
image: img/blog/2026-05-20-may-releases/banner.png
---

**conda 26.5.0** and **conda-build 26.5.0** are out. You'll find both `defaults` and `conda-forge` channels.

<!-- truncate -->

For **conda**, the big story is reproducible environments: lockfiles are a first-class workflow now, the CLI is lighter on everyday commands, and there is more under the hood for channel metadata and future dependency specs. For **conda-build**, v1 recipes and faster test environments are the highlights.

:::info Try it: lockfiles (stable in 26.5)

Export a lockfile from an environment:

```bash
conda export --name my-env --file conda-lock.yaml
```

Recreate it elsewhere—conda installs the pinned packages directly, without solving again:

```bash
conda create --name my-env --file conda-lock.yaml
```

Need Linux, macOS, and Windows in one file? Pass `--platform` for each target on export. Step-by-step guidance, beta features, and stable-vs-preview labels live on **[New features to try](https://docs.conda.io/projects/conda/en/stable/new-features.html)** in the conda docs.

:::

## Upgrade

Most people will want both packages:

```bash
conda install --name base conda=26.5.0 conda-build=26.5.0
```

## conda [26.5.0](https://github.com/conda/conda/releases/tag/26.5.0)

**Lockfiles without extra tooling.** `conda export`, `conda create`, and `conda install` understand **`conda-lock.yaml`** and **`pixi.lock`** out of the box. Multi-platform locks are supported, and recreating from a lock skips the solver—handy for CI and for sharing exact environments across machines.

**A snappier CLI.** Startup and initialization are cheaper across the board; even `conda -V` takes a fast path now. Sharded repodata support also lives in conda core, continuing the push toward smaller, on-demand channel metadata.

**Previews worth watching.** The docs page covers two opt-in betas we would love feedback on: the **Rattler solver** and **installing PyPI packages with `conda install`** via the **conda-pypi** channel. What is stable, what is beta, and how to turn things on are all spelled out on **[New features to try](https://docs.conda.io/projects/conda/en/stable/new-features.html)**.

**For plugin authors and early adopters.** New hooks and knobs include **`conda_exception_observers`** (observe exceptions in your integrations) and **`context.preview`** (opt-in feature previews via config or `CONDA_PREVIEW`). There is also groundwork in **MatchSpec** for conditional dependencies and optional groups—building blocks for richer environment specs down the road.

**Polish you might notice.** Clearer help text around lockfile workflows, warnings when exports miss pip/uv-installed packages, and assorted Windows and PowerShell fixes (including reactivation after install so package env vars show up in the same session).

Full changelog: [26.5.0 on GitHub](https://github.com/conda/conda/releases/tag/26.5.0)

## conda-build [26.5.0](https://github.com/conda/conda-build/releases/tag/26.5.0)

If you maintain recipes or run conda-build in CI, this release is worth a look.

**v1 recipes, conda-build native.** Builds for **`recipe.yaml`** v1 recipes now go through the **`py-rattler-build` Python API** instead of shelling out to the `rattler-build` CLI—same format, tighter integration with conda-build.

**Faster test environments.** The new **`test_env_template`** option clones a pre-built template when it exactly matches what a test needs, instead of creating a fresh env from scratch every time.

**Allowlist, not whitelist.** Recipe keys **`missing_dso_allowlist`** and **`runpath_allowlist`** are the preferred names now; older `*_whitelist` keys still work but are headed for removal in **27.3**.

**Quality-of-life fixes.** Windows builds no longer hit **`WinError 206`** on very long command lines; v1 **`.conda`** packages can upload to anaconda.org when **`anaconda_upload`** is on; and **`conda_build_config.yaml`** parsing is quieter when the old numpy warning did not apply anyway.

Full changelog: [26.5.0 on GitHub](https://github.com/conda/conda-build/releases/tag/26.5.0)

## More on the way

This post covers **conda** and **conda-build** only. Other ecosystem releases from this cycle—solvers, plugins, and friends—will get their own write-up soon.

## We ❤️ our community

Thank you to everyone who landed changes in these two releases. A special welcome to first-time contributors, including [@costajohnt](https://github.com/costajohnt), [@dashagurova](https://github.com/dashagurova), [@dlaehnemann](https://github.com/dlaehnemann), [@jsmolic](https://github.com/jsmolic), [@prady0t](https://github.com/prady0t), [@smartcoder0777](https://github.com/smartcoder0777), and [@VedantMadane](https://github.com/VedantMadane).
