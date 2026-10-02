---
title: August and September 2026 Releases
slug: 2026-10-02-september-releases
authors: [jezdez]
tags:
  - announcement
  - conda
  - conda-build
  - conda-pypi
  - conda-rattler-solver
  - constructor
  - rattler
  - grayskull
  - conda-spawn
description: |
  conda and conda-build 26.9.0 are out, with native Windows ARM64 launchers, package timestamp filtering, v1 recipe fixes, and more releases since July.
image: img/blog/2026-10-02-september-releases/banner.png
---

conda and conda-build 26.9.0 are out. Since our [June and July update](/blog/2026-08-03-july-releases), conda-pypi, constructor, rattler, grayskull, and several other projects have shipped releases too.

<!-- truncate -->

## Changes in conda [26.9.0](https://github.com/conda/conda/releases/tag/26.9.0)

:::warning Special Announcement

**Automatic pip installation will change in a future release.** Conda 26.9 still installs pip alongside Python by default. This behavior becomes deprecated in 27.3, and the default changes in 27.9.

If an environment needs pip, request it explicitly:

```bash
conda create --name myenv python pip
```

To keep automatic installation, run `conda config --set add_pip_as_python_dependency true`. The setting itself will remain supported. See the [rollout schedule](https://github.com/conda/conda/issues/16404) for details.

:::

:::info Special Announcement

**Native Windows ARM64 launchers are here.** Conda 26.9 uses signed ARM64 executables for Python command-line entry points in `win-arm64` environments and checks their SHA-256 hashes before installation. It also fixes a problem with [direct upgrades from defaults conda 26.7.2](https://github.com/conda/conda/pull/16777) that could leave those commands missing. conda-build 26.9 uses the published launchers when building Windows packages too.

:::

To install this conda release:

```bash
conda install --name base conda=26.9.0
```

- `--exclude-newer` lets you exclude package records newer than a date or age cutoff, with channel and package overrides. Configured cutoffs also apply to `conda search`. The selected solver must support `--exclude-newer`. Conda prefers channel index timestamps, falls back to build timestamps, and leaves records without usable timestamps eligible. This is not a guaranteed delay after publication. See the [usage guide](https://docs.conda.io/projects/conda/en/26.9.x/user-guide/tasks/manage-pkgs.html#installing-packages-with-an-upload-cutoff).
- Startup loads only the command parsers it needs. Wildcard searches on sharded channels also avoid constructing records for names that cannot match.
- `conda plugins list` and `conda plugins info` show installed plugins and their metadata, including disabled plugins.
- `conda doctor --fix` repairs missing or altered files more reliably. On macOS ARM64, code signing no longer causes false reports of altered files.
- Replacing an existing environment with `conda env create` now requires `--yes` or the `always_yes` setting.
- `conda config --clear KEY` empties a list-valued setting, such as a channel list.

September is also a deprecation release. Plugin authors should import types from `conda.plugins.types` instead of `conda.plugins`. Environment files whose format cannot be detected no longer fall back automatically to the `environment.yml` reader. Select it explicitly with `--format=environment.yml` when needed. The [full release notes](https://github.com/conda/conda/releases/tag/26.9.0) list the API removals and replacements.

The intervening patch releases were [26.7.1](https://github.com/conda/conda/releases/tag/26.7.1), [26.7.2](https://github.com/conda/conda/releases/tag/26.7.2), and [26.7.3](https://github.com/conda/conda/releases/tag/26.7.3).

A known issue remains in 26.9.0: the package-cache fix from 26.7.3 was omitted. If `.conda` and `.tar.bz2` archives coexist in the cache, extraction can fail with `Invalid data stream`. The [fix for the 26.9 branch](https://github.com/conda/conda/pull/16793) is merged and tracked for [26.9.1](https://github.com/conda/conda/issues/16620).

## Changes in conda-build [26.9.0](https://github.com/conda/conda-build/releases/tag/26.9.0)

```bash
conda install --name base conda-build=26.9.0
```

- Packages built from v1 recipes can now be tested, including downstream tests. v1 builds also respect `--croot`, `conda_build.root-dir`, and legacy `conda_build_config.yaml` syntax.
- Windows entry points use `conda-launchers` for the target architecture, with checksum verification. conda-build now requires conda 26.1 or newer.
- `SP_DIR` follows the installed Python package's site-packages metadata. This fixes paths for free-threaded Python and the new Windows Python 3.15 layout.
- Exact `pin_subpackage()` references keep the final build ID, including dependency hashes. `conda-build --output` also respects `--variants`.
- Package names are checked against [CEP 26](/learn/ceps/cep-0026). A directory containing both `meta.yaml` and `recipe.yaml` is rejected instead of leaving the recipe choice ambiguous.
- `REQUESTS_CA_BUNDLE` can be set through build variants. An unset environment variable is no longer passed to build scripts as an empty value that can break TLS clients.

The recipe keys `build/missing_dso_whitelist` and `build/runpath_whitelist` are now deprecated and will be removed in 27.3. Use `build/missing_dso_allowlist` and `build/runpath_allowlist` instead.

August's [26.7.1](https://github.com/conda/conda-build/releases/tag/26.7.1) also fixed multi-output script architecture selection under emulation and Windows ARM64 entry points.

Full changelog: [26.9.0](https://github.com/conda/conda-build/releases/tag/26.9.0)

## Changes in conda-pypi [0.12.0](https://github.com/conda/conda-pypi/releases/tag/0.12.0) / [0.13.0](https://github.com/conda/conda-pypi/releases/tag/0.13.0)

conda-pypi has dropped its beta label. The [installation guide](https://docs.conda.io/projects/conda/en/26.9.x/user-guide/tasks/install-packages-from-pypi.html) covers installing supported pure Python wheels through `conda install` and requires conda 26.9 or newer for that workflow.

These releases reduce startup imports and fix dependency extras and wheel metadata when restoring environments from explicit files or lockfiles. `conda pypi convert` preserves wheel build numbers and accepts `--build-number`. Installing package specs with `conda pypi install` is pending deprecation. Editable installs remain supported.

## Changes in constructor [3.17.0](https://github.com/conda/constructor/releases/tag/3.17.0) through [3.17.3](https://github.com/conda/constructor/releases/tag/3.17.3)

constructor can build native Windows ARM64 installers. Windows installation-directory permission setup is faster, and `info.json` records more installer metadata and checksums.

The [3.17.1](https://github.com/conda/constructor/releases/tag/3.17.1), [3.17.2](https://github.com/conda/constructor/releases/tag/3.17.2), and [3.17.3](https://github.com/conda/constructor/releases/tag/3.17.3) patches fix Windows command lookup, MSI uninstall after package-cache cleanup, and an unintended Pydantic runtime dependency. constructor now requires conda 24.1 or newer.

## Changes in conda-rattler-solver [0.2.0](https://github.com/conda/conda-rattler-solver/releases/tag/0.2.0)

The Rattler solver remains an opt-in beta, now bundled with conda 26.9. It respects flexible channel priority, reads v3 records from sharded channels, and handles dependency extras. Updates avoid downgrading packages and retain installed packages that are no longer available from configured channels. `conda update --all` keeps Python within its existing major and minor version.

This release uses py-rattler 0.26 and requires conda 26.7 or newer. Its conda packages require Python 3.11 or newer. See [New features to try](https://docs.conda.io/projects/conda/en/26.9.x/new-features.html) for how to enable it.

## Changes in py-rattler [0.26.0](https://github.com/conda/rattler/releases/tag/py-rattler-v0.26.0) / [0.27.0](https://github.com/conda/rattler/releases/tag/py-rattler-v0.27.0)

py-rattler 0.26 adds reverse-dependency queries, configuration-file support, and sparse reads of remote package archives. Wheels are now available for Windows ARM64 and Linux RISC-V. Version 0.27 adds optional Sigstore verification before installation and exposes the verified signing provenance to callers.

Both releases include Python API changes, detailed in their release notes. conda-rattler-solver 0.2.0 requires py-rattler below 0.27, so its users should let conda select the compatible version.

## Changes in grayskull [3.2.0](https://github.com/conda/grayskull/releases/tag/v3.2.0)

grayskull now generates v1 recipes by default for PyPI and CRAN packages. Use `--no-use-v1-format` if you still need a v0 `meta.yaml` recipe. This release also improves PEP 639 license metadata and Python-version handling in noarch v1 recipes.

## Changes in conda-spawn [0.2.0](https://github.com/conda/conda-spawn/releases/tag/0.2.0)

`conda shell` is now an alias for `conda spawn`, which opens a shell in a conda environment. The release fixes activation in PowerShell sessions, ensures Fish and Xonsh activation finishes before the first prompt, and preserves login startup files and logout behavior in POSIX shells.

## Other releases

- [conda-self 0.3.0](https://github.com/conda/conda-self/releases/tag/0.3.0) can update dependencies of the requested package and checks snapshot archives before modifying an environment. The ambiguous `--snapshot installer` choice is replaced by `installer-exact` and `installer-updated`.
- [conda-index 0.13.0](https://github.com/conda/conda-index/releases/tag/0.13.0) removes the experimental label from sharded-index and database options and fixes PostgreSQL run-export handling.
- [conda-package-handling 2.6.0](https://github.com/conda/conda-package-handling/releases/tag/2.6.0) opens each `.conda` ZIP archive only once during extraction and makes custom exceptions serializable between processes.
- [conda-lockfiles 0.2.2](https://github.com/conda/conda-lockfiles/releases/tag/0.2.2) preserves explicit build numbers when exporting and reading rattler-lock v6 files.
- [conda-standalone 26.7.0](https://github.com/conda/conda-standalone/releases/tag/26.7.0) updates its bundled conda and conda-libmamba-solver to 26.7.0 and fixes macOS shortcuts affected by a missing Swift library search path.
- [conda-recipe-manager 0.10.6](https://github.com/conda/conda-recipe-manager/releases/tag/v0.10.6) preserves Jinja templates when fixing ambiguous variables and improves duplicate-key errors.
- [conda-pycosat-solver 0.1.0](https://github.com/conda/conda-pycosat-solver/releases/tag/0.1.0) is the first separate plugin release of the classic solver. conda 26.9 still ships its own classic solver.
- [conda/actions 26.8.0](https://github.com/conda/actions/releases/tag/v26.8.0) through [26.9.5](https://github.com/conda/actions/releases/tag/v26.9.5) add release-preparation actions, a GitHub Releases backend for canary packages, and native Windows ARM64 canary builds.

## We ❤️ our community

Thank you to everyone who contributed to these releases. Welcome to the first-time contributors to these projects:

- [@abdul-050](https://github.com/abdul-050) in [conda-pypi#479](https://github.com/conda/conda-pypi/pull/479)
- [@agriyakhetarpal](https://github.com/agriyakhetarpal) in [conda-rattler-solver#152](https://github.com/conda/conda-rattler-solver/pull/152)
- [@andreruizloera](https://github.com/andreruizloera) in [conda#16436](https://github.com/conda/conda/pull/16436)
- [@beckermr](https://github.com/beckermr) in [conda-recipe-manager#554](https://github.com/conda/conda-recipe-manager/pull/554)
- [@bingliscodes](https://github.com/bingliscodes) in [conda-pypi#534](https://github.com/conda/conda-pypi/pull/534)
- [@codewithdaniel1](https://github.com/codewithdaniel1) in [conda#16465](https://github.com/conda/conda/pull/16465)
- [@danyeaw](https://github.com/danyeaw) in [conda-spawn#44](https://github.com/conda/conda-spawn/pull/44)
- [@ForgottenProgramme](https://github.com/ForgottenProgramme) in [conda-rattler-solver#117](https://github.com/conda/conda-rattler-solver/pull/117)
- [@GruffElixir](https://github.com/GruffElixir) in [conda#16668](https://github.com/conda/conda/pull/16668)
- [@jaimergp](https://github.com/jaimergp) in [grayskull#658](https://github.com/conda/grayskull/pull/658)
- [@JeanChristopheMorinPerso](https://github.com/JeanChristopheMorinPerso) in [conda-build#6072](https://github.com/conda/conda-build/pull/6072)
- [@jezdez](https://github.com/jezdez) in [conda-recipe-manager#548](https://github.com/conda/conda-recipe-manager/pull/548)
- [@jjerphan](https://github.com/jjerphan) in [conda#16495](https://github.com/conda/conda/pull/16495)
- [@kenodegard](https://github.com/kenodegard) in [conda-rattler-solver#95](https://github.com/conda/conda-rattler-solver/pull/95)
- [@matthewfeickert](https://github.com/matthewfeickert) in [grayskull#584](https://github.com/conda/grayskull/pull/584)
- [@mwtoews](https://github.com/mwtoews) in [conda#16455](https://github.com/conda/conda/pull/16455) and [conda-build#6060](https://github.com/conda/conda-build/pull/6060)
- [@paperbenni](https://github.com/paperbenni) in [conda#16635](https://github.com/conda/conda/pull/16635)
- [@Rehan30g](https://github.com/Rehan30g) in [grayskull#674](https://github.com/conda/grayskull/pull/674)
- [@ryanskeith](https://github.com/ryanskeith) in [conda-rattler-solver#137](https://github.com/conda/conda-rattler-solver/pull/137)
- [@travishathaway](https://github.com/travishathaway) in [conda-rattler-solver#154](https://github.com/conda/conda-rattler-solver/pull/154)
- [@wolfv](https://github.com/wolfv) in [grayskull#669](https://github.com/conda/grayskull/pull/669)
