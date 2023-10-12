---
title: "September 2023 Releases"
slug: "2023-10-12-september-releases"
description: |
    Conda 23.9.0, conda-build 3.27.0, conda-libmamba-solver 23.9.0/23.9.1, conda-index 0.3.0, and pycosat 0.6.5/0.6.6 have been released! 🎉
authors: [kenodegard]
tags: [announcement, conda, conda-build, conda-libmamba-solver, conda-index, pycosat]
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

You can already benefit from it _today_ by [configuring your conda installation to use it](https://conda.github.io/conda-libmamba-solver/getting-started/#usage) (e.g. by running `conda config --set solver libmamba`).

The current "classic" solver is based on [pycosat](https://github.com/conda/pycosat)/[Picosat](http://fmv.jku.at/picosat/) and will remain part of conda for the forseeable future, a fallback is possible and available.

For additional details on this change see the full announcement [here](https://github.com/conda/conda/blob/main/CHANGELOG.md#2390-2023-09-27).

<!-- truncate -->

### ✨ What's New? ✨

* Add a new "auth handler" plugin hook for conda. See the new [`conda-auth`](https://github.com/conda-incubator/conda-auth) plugin for an example.
* Lock index cache metadata by default. Added `--no-lock` option in case of problems, should not be necessary.
* Add `context.register_envs` option to control whether to register environments in `~/.conda/environments.txt` when they are created. Defaults to true.
* Inject a new detailed output verbosity level (i.e., the old debug level `-vv` is now `-vvv`).
* Add support for `truststore` to the `ssl_verify` config option, enabling conda to use the operating system certificate store (requires Python 3.10 or later).
* Add support for `emscripten-wasm32` and `wasi-wasm32` platforms.

### 🔧 What Got Fixed? 🔧

* When using pip dependencies with `conda env create`, check the directory permissions before writing to disk.
* Hide `InsecureRequestWarning` for JLAP when `CONDA_SSL_VERIFY=false`, matching non-JLAP behavior.
* Disallow ability to create a conda environment with a colon in the prefix.
* Fix `AttributeError` logging response with nonexistent request when using JLAP with `file:///` URIs.
* Do not show progress bars in non-interactive runs for cleaner logs.
* Default `--json` and `--debug` to `NULL` so as to not override `CONDA_JSON` and `CONDA_DEBUG` environment variables.
* Fix `conda remove --all --json` output.
* Update test data to stop triggering security scanners' false-positives.
* Fix performance regression of basic commands (e.g., `conda info`) on WSL.
* Configure conda to ignore "Retry-After" header to avoid the scenarios when this value is very large and causes conda to hang indefinitely.
* Treat `JSONDecodeError` on `repodata.info.json` as a warning, equivalent to a missing `repodata.info.json`.
* Fix sorting error for `conda config --show-sources --json`.
* Catch `OSError` in `find_commands` to account for incorrect `PATH` entries on Windows.
* `conda env update --prune` uses only the specs coming from `environment.yml` file and ignores the history specs.

### 🌅 What's Marked for [Deprecation](https://github.com/conda-incubator/ceps/blob/main/cep-9.md)? 🌅

This is the first release of conda removing code previously marked as deprecated per the [deprecation schedule](https://github.com/conda-incubator/ceps/blob/main/cep-9.md). The following was removed:

* Removed `conda.another_unicode()`.
* Removed `conda._vendor.toolz`.
* Removed `conda._vendor.tqdm`.
* Removed `conda.auxlib.decorators.memoized` decorator.
* Removed `conda.base.context.Context.experimental_solver`.
* Removed `conda.base.context.Context.conda_private`.
* Removed `conda.base.context.Context.cuda_version`.
* Removed `conda.base.context.get_prefix()`.
* Removed `conda.cli.common.ensure_name_or_prefix()`.
* Removed `--experimental-solver` command line option.
* Removed `conda.common.cuda` module.
* Removed `conda.common.path.explode_directories(already_split)`.
* Removed `conda.common.url.escape_channel_url()`.
* Removed `conda.core.index.check_whitelist()`.
* Removed `conda.core.solve._get_solver_class()`.
* Removed `conda.core.subdir_data.read_mod_and_etag()`.
* Removed `conda.gateways.repodata.RepodataState.load()`.
* Removed `conda.gateways.repodata.RepodataState.save()`.
* Removed `conda.lock` module.
* Removed `conda_env.cli.common.stdout_json()`.
* Removed `conda_env.cli.common.get_prefix()`.
* Removed `conda_env.cli.common.find_prefix_name()`.

* * *

## Changes in Conda-Build [3.27.0](https://github.com/conda/conda-build/releases/tag/3.27.0)

To update conda-build, run:
```bash
conda install -n base conda-build=3.27.0
```

### ✨ What's New? ✨

* Remove `glob2` dependency.
* Add support for `emscripten-wasm32` and `wasi-wasm32` platforms.

### 🔧 What Got Fixed? 🔧

* Delay imports in conda command plugin until the command is used, avoiding import-time side effects.

### 📄 What's New in Documentation? 📄

* Document `~=` (compatibility release) match spec.
* Clarify that the `build` prefix is activated _after_ the `host` prefix.
* Add explanation that conda-build should be run from the base environment.

* * *

## Changes in Conda-Libmamba-Solver [23.9.0](https://github.com/conda/conda-libmamba-solver/releases/tag/23.9.0)/[23.9.1](https://github.com/conda/conda-libmamba-solver/releases/tag/23.9.1)

To update conda-libmamba-solver, run:
```bash
conda install -n base conda-libmamba-solver=23.9.1
```

### ✨ What's New? ✨

* Increase performance of `notify_conda_outdated` logic.
* Expose libmamba's `repoquery` search features as a conda subcommand plugin.
* Rewrite how we create tasks for `libsolv`, making use of `libmamba`'s `add_pin` features. Requires `libmambapy >=1.5.1`.
* Name-only pins will lock the corresponding package if installed.
* Use the `.solv` cache for repodata if available and recent.

### 🔧 What Got Fixed? 🔧

* Prevent solver from bouncing between two compatible solutions when the same command is run twice in a row.
* Handle commands with no channels passed gracefully.
* Workaround for missing `noarch` field in returned `PackageRecord` payload.
* Fixes a bug where the `--prune` flag was not working correctly in `conda env update` commands.
* Ensure environments are not aggressively updated to higher priority channels under some conditions.
* Do not inject those channels from installed packages that do not exist or are unavailable.
* Correctly print all configured channels in `PackagesNotFoundError` exceptions.
* Do not crash if a `MatchSpec` with a build string is specified in the CLI and there's a pinned spec for the same package name.
* Only apply `defaults::pkg` workarounds for the default value `default_channels`.
* Users won't be able to override pinned specs with incompatible CLI specs anymore. Instead they must modify their pinned specs explicitly.

### 📄 What's New in Documentation? 📄

* Document intentional deviations from conda's `classic` solver behavior.

* * *

## Changes in Conda-Index [0.3.0](https://github.com/conda/conda-index/releases/tag/0.3.0)

To update conda-index, run:
```bash
conda install -n base conda-index=0.3.0
```

### ✨ What's New? ✨

* Add `--run-exports` to generate CEP-12 compliant `run_exports.json` documents for each subdir.
* Don't pretty-print `repodata.json` by default, saving time and space.
* Require conda >= 4.14.

* * * 

## Changes in Pycosat [0.6.5](https://github.com/conda/pycosat/releases/tag/0.6.5)/[0.6.6](https://github.com/conda/pycosat/releases/tag/0.6.6)

To update conda-index, run:
```bash
conda install -n base pycosat=0.6.6
```

### ✨ What's New? ✨

* Pycosat 0.6.4 accidentally did not include the changes intended to be released. Pycosat 0.6.5 includes those changes.
* Use `PyMem_Calloc()` to initialize memory to `0`.

* * *

### We ❤️ Our Community

Altogether we had 10 (!) new contributors this release cycle; thank you to all of our open source community members for helping making these improvements possible.

* @boldorider4 made their first contribution in [conda-build#4960](https://github.com/conda/conda-build/pull/4960)
* @DaveKaretnyk made their first contribution in [conda-build#5004](https://github.com/conda/conda-build/pull/5004)
* @jmcarpenter2 made their first contribution in [conda#13034](https://github.com/conda/conda/pull/13034)
* @Mon-ius made their first contribution in [conda#12811](https://github.com/conda/conda/pull/12811)
* @otaithleigh made their first contribution in [conda#13035](https://github.com/conda/conda/pull/13035)
* @psteyer made their first contribution in [conda#11610](https://github.com/conda/conda/pull/11610)
* @scdub made their first contribution in [conda-build#4965](https://github.com/conda/conda-build/pull/4965)
* @tarcisioe made their first contribution in [conda#9614](https://github.com/conda/conda/pull/9614)
* @wolfv made their first contribution in [conda#13095](https://github.com/conda/conda/pull/13095) and [conda-build#4813](https://github.com/conda/conda-build/pull/4813)
* @zeehio made their first contribution in [conda#13075](https://github.com/conda/conda/pull/13075)

If you have ideas or want to help improve any of the conda community projects, we love to see new (and returning) contributors! 😄
