---
title: July 2026 Releases
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
  - conda-self
description: |
  July releases of conda and conda-build are out—faster large-prefix installs, clearer errors, v1 recipe polish, and conda pypi index. 🎉
image: img/blog/2026-08-03-july-releases/banner.png
---

The July 2026 releases span **conda**, **conda-build**, **conda-libmamba-solver**, **conda-pypi**, **constructor**, **menuinst**, and **conda-self**! 🎉 You'll find them on the **main** and **conda-forge** channels.

For **conda**, large environments install much faster, everyday CLI paths are leaner, and errors come with actionable guidance. For **conda-build**, v1 recipes get more polish—including `conda-debug` support—and `conda develop` points toward a modern editable workflow via **conda-pypi**.

<!-- truncate -->

## conda [26.7.0](https://github.com/conda/conda/releases/tag/26.7.0)

**Faster on large prefixes.** Unlink/link ordering no longer does a quadratic scan (about **780×** faster on a 50,000-record synthetic prefix), `PrefixGraph` builds a per-name candidate index, package extraction can use a process pool so zstd work runs outside the GIL, and osx-arm64 batches `codesign` into one end-of-transaction call.

**Clearer errors when things go wrong.** `CondaError` can carry structured guidance—terminal hints plus a `guidance` field in `--json`—with starter coverage for common failures like `PackagesNotFoundError` and `UnsatisfiableError`. Plugins can append more via the new **`conda_error_hints`** hook.

**A leaner CLI path.** Shell activation commands skip plugin loading when the plugin manager is not already up (avoiding hundreds of imports on that hot path). Heavy imports are deferred in several modules; progress bars and spinners stay quiet when stdout is not a TTY (and respect `NO_COLOR` / `TERM=dumb`).

**Workflow and plugin polish.** `conda env create` is now an alias of `conda create` (with aligned dry-run output and safer behavior around existing prefixes). Plugin subcommands can declare aliases; `conda config --show-sources` can show plugin parameter values; solvers get a clearer `BaseSolver` base class; and `conda search` works with sharded repodata (while refusing `conda search *` so you do not pull every shard).

**Fixes worth knowing about.** URL-form channel specs in `MatchSpec` keep their identity instead of collapsing through `channel_alias`; failed creates clean up prefixes that did not exist beforehand; rolling back a failed install no longer deletes environment history; and several sharded-repodata / wheel-record edge cases are tightened.

