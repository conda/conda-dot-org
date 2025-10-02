---
title: September 2025 Releases
slug: 2025-10-01-september-releases
authors: [kenodegard]
tags: [announcement, conda, conda-build]
description: |
  conda 25.9.0 and conda-build 25.9.0 have been released! 🎉
image: img/blog/2025-10-01-september-releases/banner.png
---

The September 2025 releases included updates to conda and conda-build! 🎉 Both have been released to `defaults` and `conda-forge` channels.

<!-- truncate -->

## Changes in conda [25.9.0](https://github.com/conda/conda/releases/tag/25.9.0)

:::warning Special Announcement

Following feedback from conda users last year about the pre-configuration of the conda code base to favor channels from Anaconda Inc, we've [finished removing](https://github.com/conda/conda/issues/14178) hardcoding Anaconda's channels as the default set of channels in the conda source code.

It is now up to providers of the conda distributions, such as [miniforge](https://github.com/conda-forge/miniforge) or Anaconda (including miniconda), to pre-configure their preferred channels, e.g. by running the necessary `conda config --set channels` command.

:::

To update `conda` to the latest version, run:

```bash
conda install -n base conda=25.9.0
```

**Notable Changes:**

- Added two new health checks to `conda doctor`:
    - Check for ill-formed pinned file.
    - Check whether file locking is supported.
- Prevent renaming an environment currently listed as the `default_activation_env`.
- Added a new environment specifier, `cep-24`. This is a stricter version of the `environment.yml` format that enforces [specific requirements](/learn/ceps/cep-0024) and can be used when creating an environment from a file, e.g., `conda env create --file FILE --environment-specifier cep-24`.
- Update environment model to support multiple platforms. This allows `conda export --format FORMAT` to support exporting multiple platforms at once.
- Annotate frozen environments in `conda env list`.
- Various deprecations.

Check out the full changelog for more: [25.9.0](https://github.com/conda/conda/releases/tag/25.9.0)

## Changes in conda-build [25.9.0](https://github.com/conda/conda-build/releases/tag/25.9.0)

To update `conda-build` to the latest version, run:

```bash
conda install -n base conda-build=25.9.0
```

**Notable Changes:**

No major changes to report. We just removed some deprecated code according to our deprecation schedule and made corrections to documentation.

Check out the full changelog for more: [25.9.0](https://github.com/conda/conda-build/releases/tag/25.9.0)

## We ❤️ Our Community

Altogether, we had 7 new contributors this release cycle; thank you to all of our open source community members for helping making these improvements possible.

- [@zeyugao](https://github.com/zeyugao) made their first contribution in [conda#14660](https://github.com/conda/conda/pull/14660)
- [@jcazevedo](https://github.com/jcazevedo) made their first contribution in [conda#15140](https://github.com/conda/conda/pull/15140)
- [@nblair](https://github.com/nblair) made their first contribution in [conda#15037](https://github.com/conda/conda/pull/15037)
- [@lrandersson](https://github.com/lrandersson) made their first contribution in [conda#15249](https://github.com/conda/conda/pull/15249)
- [@ColemanTom](https://github.com/ColemanTom) made their first contribution in [conda-build#5774](https://github.com/conda/conda-build/pull/5774)
- [@jsmolic](https://github.com/jsmolic) made their first contribution in [conda-build#5792](https://github.com/conda/conda-build/pull/5792)
- [@roryyorke](https://github.com/roryyorke) made their first contribution in [conda-build#5772](https://github.com/conda/conda-build/pull/5772)
