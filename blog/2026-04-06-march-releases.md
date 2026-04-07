---
title: March 2026 Releases
slug: 2026-04-06-march-releases
authors: [kenodegard]
tags:
  - announcement
  - conda
  - conda-build
  - conda-libmamba-solver
  - conda-content-trust
  - conda-rattler-solver
  - conda-standalone
  - constructor
  - conda-pypi
description: |
  conda 26.3.x, conda-build 26.3.0, conda-libmamba-solver 26.3.0, conda-content-trust 0.3.0, constructor 3.15.x, conda-pypi 0.5/0.6, and more have shipped! 🎉
image: img/blog/2026-03-31-february-march-releases/banner.png
---

Late winter brought conda **26.3** alongside updates across the installer, solver, and PyPI tooling stacks. Packages are on **`defaults`** and **`conda-forge`**.

<!-- truncate -->

## Changes in conda [26.3.0](https://github.com/conda/conda/releases/tag/26.3.0) / [26.3.1](https://github.com/conda/conda/releases/tag/26.3.1)

To update `conda` in `base`:

```bash
conda install --name base conda=26.3.1
```

**Notable changes:**

- `conda create --file` and `conda install --file` accept `environment.yaml` as well as `requirements.txt` and explicit exports; with `--name` / `--prefix` omitted, the name or prefix is inferred from the file. `-f` is a recognized alias for `--file` (and is no longer an alias for `--force`).
- Richer solver metadata: `PackageRecord.requested_specs` and unmerged match specs through the solver and `pre-solve` plugins.
- Environment plugins support aliases, wildcard `default_filenames`, and new `description` / `environment_format` metadata.
- Faster `conda run` (inline activators), optimized S3 downloads, and improved Windows activation for paths containing `^`.
- Clearer errors with `PackagesNotFoundInChannelsError` vs `PackagesNotFoundInPrefixError`; `conda list --size` shows non-zero sizes for metapackages; `conda search --envs` errors if the package is not found anywhere.
- Trust / signature verification moved out of core: the `conda.trust` module and built-in signature post-solve plugin are removed; use the **`conda-content-trust`** plugin when you need verification with `extra_safety_checks`.
- **26.3.1:** plugin metadata records where each plugin was registered; diagnostics and `conda info` can surface that. Conda no longer discovers subcommands by scanning `conda-*` executables on `PATH` when building the CLI (prefer the plugin system).

Many long-deprecated APIs and legacy behaviors were removed in 26.3.0; see the release notes before upgrading automation that imports conda internals.

