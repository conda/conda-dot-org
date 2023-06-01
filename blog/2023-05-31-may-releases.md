---
title: "May Releases for Conda, Conda-Build, and Conda-Libmamba-Solver"
slug: "2023-05-31-may-2023-releases"
description: |
    Conda 23.5.0, conda-build 3.25.0, and conda-libmamba-solver 23.5.0 have been released! 🎉
authors: [beeankha]
tags: [announcement, conda, conda-build, conda-libmamba-solver]
image: img/blog/2023-05-31-may-releases/tada.jpg

---

May releases are here! 🎊 Conda 23.5.0, conda-build 3.25.0, and conda-libmamba-solver 23.5.0 are now available on both main and conda-forge:

## [Changes in Conda](https://github.com/conda/conda/releases/tag/23.5.0)

To update conda, run:
```bash
conda install -n base conda=23.5.0
```

### ✨ What's New? ✨

The long-awaited [`conda doctor` subcommand plugin](https://conda.org/blog/2023-05-11-conda-doctor/) has been implemented! The [related conda issue is over nine years old](https://github.com/conda/conda/issues/474) and has been a regularly requested feature. The `conda doctor` command enables conda users to detect any packages with files missing (i.e., corrupt packages) in their conda environment.

<!-- truncate -->

Additionally, the following features and changes can be found in conda 23.5.0:

* `conda list --reverse` is a new option for the `conda list` command which returns a reversed list of installed packages.
* Folks who have [signature verification](https://www.anaconda.com/blog/conda-signature-verification) enabled will get warnings instead of an `info`-level message about misconfiguration.
* More functional tests have been added around conda's content trust code.
* For our build system, we switched from `setup.py` to `pyproject.toml` and use [Hatchling](https://pypi.org/project/hatchling/).
* [Which Python modules get imported during `conda activate` calls are now optimized for speed.](https://github.com/conda/conda/pull/12550)
* The `conda_cli` pytest fixture has been added in order to replace `conda.testing.helpers.run_inprocess_conda_command` and `conda.testing.integration.run_command`.
* The `tmp_env` pytest fixture has been added in order to replace `conda.testing.integration.make_temp_env`.
* The `path_factory` pytest fixture has been added to replace custom prefix logic like `conda.testing.integration._get_temp_prefix` and `conda.testing.integration.make_temp_prefix`.
* All three of the above pytest fixtures have been documented in the article [Integration Tests](https://docs.conda.io/projects/conda/en/stable/dev-guide/writing-tests/integration-tests.html).
* The way that the `Activator` classes are defined in `conda/activate.py` has been refactored.
* The index cache metadata file `.state.json` was renamed to `.info.json` to track [draft Repodata Metadata `.info.json` CEP](https://github.com/conda-incubator/ceps/pull/48).
* Improved cache locking and logging when using `jlap`.
* The project's README example has changed from IPython Notebook and NumPy to PyTorch.
* Retry language in flexible solve and `repodata` logs are now more user friendly.
* Python 3.11 is now supported.


### 🔧 What Got Fixed? 🔧

The following bug fixes were implemented in the 23.5.0 version of conda:

* `conda clean` no longer fails if it was unable to get the file stats.
* If `conda.deprecations.DeprecationHandler` receives a bad version, a fallback version is provided.
* The default value for `defaults` includes `msys2` when `context.subdir` is `win-*` on non-Windows platforms.
* `TypeError`s are avoided when non-string types are written to the index cache metadata.
* `conda.core.package_cache_data.UrlsData.get_url` no longer fails when `package_path` has a `.conda` extension.
* No more pre-converting of paths to Unix style on Windows in `conda.sh`; this done to make them prefix-replaceable upon installation.


### 🌅 What's Marked for [Deprecation](https://github.com/conda-incubator/ceps/blob/main/cep-9.md)? 🌅

The following modules and functions were marked for deprecation:

* [`conda_env.pip_util.get_pip_version`](https://github.com/conda/conda/pull/12492)
* [`conda_env.pip_util.PipPackage`](https://github.com/conda/conda/pull/12492)
* [`conda_env.pip_util.installed`](https://github.com/conda/conda/pull/12492)
* [`conda_env.pip_util._canonicalize_name`](https://github.com/conda/conda/pull/12492)
* [`conda_env.pip_util.add_pip_installed`](https://github.com/conda/conda/pull/12492)
* [`conda_env.env.load_from_directory`](https://github.com/conda/conda/pull/12492)
* [`python -m conda_env.cli.main`](https://github.com/conda/conda/pull/12492) (use `conda env` instead)
* [`python -m conda_env`](https://github.com/conda/conda/pull/12492) (use `conda env` instead)
* [`conda.auxlib.packaging`](https://github.com/conda/conda/pull/12509)
* [`conda.testing.integration.get_conda_list_tuple`](https://github.com/conda/conda/pull/12676) (use `conda.core.prefix_data.PrefixData().get()` instead)
* [`conda.testing.encode_for_env_var`](https://github.com/conda/conda/pull/12677)
* [`conda.testing.integration.temp_chdir`](https://github.com/conda/conda/pull/12678) (use `monkeypatch.chdir` instead)

* * *

## [Changes in Conda-Build](https://github.com/conda/conda-build/releases/tag/3.25.0)

To update conda-build, run:
```bash
conda install -n base conda-build=3.25.0
```

### ✨ What's New? ✨

In the latest version of conda-build, noarch packages that use virtual packages can now be added to the hash contents of a package. This facilitates the building of noarch packages multiple times for different platforms with platform-specific dependencies. In conda-build 3.25.0, different variants can be built for `__linux`, `__osx`,  or `__win` and get non-clashing package file names.

Additionally, the following features and changes can be found in conda-build 3.25.0:

* Support for [`svn` source credentials](https://docs.conda.io/projects/conda-build/en/3.25.x/resources/define-metadata.html#source-from-svn) (`svn_username` and `svn_password`).
* Standalone `conda-index` is now utilized instead of bundled indexing code.
* For our build system, we switched from `setup.py` to `pyproject.toml` and use [Hatchling](https://pypi.org/project/hatchling/).
* Minor code simplification for `conda_build.index.ChannelIndex._ensuredirs`.
* `xattr` test is enabled on MacOS.
* Python 3.11 is now supported.


### 🔧 What Got Fixed? 🔧

The following bug fixes were implemented in the 3.25.0 version of conda-build:

* `tests/commands` can also run in the presence of `run_test.*`.
* When rendering a recipe that uses the `load_file_data` Jinja2 function, the source is now required.
* Download packages during build into the correct `subdir` folder.
* A unique `subdir` variable name is used when rebuilding the index for multi-output builds, which fixes an error that occurs during true cross-compilation of `osx-arm64` packages from `osx-64`.


### 🌅 What's Marked for [Deprecation](https://github.com/conda-incubator/ceps/blob/main/cep-9.md)? 🌅

* [Inline `conda index` logic](https://github.com/conda/conda-build/pull/4828) (`conda-build` still provides `conda-index` a.k.a. `conda index` CLI, but uses standalone `conda-index` during builds).
* Prefer the [standalone conda-index package](https://conda.github.io/conda-index/), instead of `conda-build index` or `conda index`, to use faster indexing code.
* [`conda_build.metadata.ns_cfg`](https://github.com/conda/conda-build/pull/4837) (use `conda_build.get_selectors.get_selectors` instead). (#4837)
* [`conda_build.config.python2_fs_encode`](https://github.com/conda/conda-build/pull/4843)
* [`conda_build.config._ensure_dir`](https://github.com/conda/conda-build/pull/4843) (use `stdlib`'s `pathlib.Path.mkdir(exist_ok=True)` or `os.makedirs(exist_ok=True)` instead).

* * *

## [Changes in Conda-Libmamba-Solver](https://github.com/conda/conda-libmamba-solver/releases/tag/23.5.0)

To update conda-libmamba-solver, run:
```bash
conda install -n base conda-libmamba-solver=23.5.0
```

### ✨ What's New? ✨

Amongst other improvements and bug fixes, the latest version of the conda-libmamba-solver provides a `CONDA_LIBMAMBA_SOLVER_NO_CHANNELS_FROM_INSTALLED` environment variable to prevent channels from being injected from installed packages, which is useful for air-gapped environments where external channel servers are not reachable.

Additionally, the following features and changes can be found in conda-libmamba-solver 23.5.0:

* Simplify `libmambapy.Context` initialization so that we only set the parts that we use.
* Use the new `RepoInterface` and remove the `SubdirData` subclass workarounds, which requires conda 23.5.0.
* Known solver behavior differences are now documented.
* Development docs have been updated to reflect changes in build system and other inaccuracies.
* Tests reproducing the known solver differences were added.
* Some tests on `libmamba` 1.4.2 are now skipped temporarily to workaround some test failures.


### 🔧 What Got Fixed? 🔧

The following bug fixes were implemented in the 23.5.0 version of conda-libmamba-solver:

* An issue where running `conda update <package>` would result in the package being downgraded if no newer versions were available has been fixed.
* conda-libmamba-solver 23.5.0 ensures that unauthenticated channels are not re-injected in the channel lists from installed packages if an authenticated equivalent is already present.
* `context.repodata_threads` are honored.


### 🌅 What's Marked for [Deprecation](https://github.com/conda-incubator/ceps/blob/main/cep-9.md)? 🌅

* Unnecessary user-agent tests were removed.
