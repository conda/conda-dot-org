---
title: January 2026 Releases
slug: 2026-02-03-january-releases
authors: [kenodegard]
tags: [announcement, conda, conda-build, conda-pack]
description: |
  conda 26.1.0, conda-build 26.1.0, and conda-pack 0.9.1 have been released! 🎉
image: img/blog/2026-02-03-january-releases/banner.png
---

The January 2026 releases included updates to conda, conda-build, and conda-pack! 🎉 All of these have been released to both `defaults` and `conda-forge` channels.

<!-- truncate -->

## Changes in conda [26.1.0](https://github.com/conda/conda/releases/tag/26.1.0)

To update `conda` to the latest version, run:

```bash
conda install --name base conda=26.1.0
```

**Notable Changes:**

- Added support for Python 3.14.
- Added new `--size` flag to `conda info --envs`, `conda env list`, and `conda list` commands to display disk usage for environments and packages.
- Added `--fix` flag to `conda doctor` with health check fix capabilities.
- Added `-s` as a shorthand alias for `conda run --no-capture-output` and `-O` as an alias for `--override-channels`.
- Speed improvements: faster context initialization through caching condarc file reads, deferred `PrefixData` record instantiation, and faster `conda run` via inline environment activation.
- Added `conda_package_extractors` plugin hook to allow plugins to register custom package archive extractors.
- Added `conda.cli.condarc.ConfigurationFile` class for programmatic configuration file manipulation.
- `conda run` now properly deactivates the environment on exiting the command.
- Improved error messages for HTTP 403 responses and various platform-specific issues.
- Fixed parallel conda command failures on Windows by using GUIDs for unique temp filenames.
- Fixed `conda clean --tarballs` to also clean up `.partial` download files.

Check out the full changelog for more: [26.1.0](https://github.com/conda/conda/releases/tag/26.1.0)

## Changes in conda-build [26.1.0](https://github.com/conda/conda-build/releases/tag/26.1.0)

To update `conda-build` to the latest version, run:

```bash
conda install --name base conda-build=26.1.0
```

**Notable Changes:**

- Added support for [CEP 28](https://github.com/conda/ceps/blob/main/cep-0028.md) (customizable system DLL linkage checks for Windows).
- Enabled `echo on` for Windows build scripts for better debugging visibility.
- Added riscv64 architecture support to the `cdt()` Jinja function.
- Fixed rpath handling on macOS to delete rpath before adding to avoid space errors.
- Fixed handling of unknown dynamic tags in liefldd.
- Fixed handling of empty source archives (now ignores and continues instead of failing).
- Bumped minimum `conda` version to 25.11.0 and `conda-libmamba-solver` to 25.11.0.

Check out the full changelog for more: [26.1.0](https://github.com/conda/conda-build/releases/tag/26.1.0)

## Changes in conda-pack [0.9.0](https://github.com/conda/conda-pack/releases/tag/0.9.0)/[0.9.1](https://github.com/conda/conda-pack/releases/tag/0.9.1)

To update `conda-pack` to the latest version, run:

```bash
conda install conda-pack=0.9.1
```

**Notable Changes:**

- Replaced deprecated `pkg_resources` with `importlib.resources` for better compatibility with modern Python.
- Added optional progress bar to `conda-unpack` for better user feedback.
- Fixed issue with extended path format on Windows.
- Fixed executables for all users.
- Updated Python supported versions.

Check out the full changelog for more: [0.9.0](https://github.com/conda/conda-pack/releases/tag/0.9.0)/[0.9.1](https://github.com/conda/conda-pack/releases/tag/0.9.1)

## We ❤️ Our Community

Altogether, we had 8 new contributors this release cycle; thank you to all of our open source community members for helping make these improvements possible.

- [@degerahmet](https://github.com/degerahmet) made their first contribution in [conda#14698](https://github.com/conda/conda/pull/14698)
- [@Bhanuu01](https://github.com/Bhanuu01) made their first contribution in [conda#15554](https://github.com/conda/conda/pull/15554)
- [@barabo](https://github.com/barabo) made their first contribution in [conda#15418](https://github.com/conda/conda/pull/15418)
- [@gayanMatch](https://github.com/gayanMatch) made their first contribution in [conda#15596](https://github.com/conda/conda/pull/15596)
- [@giacomo-ciro](https://github.com/giacomo-ciro) made their first contribution in [conda#15428](https://github.com/conda/conda/pull/15428)
- [@matthewfeickert](https://github.com/matthewfeickert) made their first contribution in [conda#15622](https://github.com/conda/conda/pull/15622)
- [@pirzada-ahmadfaraz](https://github.com/pirzada-ahmadfaraz) made their first contribution in [conda#15602](https://github.com/conda/conda/pull/15602)
- [@vshevchenko-anaconda](https://github.com/vshevchenko-anaconda) made their first contribution in [conda#15376](https://github.com/conda/conda/pull/15376)
