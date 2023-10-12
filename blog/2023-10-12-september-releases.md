---
title: "September 2023 Releases"
slug: "2023-10-12-september-releases"
description: |
    Conda 23.9.0, conda-build 3.27.0, conda-libmamba-solver 23.9.1, conda-index 0.3.0, and pycosat 0.6.6 have been released! 🎉
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

> Conda's default solver will change to [`conda-libmamba-solver`](https://conda.github.io/conda-libmamba-solver/) in a __special 23.10.0 release__ in the near future!

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



### 🔧 What Got Fixed? 🔧



### 📄 What's New in Documentation? 📄



### 🌅 What's Marked for [Deprecation](https://github.com/conda-incubator/ceps/blob/main/cep-9.md)? 🌅



* * * 

### We ❤️ Our Community

Altogether we had 10 (!) new contributors to the conda and conda-build repositories this release cycle; thank you to all of our open source community members for helping make the new versions of conda and conda-build so great.



If you have ideas or want to help improve any of the conda community projects, we love to see new (and returning) contributors! 😄
