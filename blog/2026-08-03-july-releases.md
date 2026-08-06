---
title: June and July 2026 Releases
slug: 2026-08-03-july-releases
authors: [kenodegard]
tags:
  - announcement
  - conda
  - conda-build
  - conda-libmamba-solver
  - conda-pypi
  - constructor
  - menuinst
  - rattler
description: |
  June and July releases across the conda org: conda and conda-build 26.7.0, constructor 3.16, libmamba and conda-pypi updates, faster solves in rattler, and more. 🎉
image: img/blog/2026-08-03-july-releases/banner.png
---

The June and July 2026 releases included updates to conda, conda-build, conda-libmamba-solver, conda-pypi, constructor, menuinst, rattler, and more! 🎉 All of these have been released to both `defaults` and `conda-forge` channels.

<!-- truncate -->

## Changes in conda [26.7.0](https://github.com/conda/conda/releases/tag/26.7.0)

To update `conda` to the latest version, run:

```bash
conda install --name base conda=26.7.0
```

- Large-prefix transaction work: unlink/link ordering no longer does a quadratic scan (about **780×** faster for that step alone on a 50,000-record synthetic prefix), `PrefixGraph` builds a per-name candidate index, package extraction can use a process pool so zstd work runs outside the GIL, and osx-arm64 batches `codesign` into one end-of-transaction call.
- Error guidance scaffolding: `CondaError` can carry structured guidance (terminal hints plus a `guidance` field in `--json`), with a **`conda_error_hints`** plugin hook and light starter coverage for a few common errors. This is foundation work for richer hints over time, not a wholesale change to how failures look today.
- Leaner CLI path: shell activation skips plugin loading when the plugin manager is not already up; heavy imports are deferred in several modules; progress bars and spinners stay quiet when stdout is not a TTY (and respect `NO_COLOR` / `TERM=dumb`).
- `conda env create` is now an alias of `conda create` (aligned dry-run output; safer behavior around existing prefixes).
- Plugin subcommand aliases; `conda config --show-sources` can show plugin parameter values; `BaseSolver` base class for solver plugins; `conda search` works with sharded repodata (while refusing `conda search *`).
- Fixes include URL-form `MatchSpec` channel identity, cleanup of failed creates, preserving environment history on rollback, and several sharded-repodata / wheel-record edge cases.

