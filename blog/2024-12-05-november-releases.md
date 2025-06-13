---
title: "November 2024 Releases"
slug: "2024-12-05-november-releases"
authors: [kenodegard]
tags: [announcement, conda, conda-build, conda-libmamba-solver]
description: |
  conda 24.11.0, conda-build 24.11.2, and conda-libmamba-solver 24.11.1 have been released! 🎉
image: img/blog/2024-12-05-november-releases/banner.png
---

The November 2024 releases included updates to conda, conda-build, and conda-libmamba-solver! 🎉 All of these have been released to both `main` and `conda-forge` channels.

<!-- truncate -->

## Changes in conda [24.11.0](https://github.com/conda/conda/releases/tag/24.11.0)

To update `conda` to the latest version, run:

```bash
conda install -n base conda=24.11.0
```

### ✨ What's New? ✨

- Add a new plugin hook for reporter backends for customizing conda's output.
- Add support for CEP-17 that allows specifying the path to the site-packages directory of the the Python package via the `repodata.json`.
- Add progress bar support for reporter backends plugin hook.
- Add support for defining spinners for the reporter backends plugin hook.
- Add support for confirmation functions for reporter backends plugin hook.
- Add new plugin hooks (`conda_session_headers` and `conda_request_headers`) to add headers to outgoing HTTP requests.

### 🔧 What Got Fixed? 🔧

- Do not retry solves twice in failed `conda env` runs.
- Remove CreateNonAdminAction to prevent conda remove from deleting `.nonadmin` files.
- Do not map Python distribution names to conda names in `PrefixData(pip_interop_enabled=True)`.
- Fix output writing for `conda export --json --file`.
- Update `deprecated.action()` function to account for positional arguments that have no value specified.
- Fix continuous integration upload of coverage files.

### 🌅 What Got Deprecated or Got Marked for Future [Deprecation](https://github.com/conda-incubator/ceps/blob/main/cep-9.md)? 🌅

- Remove `__conda_reactivate` shell function in favor of `__conda_activate reactivate`.
- Mark `conda.misc.rel_path` as pending deprecation.
- Require Python 3.9 or greater.

## Changes in conda-build [24.11.0](https://github.com/conda/conda-build/releases/tag/24.11.0)/[24.11.1](https://github.com/conda/conda-build/releases/tag/24.11.1)/[24.11.2](https://github.com/conda/conda-build/releases/tag/24.11.2)

To update `conda-build` to the latest version, run:

```bash
conda install -n base conda-build=24.11.2
```

### ✨ What's New? ✨

- Introduce `--package-format` as a command line argument.
  - This takes precedence over default value and `condarc`.
  - Normalization occurs so `1`, `"1"`, `tar.bz2`,`.tar.bz2`, `2`, `"2"`, `conda`, `.conda` are all recognized and mapped appropriately.
  - Other options are rejected.
- Add support for [CEP-17](https://github.com/conda/ceps/blob/main/cep-0017.md) that allows specifying the location of the site-packages directory with the `python_site_packages_path` build option for any packages named `python`.

### 🔧 What Got Fixed? 🔧

- Fix regex for Jinja2 `set` / `for` statements to be more specific.
- Fix `ruamel.yaml` usage to use supported APIs.
- Fix a bug where variant variables were not defined for the first parsing pass of a recipe.
- Fix a bug where variants were incorrectly found as being used when they matched a leading substring of another variant.
- Fix a bug where variants were not found when variables were used in `pin_*` statements.
- (24.11.1) Fix `TypeError` when no CLI arguments are passed.
- (24.11.2) Fix a bug where `.copy()` was used on a string instead of `copy()` when processing variants.

### 🌅 What Got Deprecated or Got Marked for Future [Deprecation](https://github.com/conda-incubator/ceps/blob/main/cep-9.md)? 🌅

- Deprecate `conda_build.exceptions.UnableToParseMissingJinja2`.
- Deprecate `conda_build.index.get_build_index(locking)`.
- Deprecate `conda_build.index.get_build_index(timeout)`.
- Require Python 3.9 or greater.
- The default value for `--package-format` and `conda_pkg_format` will become `.conda` in 25.1.

### 📄 What's New in Documentation? 📄

- Better document `run_test.r`.
- Fix bug in docs build by pinning `conda-sphinx-theme` version to 0.2.2.

## Changes in conda-libmamba-solver [24.11.0rc](https://github.com/conda/conda-libmamba-solver/releases/tag/24.11.0rc)/[24.11.0](https://github.com/conda/conda-libmamba-solver/releases/tag/24.11.0)/[24.11.1](https://github.com/conda/conda-libmamba-solver/releases/tag/24.11.1)

To update `conda-libmamba-solver` to the latest version, run:

```bash
conda install -n base conda-libmamba-solver=24.11.1
```

### ✨ What's New? ✨

- Require `libmambapy` v2. This is a big refactor in `libmamba` internals, which also allowed us to remove a lot of code in `conda-libmamba-solver`.

### 🔧 What Got Fixed? 🔧

- Load SOLV repodata cache in offline mode too.
- (24.11.1) Ensure `PackageRecord` URLs are percent-decoded before passing them back to `conda`.

### 🌅 What Got Deprecated or Got Marked for Future Deprecation

- `CONDA_LIBMAMBA_SOLVER_NO_CHANNELS_FROM_INSTALLED` has no effect anymore. Channels coming from installed packages are no longer added to the channel list.
- Removed `conda_libmamba_solver.state.BaseIndexHelper`. The base class is now `conda_libmamba_solver.index.IndexHelper`.
- Verbose logging in `libsolv` has a big overhead in `libmamba` v2, so we have disabled it by default (even if the user adds `-vvv` flags to the CLI). To opt-in, please set `CONDA_LIBMAMBA_SOLVER_DEBUG_LIBSOLV` to a truthy value.
- Python 3.8 is no longer supported. The minimum version is now 3.9.

## We ❤️ Our Community

Altogether, we had 3 new contributors this release cycle; thank you to all of our open source community members for helping making these improvements possible.

- [@muffato](https://github.com/muffato) made their first contribution in [conda#14342](https://github.com/conda/conda/pull/14342)
- [@nilskch](https://github.com/nilskch) made their first contribution in [conda#14214](https://github.com/conda/conda/pull/14214)
- [@corneliusroemer](https://github.com/corneliusroemer) made their first contribution in [conda-build#5417](https://github.com/conda/conda-build/pull/5417)
