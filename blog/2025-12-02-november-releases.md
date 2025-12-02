---
title: November 2025 Releases
slug: 2025-12-02-november-releases
authors: [kenodegard]
tags: [announcement, conda, conda-build, conda-libmamba-solver]
description: |
  conda 25.11.0, conda-build 25.11.0, and conda-libmamba-solver 25.11.0 have been released! 🎉
image: img/blog/2025-12-02-november-releases/banner.png
---

The November 2025 releases included updates to conda, conda-build, and conda-libmamba-solver! 🎉 All of these have been released to both `defaults` and `conda-forge` channels.

<!-- truncate -->

:::info Special Announcement

This release includes **preliminary support for fetching [CEP 16](https://conda.org/learn/ceps/cep-0016) sharded repodata**, a substantially more efficient way of distributing the necessary metadata to install packages in your environments.

You can try it out by following these steps:

- Update to `conda-libmamba-solver` 25.11.0 or later
- Enable it in your settings: `conda config --set plugins.use_sharded_repodata true`
- Set this environment variable: `CONDA_PLUGINS_USE_SHARDED_REPODATA=1`

Note that sharded repodata requires that the target channels expose the necessary metadata, too, so it will only work with CEP-16-ready deployments. `conda-libmamba-solver` will fall back to non-sharded/monolithic repodata if not available, so you can mix sharded and non-sharded channels.

This feature is only available when using `conda-libmamba-solver` 25.11.0 and later and is not implemented in the classic solver.

:::

## Changes in conda [25.11.0](https://github.com/conda/conda/releases/tag/25.11.0)

To update `conda` to the latest version, run:

```bash
conda install --name base conda=25.11.0
```

**Notable Changes:**

- Enhanced virtual packages plugin API with new fields for controlling override behavior.
- Added new `override_virtual_packages` (alias: `virtual_packages`) configuration key to `.condarc` for overriding virtual package versions and build numbers.
- Added `created` and `last_modified` properties to conda environments.
- Added new `envs_details` field to `conda info --json` output for inspecting properties of registered environments (also available via `conda info --envs --json` and `conda env list --json`).
- Fixed various bugs related to `MatchSpec` serialization, channel URL handling, and Python 3.14 compatibility.
- Improved warning for users attempting to add reserved environment variables like `PATH` to environment configurations.

Check out the full changelog for more: [25.11.0](https://github.com/conda/conda/releases/tag/25.11.0)

## Changes in conda-build [25.11.0](https://github.com/conda/conda-build/releases/tag/25.11.0)

To update `conda-build` to the latest version, run:

```bash
conda install --name base conda-build=25.11.0
```

**Notable Changes:**

- Added support for specifying a custom PyYAML loader when parsing configuration files via `conda_build.variants.parse_config_file`.
- Fixed `BUILD` environment variable to properly respect the `cdt_name` variant configuration. Previously, it was hardcoded to use `cos6` or `cos7` based on architecture.
- Fixed Windows MSVC version detection for Python 3.5+.
- Updated CMake generator handling for CMake 4 compatibility (CMake 2 support was dropped in CMake 4).
- Python 3.9 support has been removed. The minimum supported Python version is now 3.10.

Check out the full changelog for more: [25.11.0](https://github.com/conda/conda-build/releases/tag/25.11.0)

## Changes in conda-libmamba-solver [25.11.0](https://github.com/conda/conda-libmamba-solver/releases/tag/25.11.0)

To update `conda-libmamba-solver` to the latest version, run:

```bash
conda install --name base conda-libmamba-solver=25.11.0
```

**Notable Changes:**

- Added experimental support for [CEP 16](https://conda.org/learn/ceps/cep-0016) sharded repodata (see announcement above).
- Added support for [CEP 17](https://conda.org/learn/ceps/cep-0017/) `python_site_packages_path`.
- Fixed the `cpuonly` mutex to correctly prevent CUDA packages from being installed, matching classic solver behavior.
- Added new messaging for when `conda` is outdated, environment is [frozen](https://conda.org/learn/ceps/cep-0022/), and `conda-self` is installed.
- Python 3.9 support has been dropped. The minimum supported Python version is now 3.10.
- Added codspeed benchmarking GitHub action and benchmarks.

Check out the full changelog for more: [25.11.0](https://github.com/conda/conda-libmamba-solver/releases/tag/25.11.0)

## We ❤️ Our Community

Altogether, we had 7 new contributors this release cycle; thank you to all of our open source community members for helping make these improvements possible.

- [@danyeaw](https://github.com/danyeaw) made their first contribution in [conda#15208](https://github.com/conda/conda/pull/15208)
- [@lang-m](https://github.com/lang-m) made their first contribution in [conda#13165](https://github.com/conda/conda/pull/13165)
- [@hoxbro](https://github.com/hoxbro) made their first contribution in [conda#15325](https://github.com/conda/conda/pull/15325)
- [@sumanth-manchala](https://github.com/sumanth-manchala) made their first contribution in [conda#14179](https://github.com/conda/conda/pull/14179)
- [@shermansiu](https://github.com/shermansiu) made their first contribution in [conda-build#5800](https://github.com/conda/conda-build/pull/5800)
- [@agriyakhetarpal](https://github.com/agriyakhetarpal) made their first contribution in [conda-libmamba-solver#741](https://github.com/conda/conda-libmamba-solver/pull/741)
- [@stacynoland](https://github.com/stacynoland) made their first contribution in [conda-libmamba-solver#766](https://github.com/conda/conda-libmamba-solver/pull/766)
