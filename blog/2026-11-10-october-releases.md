---
title: October 2026 Releases
slug: 2026-11-10-october-releases
authors: [kenodegard]
tags:
  - announcement
  - conda
  - conda-rattler-solver
  - conda-pycosat-solver
  - conda-libmamba-solver
  - rattler
description: |
  conda 26.10.0 makes Rattler the default solver, ships the classic solver as conda-pycosat-solver, and updates libmamba and py-rattler.
image: img/blog/2026-11-10-october-releases/banner.png
---

The October 2026 release cycle is here, headlined by **conda 26.10.0**, the special release that makes **Rattler** the default solver. The classic solver now ships as the separate **conda-pycosat-solver** plugin, **libmamba** remains available as an alternative, and the solver plugins and **py-rattler** received matching updates.

<!-- truncate -->

:::info Special Announcement

**Rattler is now the default solver.** With conda 26.10.0, fresh installations and upgrades that do not have an explicit solver setting use [conda-rattler-solver](https://github.com/conda/conda-rattler-solver). The previous default, libmamba, remains available, as does the classic solver through [conda-pycosat-solver](https://github.com/conda/conda-pycosat-solver). Existing `solver: classic` settings and `--solver=classic` commands keep working, and the plugin also accepts `--solver=pycosat`.

If you explicitly selected a solver, conda keeps that choice when you upgrade. To go back to libmamba:

```bash
conda config --set solver libmamba
```

To use libmamba for a single command instead:

```bash
conda install --solver=libmamba ...
```

See the [conda-rattler-solver documentation](https://conda.github.io/conda-rattler-solver/) and its [known limitations](https://conda.github.io/conda-rattler-solver/user-guide/known-limitations/) for what is different from the classic and libmamba solvers. Please report problems in the [conda-rattler-solver issue tracker](https://github.com/conda/conda-rattler-solver/issues/new/choose).

:::

## Changes in conda [26.10.0](https://github.com/conda/conda/releases/tag/26.10.0)

To update `conda` to the latest version, run:

```bash
conda install --name base conda=26.10.0
```

If you already have [conda-self](https://github.com/conda/conda-self) installed, you can use:

```bash
conda self update
```

- **The default solver is now Rattler.** The switch applies to fresh installations and to upgrades that do not have an explicit solver setting. libmamba and the classic solver remain available.
- `--disable-plugins` and `--enable-plugins` let you turn external plugins off and selectively re-enable the ones you need, including solver plugins needed for recovery.
- Dependency specs can request CEP 44 `extra_depends` groups, including in sharded repodata.
- Configuration writes are atomic when the directory permissions allow it, preserve macOS ACLs, and reject a write if the file changed in the meantime.
- `conda env remove` and `conda remove --all` ask once before deleting an environment, with the package plan and the prefix-deletion warning shown together.
- `conda config --get` no longer writes to the configuration file when no key is given.
- Remote requests that fail with HTTP 502 or 504 are retried.
- Conda now requires Python 3.11 or newer to run. It can still create and manage environments with Python 3.10 and older; this only affects the interpreter that runs conda.
- **The built-in classic solver is pending deprecation.** The `conda.plugins.solvers`, `conda.resolve`, `conda.common.logic`, and `conda.common._logic` modules will be removed in 27.9. Use `conda-pycosat-solver` instead. See the [full release notes](https://github.com/conda/conda/releases/tag/26.10.0) for other pending API deprecations.

Full changelog: [26.10.0](https://github.com/conda/conda/releases/tag/26.10.0)

## Changes in conda-rattler-solver [26.10.0](https://github.com/conda/conda-rattler-solver/releases/tag/26.10.0) / [26.10.1](https://github.com/conda/conda-rattler-solver/releases/tag/26.10.1) / [26.10.2](https://github.com/conda/conda-rattler-solver/releases/tag/26.10.2)

The 26.10 line is the first release of the Rattler solver as conda's default.

- Multichannel support: conda's `defaults`, conda-build's `local`, and condarc's `custom_multichannels` are passed to the solver as `rattler.MultiSource` groups. Members share a channel-priority tier, and a spec such as `defaults::python` can match any member.
- Updates avoid unnecessary build downgrades while still allowing the dependency downgrades needed to satisfy pins and package requirements. `conda update` also retries with looser dependency constraints when channel changes make the first solve unsatisfiable.
- Dependencies of explicitly requested extras are kept when pruning, and frozen installs keep compatible packages from the environment history.
- Handles pip-installed package records that do not have download URLs when pip interoperability is enabled.
- Requires `py-rattler >=0.28.1,<0.29.0a0` and conda 26.10 or newer.
- The solver documentation site is now available at [conda.github.io/conda-rattler-solver](https://conda.github.io/conda-rattler-solver/).

Full changelogs: [26.10.0](https://github.com/conda/conda-rattler-solver/releases/tag/26.10.0), [26.10.1](https://github.com/conda/conda-rattler-solver/releases/tag/26.10.1), [26.10.2](https://github.com/conda/conda-rattler-solver/releases/tag/26.10.2)

## Changes in conda-pycosat-solver [26.10.0](https://github.com/conda/conda-pycosat-solver/releases/tag/26.10.0)

The classic solver is now a separate plugin. `conda-pycosat-solver 26.10.0` is bundled with conda 26.10.0. Both `--solver=classic` and `--solver=pycosat` select it, and existing `solver: classic` configuration keeps working.

Full changelog: [26.10.0](https://github.com/conda/conda-pycosat-solver/releases/tag/26.10.0)

## Changes in conda-libmamba-solver [26.10.0](https://github.com/conda/conda-libmamba-solver/releases/tag/26.10.0) / [26.10.1](https://github.com/conda/conda-libmamba-solver/releases/tag/26.10.1)

libmamba is no longer the default solver, but it remains available for anyone who sets `solver: libmamba` or passes `--solver=libmamba`.

- `conda update --all` keeps Python within its current major and minor series, matching the classic solver.
- Solver errors now report all missing requested packages, not just the first one.
- Package timestamps already in milliseconds are no longer multiplied again, and package download URLs keep percent-encoded credentials and query parameters.
- 26.10.1 sorts solver jobs in Python instead of relying on libsolv's alphabetical ordering, which fixes a `track_features` priority bug that could select the wrong Python variant. It also avoids a repeated failing solve attempt and fixes a `CONDA_LIBMAMBA_SOLVER_MAX_ATTEMPTS` crash on empty environments.
- The solver now requires conda 26.7.1 or newer and `libmambapy` 2.3.2 or newer. Its recipe requires `certifi` and `ca-certificates` 2026.10.19 or newer for the refreshed CA bundles.

Full changelogs: [26.10.0](https://github.com/conda/conda-libmamba-solver/releases/tag/26.10.0), [26.10.1](https://github.com/conda/conda-libmamba-solver/releases/tag/26.10.1)

## Changes in py-rattler [0.28.0](https://github.com/conda/rattler/releases/tag/py-rattler-v0.28.0) / [0.28.1](https://github.com/conda/rattler/releases/tag/py-rattler-v0.28.1)

`py-rattler 0.28` is the version required by conda-rattler-solver 26.10. It includes security fixes for the bundled TLS stack, which stop trusting the compromised eMudhra/emSign intermediates, and 0.28.1 updates the `zip` crate used to read `.conda` archives.

- Build strings are now `BuildString` objects instead of plain strings. New values are validated against CEP 26, and comparisons such as `record.build == "py312_0"` now need an explicit `str(record.build)`.
- `exclude_newer` now applies to locked and pinned packages as well as channel records.
- Candidate versions are ranked once per package, cutting solve times by about 9% on average and up to 14% on the largest benchmark environments.
- Activation works again on macOS 12.2 and older, and macOS binaries re-signed after prefix replacement keep their code-signing identifier and requirements.

Full changelogs: [0.28.0](https://github.com/conda/rattler/releases/tag/py-rattler-v0.28.0), [0.28.1](https://github.com/conda/rattler/releases/tag/py-rattler-v0.28.1)

## We ❤️ our community

Thank you to everyone who contributed to these releases. Welcome to the first-time contributors to these projects:

- [@aditya0929](https://github.com/aditya0929) in [conda#16831](https://github.com/conda/conda/pull/16831)
- [@gavinw2143](https://github.com/gavinw2143) in [conda#16796](https://github.com/conda/conda/pull/16796)
- [@larsoner](https://github.com/larsoner) in [conda#16848](https://github.com/conda/conda/pull/16848) and [conda-libmamba-solver#1094](https://github.com/conda/conda-libmamba-solver/pull/1094)
- [@r3wretrhy](https://github.com/r3wretrhy) in [conda#16803](https://github.com/conda/conda/pull/16803)
- [@VINAYRAO0406](https://github.com/VINAYRAO0406) in [conda#16814](https://github.com/conda/conda/pull/16814)
- [@h-vetinari](https://github.com/h-vetinari) in [conda-rattler-solver#180](https://github.com/conda/conda-rattler-solver/pull/180)
- [@paperbenni](https://github.com/paperbenni) in [conda-libmamba-solver#1044](https://github.com/conda/conda-libmamba-solver/pull/1044)
