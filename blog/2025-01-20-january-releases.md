---
title: "January 2025 Releases"
slug: "2025-01-22-january-releases"
authors: [forgottenprogramme]
tags: [announcement, conda, conda-build,]
description: |
  conda 25.1.0, conda-build 25.1.1, and conda-libmamba-solver 25.1.0 have been released! 🎉
image: img/blog/2024-12-05-november-releases/banner.png
---

The January 2025 releases included updates to conda, conda-build, and conda-libmamba-solver! 🎉 All of these have been released to both `main` and `conda-forge` channels.

<!-- truncate -->

## Changes in conda [25.1.0](https://github.com/conda/conda/releases/tag/25.1.0)

To update `conda` to the latest version, run:

```bash
conda install -n base conda=25.1.0
```

### ✨ What's New? ✨
- Set `__win` version and enable `CONDA_OVERRIDE_WIN` usage.

### 🔧 What Got Fixed? 🔧

- Merge overlapping glob build specs instead of raising `Incompatible component merge`.
- Fix a bug when invalid values are being passed to `conda shell.posix` command.
- Sort suggested subcommands when an incorrect subcommand is provided in the CLI.
- Fix a bug where the setting `denylist_channels` was not being recognized in certain cases.
- Do not use native platform version to set `__osx` or `__linux` version if the underlying OS is not macOS or Linux, respectively.
- Report real macOS version (11+ instead of 10.16) even if the Python interpreter was linked against SDK 10.15 or earlier. This applies to the `__osx` virtual package and the user agent info.
- Accept %-encoded URLs as a valid `MatchSpec`.
- Retry failed downloads one time on `ChecksumMismatchError` as caused by bad
  partial downloads. Use `r+b` or `w+b` instead of "append" mode. Improve test
  coverage.

## Changes in conda-build [25.1.0](https://github.com/conda/conda-build/releases/tag/25.1.0)/[25.1.1](https://github.com/conda/conda-build/releases/tag/25.1.1)

To update `conda-build` to the latest version, run:

```bash
conda install -n base conda-build=25.1.1
```

### ✨ What's New? ✨

- Add SHA224, SHA384 and SHA512 support for validating downloaded sources.
- Add new hashing methods (`content_sha256`, `content_sha384`, `content_sha512`) to calculate the
  checksum of the extracted contents of the downloaded source artifacts.
- Make `.conda` the new default package format. `.tar.bz2` files can still be generated with `--package-format=1` and/or `conda_build.pkg_format: 1` in your `.condarc` file.
- Add compatibility for `LIEF=0.15`. # codespell:ignore

### 🔧 What Got Fixed? 🔧

- Verify all source hashes when multiple are defined (not just the first one).
- Fix a bug where some ``CondaBuildUserError`` exceptions that were formally ``SystemExit`` exceptions
  were not being caught properly.
- Fix a bug where bad match specs from intermediate parsing results would cause parsing to fail.
- Fix `KeyError` when an inconsistent `build.pkg_type` value is specified in `meta.yaml`.

### 📄 What's New in Documentation? 📄

- Demote logging message about glob finding no matches from error to warning.

### 🌅 What Got Deprecated or Got Marked for Future Deprecation

- Removed conda_build.exceptions.UnableToParseMissingJinja2.
- Removed conda_build.index.get_build_index(locking).
- Removed conda_build.index.get_build_index(timeout).

## Changes in conda-libmamba-solver [25.1.0](https://github.com/conda/conda-libmamba-solver/releases/tag/25.1.0)

To update `conda-libmamba-solver` to the latest version, run:

```bash
conda install -n base conda-libmamba-solver=25.1.0
```

### 🔧 What Got Fixed? 🔧

- Fix dependency handling in conda env update --prune.
- Accept both pathlib.Path() and str for LibMambaSolver() prefix.

## We ❤️ Our Community

Altogether, we had 2 new contributors this release cycle; thank you to all of our open source community members for helping making these improvements possible.

- @tkelman made their first contribution in https://github.com/conda/conda-build/pull/5565
- @ypradat made their first contribution in https://github.com/conda/conda-build/pull/5560