Full changelogs: [26.3.0](https://github.com/conda/conda/releases/tag/26.3.0), [26.3.1](https://github.com/conda/conda/releases/tag/26.3.1)

## Changes in conda-build [26.3.0](https://github.com/conda/conda-build/releases/tag/26.3.0)

```bash
conda install --name base conda-build=26.3.0
```

**Notable changes:**

- Build [**v1 recipes**](https://rattler.build) using the `rattler-build` CLI.
- Tar extraction sets an explicit `filter` for **Python 3.14** compatibility.
- Dropped unused `pytz` dependency; recipe requires `conda >=25.11.0` and `conda-libmamba-solver >=25.11.0`.

Full changelog: [26.3.0](https://github.com/conda/conda-build/releases/tag/26.3.0)

## Changes in conda-libmamba-solver [26.3.0](https://github.com/conda/conda-libmamba-solver/releases/tag/26.3.0)

```bash
conda install --name base conda-libmamba-solver=26.3.0
```

**Notable changes:**

- **[CEP 16](https://conda.org/learn/ceps/cep-0016) sharded repodata** is marked ready for wider use (building on 25.11’s preliminary support).
- Offline mode can use cached shards (with sensible fallbacks); improved shard fetch fallbacks, channel ordering, sqlite cache recovery, and S3 URL joining; `.tar.bz2` duplicates are dropped when `.conda` exists and `use_only_tar_bz2` is off.

Full changelog: [26.3.0](https://github.com/conda/conda-libmamba-solver/releases/tag/26.3.0)

## Changes in conda-content-trust [0.3.0](https://github.com/conda/conda-content-trust/releases/tag/0.3.0)

```bash
conda install conda-content-trust=0.3.0
```

**Notable changes:**

- **`CondaPostSolve` hook** for signature verification (migrated from conda’s former `conda.trust` implementation), aligned with conda 26.3’s plugin-based trust story.
- Supports **Python 3.13** and **3.14**; drops **3.8** and **3.9**.

Full changelog: [0.3.0](https://github.com/conda/conda-content-trust/releases/tag/0.3.0)

## Changes in conda-rattler-solver [0.0.6](https://github.com/conda/conda-rattler-solver/releases/tag/0.0.6)

```bash
conda install conda-rattler-solver=0.0.6
```

**Notable changes:**

- Bumps **py-rattler** to **0.23**.

Full changelog: [0.0.6](https://github.com/conda/conda-rattler-solver/releases/tag/0.0.6)

## Changes in conda-standalone [26.1.1](https://github.com/conda/conda-standalone/releases/tag/26.1.1)

**Notable changes:**

- Updated embedded **conda**, **libmambapy 2.5.0**, and **Python 3.13.12**.
- Data files only for the **native** platform; **PATH** ordering fixed for classic (`--classic`) init; **`constructor extract`** legacy argument handling fixed.

Full changelog: [26.1.1](https://github.com/conda/conda-standalone/releases/tag/26.1.1)

## Changes in constructor [3.15.0](https://github.com/conda/constructor/releases/tag/3.15.0) / [3.15.1](https://github.com/conda/constructor/releases/tag/3.15.1)

```bash
conda install constructor=3.15.1
```

**Notable changes (3.15.0):**

- Support for installing [**protected (frozen) environments**](https://conda.org/learn/ceps/cep-0022#specification) (CEP 22).
- **`INSTALLER_PATH`** (and **`INSTALLER_PLUGINSDIR`** for EXE) exposed to pre/post install scripts.
- Architecture checks on **macOS** `.sh` and `.pkg` installers; EXE pre-install script respects the UI checkbox; Mach-O signing under `_internal` for notarization.

**3.15.1:** EXE uninstaller fix for **`INSTDIR`** vs **`PATH`**; canary CI uses the latest `conda-standalone` **onedir** build.

Full changelogs: [3.15.0](https://github.com/conda/constructor/releases/tag/3.15.0), [3.15.1](https://github.com/conda/constructor/releases/tag/3.15.1)

## Changes in conda-pypi [0.5.0](https://github.com/conda/conda-pypi/releases/tag/0.5.0) / [0.6.0](https://github.com/conda/conda-pypi/releases/tag/0.6.0)

```bash
conda install conda-pypi=0.6.0
```

**Notable changes (0.5.0):**

- Test injection for **`conda pypi convert`**; **`--name-mapping`** for custom PyPI→conda name maps; fixes for **`headers`** wheels, **hex** wheel hashes (conda-rattler-solver compatibility), and **`data` / `scripts`** schemes.

**0.6.0:** repodata **`v3.whl`** test fixtures (`extra_depends`, normalized **`when`**); **PEP 508** marker conversion for `[when=…]` entries; dependency fix for **`conda-package-streaming`**.

Full changelogs: [0.5.0](https://github.com/conda/conda-pypi/releases/tag/0.5.0), [0.6.0](https://github.com/conda/conda-pypi/releases/tag/0.6.0)

## We ❤️ our community

Thank you to everyone who contributed fixes, features, and first patches this cycle.

- [@ELundby45](https://github.com/ELundby45) in [conda#15716](https://github.com/conda/conda/pull/15716)
- [@crowecawcaw](https://github.com/crowecawcaw) in [conda#15636](https://github.com/conda/conda/pull/15636)
- [@lsoksane](https://github.com/lsoksane) in [conda#15549](https://github.com/conda/conda/pull/15549)
- [@shenhaofang](https://github.com/shenhaofang) in [conda#15664](https://github.com/conda/conda/pull/15664)
- [@agriyakhetarpal](https://github.com/agriyakhetarpal) in [conda-content-trust#238](https://github.com/conda/conda-content-trust/pull/238) and [conda-pypi#246](https://github.com/conda/conda-pypi/pull/246)
- [@dbast](https://github.com/dbast) in [conda-content-trust#98](https://github.com/conda/conda-content-trust/pull/98)
- [@jaimergp](https://github.com/jaimergp) in [conda-content-trust#227](https://github.com/conda/conda-content-trust/pull/227)
- [@danyeaw](https://github.com/danyeaw) in [conda-build#5920](https://github.com/conda/conda-build/pull/5920)
- [@opoplawski](https://github.com/opoplawski) in [conda-build#5859](https://github.com/conda/conda-build/pull/5859)
- [@tombenes](https://github.com/tombenes) in [conda-pypi#253](https://github.com/conda/conda-pypi/pull/253)
- [@danpetry](https://github.com/danpetry) in [conda-pypi#242](https://github.com/conda/conda-pypi/pull/242)
