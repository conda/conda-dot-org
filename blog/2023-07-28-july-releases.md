---
title: "July Releases for Conda, Conda-Build"
slug: "2023-07-28-july-2023-releases"
description: |
    Conda 23.7.0 and conda-build 3.26.0 have been released! 🎉
authors: [beeankha]
tags: [announcement, conda, conda-build]
image: img/blog/2023-07-28-july-releases/rocket.jpg

---

July releases are here! 🎊 Conda 23.7.0 and conda-build 3.26.0 are now available on both `main` and `conda-forge` channels.


## [Changes in Conda](https://github.com/conda/conda/releases/tag/23.7.0)

To update conda, run:
```bash
conda install -n base conda=23.7.0
```

### ✨ What's New? ✨

In the latest release of conda, new pre- and post-command plugin hooks that allow you to run your code before or after a conda subcommand are now available, along with a much improved subcommand plugin hook and plugin infrastructure. There is also a new health check for `conda doctor` that detects altered packages in an environment by comparing expected and computed `sha256` checksums, as well as a much-expanded API and command docs (`conda env`!).

<!-- truncate -->

Additionally, the following features and changes can be found in conda 23.7.0:

* A new `conda.deprecations.DeprecationHandler.action` helper for easier `argparse.Action`s deprecation.
* Support for the FreeBSD operating system is now available, plus `freebsd-64` is now a known subdirectory for FreeBSD on x86-64.
* No more mocking of `$CONDA_PREFIX` when `--name` or `--prefix` is provided.
* Support for `sha256` filters in the MatchSpec syntax (e.g. `*[sha256=f453db4ffe2271ec492a2913af4e61d4a6c118201f07de757df0eff769b65d2e]`).
* `distutils` has been removed in favor of the vendored version in `setuptools` 60 and later or standard library equivalents, per the [PEP 632 migration guide](https://peps.python.org/pep-0632/#migration-advice).
* There is now a new [`CITATION.cff`](https://github.com/conda/conda/blob/main/CITATION.cff) file in the root of the repository to make it easier for users to cite conda.
* There is an optional `CondaSubcommand.configure_parser` that allows third-party plugins to hook into conda's argument parser.
* Only third-party subcommands are displayed with `conda --help`; plugin and legacy commands are also de-duplicated with that command.
* Plugins are registered using their canonical/fully-qualified name instead of the easily-spoofable entry point name.
* Subcommand parsing has been refactored to use a greedy parser since `argparse.REMAINDER` has [known issues](https://github.com/python/cpython/issues/61252).


### 🔧 What Got Fixed? 🔧

The following bug fixes were implemented in the 23.7.0 version of conda:

* `requests.exceptions.JSONDecodeError` is utilized for ensuring compatibility with different `json` implementations used by requests. This fixes a bug that caused only the first of multiple given source URLs to be tried. This also raises the minimum required requests version to 2.27.0.
* `__osx` virtual package are no longer exported when `CONDA_OVERRIDE_OSX` is set to an empty string.
* Erroneous `conda deactivate` behavior that unset pre-existing environment variables that are identical to those set during `conda activate` has been fixed.
* Third-party subcommands now correctly receive _remaining_ arguments instead of a blanket `sys.argv[2:]`, which broke `conda_cli` testing.


### 📄 What's New in Documentation? 📄

* `pre_commands` and `post_commands` plugin hooks.
* Docstrings for all public modules have been added.
* API docs are now auto-generated using `sphinx-autoapi`.
* All manual redirects have been converted into config using `sphinx-reredirects`.
* The plugins index page has been revised to make it easier to understand how to create a conda plugin.
* Missing `conda env` CLI docs have been added.


### 🌅 What's Marked for [Deprecation](https://github.com/conda-incubator/ceps/blob/main/cep-9.md)? 🌅

The following modules and functions were marked for deprecation:

* [`conda.base.context.context.root_dir`](https://github.com/conda/conda/pull/12701) (use `conda.base.context.context.root_prefix` instead)
* [`conda.plugins.subcommands.doctor.cli.get_prefix`](https://github.com/conda/conda/pull/12725) (use `conda.base.context.context.target_prefix` instead)
* [`conda.models.leased_path_entry.LeasedPathEntry`](https://github.com/conda/conda/pull/12735)
* [`conda.models.enums.LeasedPathType`](https://github.com/conda/conda/pull/12735)
* [`conda.common.temporary_content_in_file`](https://github.com/conda/conda/pull/12795) (use `tempfile` instead)
* [`conda.cli.python_api`](https://github.com/conda/conda/pull/12796) (use `conda.testing.conda_cli` fixture instead)


* * *

## [Changes in Conda-Build](https://github.com/conda/conda-build/releases/tag/3.26.0)

To update conda-build, run:
```bash
conda install -n base conda-build=3.26.0
```

### ✨ What's New? ✨

In the latest version of conda-build, extra-meta data is logged to make it easier to verify that the right extra-meta data is burned into packages (which also helps to co-relate packages and their build-log). The feature was first introduced in [PR #4303](https://github.com/conda/conda-build/pull/4303) and is now improved via the logging call.

Additionally, the following features and changes can be found in conda-build 3.26.0:

* `pip` has been added to the `env-doc make` command so that the function works correctly (`pip` is no longer added by default with the python conda package).
* Subcommands are implemented as conda plugins.
* Duplicate `get_summary` calls are dropped in `conda_build.skeletons.pypi`.
* `resolved_packages` tests that failed due to recent OpenSSL 3.0.8 release to defaults is now fixed.


### 🔧 What Got Fixed? 🔧

The following bug fixes were implemented in the 3.26.0 version of conda-build:

* The handling of unknown binaries with newer `(py)lief` versions has been fixed.
* `LIEF` logging to remove "Unknown format" warning message is disabled.
* `enable_static` default value in `conda_build.config` to remove "Failed to get_static_lib_exports" warning messages has been reverted.
* We now avoid duplicate logging by not propagating the top-level conda-build logger.
* Git cloning for repositories with submodules containing local relative paths has been fixed.


### 📄 What's New in Documentation? 📄

* `pkg-spec` docs have been updated to mention `.conda` package format.
* Unnecessary Jinja package name variables from `variants.rst` docs file have been dropped.


### 🌅 What's Marked for [Deprecation](https://github.com/conda-incubator/ceps/blob/main/cep-9.md)? 🌅

* [Executable invocations (e.g., `conda-build`)](https://github.com/conda/conda-build/pull/4921)
* [Module-based invocations (e.g., `python -m conda_build.cli.main_build`)](https://github.com/conda/conda-build/pull/4921)


* * * 

### We ❤️ Our Community

Altogether we had 10 (!) new contributors to the conda and conda-build repositories this release cycle; thank you to the conda community for helping make this release so great.

If you have ideas or want to help improve conda and/or conda-build, we love to see new (and returning) contributors! 😄