Full changelog: [26.7.0 on GitHub](https://github.com/conda/conda/releases/tag/26.7.0)

## conda-build [26.7.0](https://github.com/conda/conda-build/releases/tag/26.7.0)

If you maintain recipes—especially **v1** (`recipe.yaml`)—this release is worth a look.

**v1 recipe momentum.** `conda-debug` supports v1 recipes, with additional UX improvements and user docs. Dependency sorting in `conda render` is stable instead of following `set()` order.

**Platform handling aligned with meta.yaml.** Accidental `{build,host}_platform` settings in `conda_build_config.yaml` are no longer valid for v1; use `CONDA_SUBDIR` / `target_platform` the same way you would for classic recipes. CMD subprocesses under emulation now match `build_platform` architecture.

**Deprecation to plan for.** `conda develop` is pending removal in **27.9**. Prefer editable installs via **[conda-pypi](https://conda.github.io/conda-pypi/)** (`conda pypi install --editable <path>`).

**Quality-of-life fixes.** Negative build numbers fail at metadata validation; duplicate rpaths on macOS are guarded; Jinja variables without spaces (e.g. `{{python_min}}`) are found correctly.

Full changelog: [26.7.0 on GitHub](https://github.com/conda/conda-build/releases/tag/26.7.0)

## conda-libmamba-solver [26.7.0](https://github.com/conda/conda-libmamba-solver/releases/tag/26.7.0)

- **Large-environment solves** cache installed state for the lifetime of a single solve. A 50,000-record prefix that previously timed out after 5+ minutes can complete in on the order of **~10 seconds** for install/update/remove-style operations.
- **Virtual-package constraints** such as `run_constrained` / `constrains` on `__cuda` are enforced correctly—the solver can no longer drop a virtual package to dodge the constraint.
- Suggests `conda self` when that plugin is installed.

Full changelog: [26.7.0](https://github.com/conda/conda-libmamba-solver/releases/tag/26.7.0)

## conda-pypi [0.11.0](https://github.com/conda/conda-pypi/releases/tag/0.11.0)

- New **`conda pypi index <dir>`** builds a conda channel from local wheel files—handy for offline or private wheel workflows.
- Direct `.whl` installs get correct `info/index.json` `fn` / `build` metadata (aligned with repodata v3), fixing lockfile restore mismatches.
- The conda-pypi beta tip is visible again at default verbosity.

Full changelog: [0.11.0](https://github.com/conda/conda-pypi/releases/tag/0.11.0)

## constructor [3.16.2](https://github.com/conda/constructor/releases/tag/3.16.2)/[3.16.3](https://github.com/conda/constructor/releases/tag/3.16.3)

July brought patch releases on the **3.16** line (the larger **3.16.0** features—experimental MSI, Docker installer types, and longer Windows path checks—landed late June).

- **`--installer-type`** builds a single installer type (`sh` / `pkg` / `exe` / `msi`) from the CLI.
- EXE path-length checks also account for the package-cache extraction path; temp-dir redirection sets `TEMP` / `TMPDIR` as well as `TMP`.
- AzureSignTool verification works when installer paths contain spaces.

Full changelogs: [3.16.2](https://github.com/conda/constructor/releases/tag/3.16.2), [3.16.3](https://github.com/conda/constructor/releases/tag/3.16.3)

## Other releases this month

- [**menuinst** 2.5.2](https://github.com/conda/menuinst/releases/tag/2.5.2) — escape white-space characters in Linux desktop files ([GHSA-fqh4-w37r-x339](https://github.com/conda/menuinst/security/advisories/GHSA-fqh4-w37r-x339)).
- [**conda-self** 0.2.1](https://github.com/conda/conda-self/releases/tag/0.2.1) — clearer frozen-base errors; keep `conda self update --json` parseable.
- [**conda-lockfiles** 0.2.1](https://github.com/conda/conda-lockfiles/releases/tag/0.2.1) — preserve conda-pypi wheel channel/checksum/subdir metadata in lock loads.
- [**conda-recipe-manager** v0.10.5](https://github.com/conda/conda-recipe-manager/releases/tag/v0.10.5) — binary-file detection and multiline-string fixes.

## We ❤️ our community

Thank you to everyone who landed changes across these releases. A special welcome to contributors who contributed for the first time:

- [@Adelagric](https://github.com/Adelagric) in [conda#16420](https://github.com/conda/conda/pull/16420)
- [@bdice](https://github.com/bdice) in [conda#16328](https://github.com/conda/conda/pull/16328)
- [@carterbox](https://github.com/carterbox) in [conda#16446](https://github.com/conda/conda/pull/16446) and [conda-libmamba-solver#962](https://github.com/conda/conda-libmamba-solver/pull/962)
- [@Functionhx](https://github.com/Functionhx) in [conda#16391](https://github.com/conda/conda/pull/16391)
- [@btraven00](https://github.com/btraven00) in [conda#16266](https://github.com/conda/conda/pull/16266)
- [@eeshsaxena](https://github.com/eeshsaxena) in [conda#16338](https://github.com/conda/conda/pull/16338)
- [@mgorny](https://github.com/mgorny) in [conda-build#6036](https://github.com/conda/conda-build/pull/6036)
- [@Nikil-D-Gr8](https://github.com/Nikil-D-Gr8) in [conda-build#6000](https://github.com/conda/conda-build/pull/6000)
- [@pb01ka](https://github.com/pb01ka) in [conda-build#5997](https://github.com/conda/conda-build/pull/5997)
- [@chrisburr](https://github.com/chrisburr) in [conda-recipe-manager#539](https://github.com/conda/conda-recipe-manager/pull/539)
