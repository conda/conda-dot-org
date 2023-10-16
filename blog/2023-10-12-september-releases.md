---
title: "September 2023 Releases"
slug: "2023-10-12-september-releases"
authors: [kenodegard]
tags: [announcement, conda, conda-build, conda-libmamba-solver, conda-index, pycosat]
description: |
    Conda 23.9.0, conda-build 3.27.0, conda-libmamba-solver 23.9.0/23.9.1, conda-index 0.3.0, and pycosat 0.6.5/0.6.6 have been released! 🎉
---

The September 2023 releases included updates to five conda community projects: conda, conda-build, conda-libmamba-solver, conda-index, and pycosat! 🎉 Each of these have been released to both `main` and `conda-forge`.

## Changes in Conda [23.9.0](https://github.com/conda/conda/releases/tag/23.9.0)

To update conda, run:
```bash
conda install -n base conda=23.9.0
```

### 📢 Special Announcement 📢

:::info

Conda's default solver will change to [`conda-libmamba-solver`](https://conda.github.io/conda-libmamba-solver/) in a __special 23.10.0 release__ in the near future!

:::

You can already benefit from `conda-libmamba-solver` _today_ by [configuring your conda installation to use it](https://conda.github.io/conda-libmamba-solver/getting-started/#usage) (e.g. by running `conda config --set solver libmamba`).

The current "classic" solver is based on [pycosat](https://github.com/conda/pycosat)/[Picosat](http://fmv.jku.at/picosat/) and will remain part of conda for the foreseeable future. A fallback is possible and available.

Additional details on this change as well as the full announcement can be found in the [conda 23.9.0 changelog](https://github.com/conda/conda/blob/main/CHANGELOG.md#2390-2023-09-27).

<!-- truncate -->

### ✨ What's New? ✨

* A new "auth handler" plugin hook has been added for conda. See the new [`conda-auth`](https://github.com/conda-incubator/conda-auth) plugin for an example.
* Index cache metadata is locked by default; a `--no-lock` option is also now available.
* A new `context.register_envs` option can control whether to register environments in `~/.conda/environments.txt` when they are created. Defaults to true.
* New detailed output verbosity level (i.e., the old debug level `-vv` is now `-vvv`).
* Support for `truststore` to the `ssl_verify` config option has been added, enabling conda to use the operating system certificate store (requires Python 3.10 or later).
* `emscripten-wasm32` and `wasi-wasm32` platforms are now supported.

### 🔧 What Got Fixed? 🔧

* `conda env create` checks the directory permissions when using pip dependencies before writing to disk.
* `InsecureRequestWarning` for JLAP is hidden when `CONDA_SSL_VERIFY=false`, matching non-JLAP behavior.
* The ability to create a conda environment with a colon in the prefix is no longer allowed.
* `AttributeError` logging response with nonexistent request has been fixed when using JLAP with `file:///` URIs.
* For cleaner logs, progress bars no longer show up in non-interactive runs.
* `--json` and `--debug` default to `NULL` so as to not override `CONDA_JSON` and `CONDA_DEBUG` environment variables.
* Fixed `conda remove --all --json` output.
* Test data has been updated to stop triggering security scanners' false-positives.
* No more performance regression of basic commands (e.g., `conda info`) on WSL.
* Conda is now configured to ignore "Retry-After" header to avoid the scenarios when this value is very large and causes conda to hang indefinitely.
* `JSONDecodeError` on `repodata.info.json` is treated as a warning, equivalent to a missing `repodata.info.json`.
* Fixed sorting error for `conda config --show-sources --json`.
* `OSError` in `find_commands` is now detected to account for incorrect `PATH` entries on Windows.
* `conda env update --prune` uses only the specs coming from `environment.yml` file and ignores the history specs.

### 🌅 What's Marked for [Deprecation](https://github.com/conda-incubator/ceps/blob/main/cep-9.md)? 🌅

This is the first release of conda removing code previously marked as deprecated per the [deprecation schedule](https://github.com/conda-incubator/ceps/blob/main/cep-9.md). The following is a list of what was removed:

* `conda.another_unicode()`
* `conda._vendor.toolz`
* `conda._vendor.tqdm`
* `conda.auxlib.decorators.memoized`
* `conda.base.context.Context.experimental_solver`
* `conda.base.context.Context.conda_private`
* `conda.base.context.Context.cuda_version`
* `conda.base.context.get_prefix()`
* `conda.cli.common.ensure_name_or_prefix()`
* `--experimental-solver`
* `conda.common.cuda`
* `conda.common.path.explode_directories(already_split)`
* `conda.common.url.escape_channel_url()`
* `conda.core.index.check_whitelist()`
* `conda.core.solve._get_solver_class()`
* `conda.core.subdir_data.read_mod_and_etag()`
* `conda.gateways.repodata.RepodataState.load()`
* `conda.gateways.repodata.RepodataState.save()`
* `conda.lock`
* `conda_env.cli.common.stdout_json()`
* `conda_env.cli.common.get_prefix()`
* `conda_env.cli.common.find_prefix_name()`

* * *

## Changes in Conda-Build [3.27.0](https://github.com/conda/conda-build/releases/tag/3.27.0)

To update conda-build, run:
```bash
conda install -n base conda-build=3.27.0
```

### ✨ What's New? ✨

* Removed `glob2` dependency.
* `emscripten-wasm32` and `wasi-wasm32` platforms are now supported.

### 🔧 What Got Fixed? 🔧

* Imports in conda command plugins are delayed until the command is used, avoiding import-time side effects.

### 📄 What's New in Documentation? 📄

* Improved formatting of `~=` (compatibility release) match spec.
* Docs now clarify that the `build` prefix is activated _after_ the `host` prefix.
* An explanation has been added stating that conda-build should be run from the base environment.

* * *

## Changes in Conda-Libmamba-Solver [23.9.0](https://github.com/conda/conda-libmamba-solver/releases/tag/23.9.0)/[23.9.1](https://github.com/conda/conda-libmamba-solver/releases/tag/23.9.1)

To update conda-libmamba-solver, run:
```bash
conda install -n base conda-libmamba-solver=23.9.1
```

### ✨ What's New? ✨

* Increased performance of `notify_conda_outdated` logic.
* Libmamba's `repoquery` search features are now exposed as a conda subcommand plugin.
* How tasks for `libsolv` are created has been rewritten, making use of `libmamba`'s `add_pin` features (requires `libmambapy >=1.5.1`).
* Name-only pins now lock the corresponding package if installed.
* The `.solv` cache for repodata is used if available and recent.

### 🔧 What Got Fixed? 🔧

* The solver no longer bounces between two compatible solutions when the same command is run twice in a row.
* Commands with no channels passed are handled gracefully.
* Workaround added for missing `noarch` field in returned `PackageRecord` payload.
* A bug where the `--prune` flag was not working correctly in `conda env update` commands has been fixed.
* Environments are no longer aggressively updated to higher priority channels under certain conditions.
* No more injection of channels from installed packages that do not exist or are unavailable.
* All configured channels in `PackagesNotFoundError` exceptions print correctly.
* No more crashes when a `MatchSpec` with a build string is specified in the CLI and there's a pinned spec for the same package name.
* `defaults::pkg` workarounds are only applied for the default value `default_channels`.
* Users won't be able to override pinned specs with incompatible CLI specs anymore. Instead, they must modify their pinned specs explicitly.

### 📄 What's New in Documentation? 📄

* Intentional deviations from conda's `classic` solver behavior are now documented.

* * *

## Changes in Conda-Index [0.3.0](https://github.com/conda/conda-index/releases/tag/0.3.0)

To update conda-index, run:
```bash
conda install -n base conda-index=0.3.0
```

### ✨ What's New? ✨

* `--run-exports` has been added to generate CEP-12 compliant `run_exports.json` documents for each `subdir`.
* Pretty-print `repodata.json` is no longer default, saving time and space.
* Version requirement: `conda >= 4.14`.

* * * 

## Changes in Pycosat [0.6.5](https://github.com/conda/pycosat/releases/tag/0.6.5)/[0.6.6](https://github.com/conda/pycosat/releases/tag/0.6.6)

To update conda-index, run:
```bash
conda install -n base pycosat=0.6.6
```

### ✨ What's New? ✨

* Pycosat 0.6.4 accidentally did not include the changes intended to be released. Pycosat 0.6.5 includes those changes.
* `PyMem_Calloc()` is utilized in order to initialize memory to `0`.

* * *

### We ❤️ Our Community

Altogether, we had 11 (!) new contributors this release cycle; thank you to all of our open source community members for helping making these improvements possible.

* [@boldorider4](https://github.com/boldorider4) made their first contribution in [conda-build#4960](https://github.com/conda/conda-build/pull/4960)
* [@DaveKaretnyk](https://github.com/DaveKaretnyk) made their first contribution in [conda-build#5004](https://github.com/conda/conda-build/pull/5004)
* [@dholth](https://github.com/dholth) made their first contribution in [pycosat#54](https://github.com/conda/pycosat/pull/54)
* [@jmcarpenter2](https://github.com/jmcarpenter2) made their first contribution in [conda#13034](https://github.com/conda/conda/pull/13034)
* [@Mon-ius](https://github.com/Mon-ius) made their first contribution in [conda#12811](https://github.com/conda/conda/pull/12811)
* [@otaithleigh](https://github.com/otaithleigh) made their first contribution in [conda#13035](https://github.com/conda/conda/pull/13035)
* [@psteyer](https://github.com/psteyer) made their first contribution in [conda#11610](https://github.com/conda/conda/pull/11610)
* [@scdub](https://github.com/scdub) made their first contribution in [conda-build#4965](https://github.com/conda/conda-build/pull/4965)
* [@tarcisioe](https://github.com/tarcisioe) made their first contribution in [conda#9614](https://github.com/conda/conda/pull/9614)
* [@wolfv](https://github.com/wolfv) made their first contribution in [conda#13095](https://github.com/conda/conda/pull/13095) and [conda-build#4813](https://github.com/conda/conda-build/pull/4813)
* [@zeehio](https://github.com/zeehio) made their first contribution in [conda#13075](https://github.com/conda/conda/pull/13075)

If you have ideas or want to help improve any of the conda community projects, we love to see new (and returning) contributors! 😄
