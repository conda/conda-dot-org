---
title: July 2025 Releases
slug: 2025-08-05-july-releases
authors: [travishathaway]
tags: [announcement, conda, conda-build, constructor, menuinst]
description: |
  conda 25.7.0, conda-build 25.7.0, constructor 3.12.2 and menuinst 2.3.1 have been released! 🎉
image: img/blog/2025-08-05-july-releases/banner.png
---

The July 2025 releases included updates to conda, conda-build, constructor, and menuinst! 🎉 All of these have been released to both `defaults` and `conda-forge` channels.

<!-- truncate -->

## Changes in conda [25.7.0](https://github.com/conda/conda/releases/tag/25.7.0)

To update `conda` to the latest version, run:

```bash
conda install -n base conda=25.7.0
```

**Notable Changes:**

- Enhanced `conda export` command now supports plugin-based architecture with multiple output formats: `yaml`, `json`, and `txt`.
- Add automatic export format detection based on filename patterns (e.g., `environment.yaml`, `explicit.txt`, `requirements.txt`)
- Add "environment consistency" health check to `conda doctor`.

Check out the full changelog for more: [25.7.0](https://github.com/conda/conda/releases/tag/25.7.0)

## Changes in conda-build [25.7.0](https://github.com/conda/conda-build/releases/tag/25.7.0)

To update `conda-build` to the latest version, run:

```bash
conda install -n base conda-build=25.7.0
```

**Notable Changes:**

No major changes to report. We just removed some deprecated code according to our deprecation schedule.

Check out the full changelog for more: [25.7.0](https://github.com/conda/conda-build/releases/tag/25.7.0)

## Changes in constructor [3.12.2](https://github.com/conda/constructor/releases/tag/3.12.2)

To update `constructor` to the latest version, run:

```bash
conda install -n base constructor=3.12.2
```

**Notable Changes:**

- Added support for `conda init --condabin`, `mamba`'s mirrored channels, and the faster `onedir` variant of `conda-standalone`.
- EXE installers: fixed a permission issue for all-user installations for noarch package entry points.

Check out the full changelog for more:
- [3.12.0](https://github.com/conda/constructor/releases/tag/3.12.0)
- [3.12.1](https://github.com/conda/constructor/releases/tag/3.12.1)
- [3.12.2](https://github.com/conda/constructor/releases/tag/3.12.2)

## Changes in menuinst [2.3.1](https://github.com/conda/menuinst/releases/tag/2.3.1)

To update `menuinst` to the latest version, run:

```bash
conda install -n base menuinst=2.3.1
```

**Notable Changes:**

- Bug fix: shortcuts are now only created for platforms explicitly enabled in the metadata.
- Added support for the new activation behavior of `conda` on Windows.

Check out the full changelog for more:
- [2.3.0](https://github.com/conda/menuinst/releases/tag/2.3.0) (full release notes with new features)
- [2.3.1](https://github.com/conda/menuinst/releases/tag/2.3.1) (patch release)

## We ❤️ Our Community

Altogether, we had 2 new contributors this release cycle; thank you to all of our open source community members for helping making these improvements possible.

- [@IsabelParedes](https://github.com/IsabelParedes) made their first contribution in [constructor#1008](https://github.com/conda/constructor/pull/1008)
- [@mmc1718](https://github.com/mmc1718) made their first contribution in [conda#15025](https://github.com/conda/conda/pull/15025)