Full changelog: [26.7.0](https://github.com/conda/conda/releases/tag/26.7.0)

## Changes in rattler and py-rattler [0.24.0](https://github.com/conda/rattler/releases/tag/py-rattler-v0.24.0) / [0.25.0](https://github.com/conda/rattler/releases/tag/py-rattler-v0.25.0)

```bash
conda install py-rattler=0.25.0
```

- Faster solves: rattler moved to [resolvo](https://github.com/prefix-dev/resolvo) 0.11.1, which cuts the larger solve benchmarks by roughly **40%** (quetz 413 ms → 242 ms, tensorflow 283 ms → 175 ms). Every tool built on rattler gets that without changing a line. Matchspec and version parsing are faster too, which you notice when loading repodata.
- conda packages for iOS and Android: new `ios-*`, `iossimulator-*` and `android-*` subdirs, with the minimum OS version carried as an `__ios` or `__android` virtual package. Compatibility then falls out of the solver the way `__glibc` and `__osx` already do. The subdirs and virtual packages are going through [a draft CEP](https://github.com/conda/ceps/pull/183).
- Channel behavior: the gateway follows [CEP 42](https://conda.org/learn/ceps/cep-0042/) channel relations, so a channel like bioconda can name conda-forge as its base and asking for `bioconda` alone is enough. rattler also implements conda's **`flexible`** channel priority.
- Working offline: an offline mode keeps the whole stack off the network, and a solve can be restricted to a set of candidates the caller supplies. Build that set from the package cache and a solve that succeeds will install without downloading anything.
- Authentication and CLI: reading a private prefix.dev channel from CI now authenticates itself off a `WWW-Authenticate` challenge, with no per-channel configuration, and OAuth defaults to the device-code flow. New commands: `rattler exec`, `solve`, and `inject-into-prefix` / `remove-from-prefix`.
- **py-rattler 0.24.0** brings lockfile v7 (breaking), CEP 42 channel relations, repodata revisions, `__cuda_arch`, and extras, conditionals and `flags` out of experimental. It also fixes two security advisories ([GHSA-h672-p7h7-97v9](https://github.com/conda/rattler/security/advisories/GHSA-h672-p7h7-97v9), [CVE-2026-47425](https://github.com/conda/rattler/security/advisories/GHSA-q53q-5r4j-5729)), so it is worth updating for those alone. **0.25.0** reworks the `repodata_revisions` API (breaking) and stops the metadata parsers raising when a component is simply absent.

Full changelogs: [py-rattler 0.24.0](https://github.com/conda/rattler/releases/tag/py-rattler-v0.24.0), [0.25.0](https://github.com/conda/rattler/releases/tag/py-rattler-v0.25.0), and the [rattler releases](https://github.com/conda/rattler/releases) for the individual crates.

## Changes in conda-build [26.7.0](https://github.com/conda/conda-build/releases/tag/26.7.0)

```bash
conda install --name base conda-build=26.7.0
```

- `conda-debug` supports v1 (`recipe.yaml`) recipes, with additional UX improvements and user docs; `conda render` sorts dependencies stably.
- v1 build/host platform handling aligned with `meta.yaml` (no accidental `{build,host}_platform` in `conda_build_config.yaml`; use `CONDA_SUBDIR` / `target_platform`).
- `conda develop` is pending removal in **27.9**; prefer editable installs via **[conda-pypi](https://conda.github.io/conda-pypi/)** (`conda pypi install --editable <path>`).
- Negative build numbers fail at metadata validation; duplicate rpaths on macOS are guarded; Jinja variables without spaces (e.g. `{{python_min}}`) are found correctly.

Full changelog: [26.7.0](https://github.com/conda/conda-build/releases/tag/26.7.0)

## Changes in conda-libmamba-solver [26.6.0](https://github.com/conda/conda-libmamba-solver/releases/tag/26.6.0) / [26.7.0](https://github.com/conda/conda-libmamba-solver/releases/tag/26.7.0)

```bash
conda install --name base conda-libmamba-solver=26.7.0
```

**26.6.0:**

- Sharded-repodata subset building moves into **conda** (via `build_repodata_subset`); requires **conda >=26.5**.
- Removes `plugins.use_sharded_repodata` / `CONDA_PLUGINS_USE_SHARDED_REPODATA` in favor of conda's `repodata_use_shards`.
- `conda update` no longer allows package downgrades; drops direct `requests` / `zstandard` dependencies.

**26.7.0:**

- Large-environment solves cache installed state for the lifetime of a single solve (a 50,000-record prefix that previously timed out after 5+ minutes can complete in on the order of **~10 seconds** for install/update/remove-style operations).
- Virtual-package constraints such as `constrains` on `__cuda` are enforced correctly.
- Suggests updating conda with `conda self` when that plugin is installed.

Full changelogs: [26.6.0](https://github.com/conda/conda-libmamba-solver/releases/tag/26.6.0), [26.7.0](https://github.com/conda/conda-libmamba-solver/releases/tag/26.7.0)

## Changes in conda-pypi [0.10.0](https://github.com/conda/conda-pypi/releases/tag/0.10.0) / [0.10.1](https://github.com/conda/conda-pypi/releases/tag/0.10.1) / [0.11.0](https://github.com/conda/conda-pypi/releases/tag/0.11.0)

```bash
conda install --name base conda-pypi=0.11.0
```

**0.10.0:**

- Richer `info/about.json` when converting PyPI projects; **`external-packages`** health check for `conda doctor` (with `--fix` to reinstall eligible packages from conda channels).
- `--dry-run` / `--yes` / repeated `--editable` for editable installs; shorter conda-pypi beta tip (and a setting to toggle the pip warning).

**0.10.1:**

- Docs landing page focused on `conda install` workflows.
- Removes the `conda-pypi-post-install-create` post-install plugin.

**0.11.0:**

- `conda pypi index <dir>` builds a conda channel from local wheel files.
- Direct `.whl` installs get correct `info/index.json` `fn` / `build` metadata (aligned with repodata v3), fixing lockfile restore mismatches.
- The conda-pypi beta tip is visible again at default verbosity.

Full changelogs: [0.10.0](https://github.com/conda/conda-pypi/releases/tag/0.10.0), [0.10.1](https://github.com/conda/conda-pypi/releases/tag/0.10.1), [0.11.0](https://github.com/conda/conda-pypi/releases/tag/0.11.0)

## Changes in constructor [3.16.0](https://github.com/conda/constructor/releases/tag/3.16.0) / [3.16.1](https://github.com/conda/constructor/releases/tag/3.16.1) / [3.16.2](https://github.com/conda/constructor/releases/tag/3.16.2) / [3.16.3](https://github.com/conda/constructor/releases/tag/3.16.3)

```bash
conda install constructor=3.16.3
```

**3.16.0:**

- Experimental **Windows MSI** installers (via BeeWare Briefcase).
- **`installer_type: docker`** (Dockerfile + staged `.sh`) and **`docker_image_format: tar`** for portable images (Buildx).
- **`constructor --render`** to render `construct.yaml`.
- EXE: Windows path-length check before install, clearer package-cache cleanup on uninstall, and temp dirs under `$INSTDIR` to avoid Defender issues with conda-standalone.
- Shell installers skip creating `~/.conda` when `register_envs` is false.

**3.16.1:**

- Include Briefcase batch templates so MSI builds work from an installed constructor.

**3.16.2:**

- `--installer-type` CLI option.
- EXE path-length check also accounts for the package-cache extraction path.
- AzureSignTool verification works when installer paths contain spaces.

**3.16.3:**

- Set `TEMP` / `TMPDIR` as well as `TMP` when redirecting temp dirs inside `$INSTDIR`.

Full changelogs: [3.16.0](https://github.com/conda/constructor/releases/tag/3.16.0), [3.16.1](https://github.com/conda/constructor/releases/tag/3.16.1), [3.16.2](https://github.com/conda/constructor/releases/tag/3.16.2), [3.16.3](https://github.com/conda/constructor/releases/tag/3.16.3)

## Changes in menuinst [2.5.0](https://github.com/conda/menuinst/releases/tag/2.5.0) / [2.5.1](https://github.com/conda/menuinst/releases/tag/2.5.1) / [2.5.2](https://github.com/conda/menuinst/releases/tag/2.5.2)

```bash
conda install menuinst=2.5.2
```

**2.5.0:**

- Windows fixes for registry quoting, activation scripts with spaces in the path, and `.nonadmin` handling under `@elevate_as_needed`.
- Skip malformed menu JSON with a warning; drop Python 3.9.

**2.5.1:**

- Handle permission errors when writing `menuinst.toml` in read-only environments.

**2.5.2:**

- Escape white-space characters in Linux desktop files ([GHSA-fqh4-w37r-x339](https://github.com/conda/menuinst/security/advisories/GHSA-fqh4-w37r-x339)).

Full changelogs: [2.5.0](https://github.com/conda/menuinst/releases/tag/2.5.0), [2.5.1](https://github.com/conda/menuinst/releases/tag/2.5.1), [2.5.2](https://github.com/conda/menuinst/releases/tag/2.5.2)

## Other releases

A few more projects shipped without a deep dive here:

- [**conda-standalone** 26.5.2](https://github.com/conda/conda-standalone/releases/tag/26.5.2)
- [**conda-index** 0.12.0](https://github.com/conda/conda-index/releases/tag/0.12.0) / [0.12.1](https://github.com/conda/conda-index/releases/tag/0.12.1)
- [**conda-package-handling** 2.5.0](https://github.com/conda/conda-package-handling/releases/tag/2.5.0)
- [**conda-package-streaming** v0.13.0](https://github.com/conda/conda-package-streaming/releases/tag/v0.13.0)
- [**conda-pack** 0.9.2](https://github.com/conda/conda-pack/releases/tag/0.9.2)

## We ❤️ our community

Thank you to everyone who landed changes across these releases. A special welcome to contributors who contributed for the first time:

- [@Adelagric](https://github.com/Adelagric) in [conda#16420](https://github.com/conda/conda/pull/16420)
- [@agriyakhetarpal](https://github.com/agriyakhetarpal) in [rattler#2311](https://github.com/conda/rattler/pull/2311)
- [@Ashish-Kumar-Dash](https://github.com/Ashish-Kumar-Dash) in [rattler#2610](https://github.com/conda/rattler/pull/2610)
- [@bdice](https://github.com/bdice) in [conda#16328](https://github.com/conda/conda/pull/16328)
- [@bltavares](https://github.com/bltavares) in [rattler#2533](https://github.com/conda/rattler/pull/2533)
- [@carterbox](https://github.com/carterbox) in [conda#16446](https://github.com/conda/conda/pull/16446) and [conda-libmamba-solver#962](https://github.com/conda/conda-libmamba-solver/pull/962)
- [@colobas](https://github.com/colobas) in [rattler#2548](https://github.com/conda/rattler/pull/2548)
- [@doraem-on](https://github.com/doraem-on) in [rattler#2488](https://github.com/conda/rattler/pull/2488)
- [@Functionhx](https://github.com/Functionhx) in [conda#16391](https://github.com/conda/conda/pull/16391)
- [@btraven00](https://github.com/btraven00) in [conda#16266](https://github.com/conda/conda/pull/16266)
- [@eeshsaxena](https://github.com/eeshsaxena) in [conda#16338](https://github.com/conda/conda/pull/16338)
- [@flferretti](https://github.com/flferretti) in [rattler#2614](https://github.com/conda/rattler/pull/2614)
- [@jirib](https://github.com/jirib) in [rattler#2524](https://github.com/conda/rattler/pull/2524)
- [@jlmoraleshellin](https://github.com/jlmoraleshellin) in [rattler#2474](https://github.com/conda/rattler/pull/2474)
- [@mgorny](https://github.com/mgorny) in [conda-build#6036](https://github.com/conda/conda-build/pull/6036)
- [@nehaljwani](https://github.com/nehaljwani) in [rattler#2475](https://github.com/conda/rattler/pull/2475)
- [@Nikil-D-Gr8](https://github.com/Nikil-D-Gr8) in [conda-build#6000](https://github.com/conda/conda-build/pull/6000)
- [@olantwin](https://github.com/olantwin) in [rattler#2594](https://github.com/conda/rattler/pull/2594)
- [@pb01ka](https://github.com/pb01ka) in [conda-build#5997](https://github.com/conda/conda-build/pull/5997)
- [@pya](https://github.com/pya) in [conda-pypi#368](https://github.com/conda/conda-pypi/pull/368)
- [@russkel](https://github.com/russkel) in [rattler#2553](https://github.com/conda/rattler/pull/2553)
- [@ytausch](https://github.com/ytausch) in [rattler#2595](https://github.com/conda/rattler/pull/2595)
