---
sidebar_position: 10
---

# Environment lifecycle

This document describes how to create and manage conda environments from conda packages.

## Specification

### Creating a conda environment

An empty directory `$CONDA_PREFIX` can be turned into a conda environment by creating an empty `conda-meta/history` file. The conda client MAY register this location into a central registry of environments, such as `~/.conda/environments.txt`.

The command used to create that environment MAY be recorded in `conda-meta/history`, along with the version, timestamp and details of the transaction.

### Installing packages

For each package to be installed, conda clients:

1. SHOULD download or copy the artifact to the cache location using the "filenames" syntax described in [CEP 26](../../ceps/cep-0026.md).
2. SHOULD, if available, verify the integrity of the artifact with its checksum (`sha256` is preferred over `md5`).
3. MUST extract and aggregate the artifact to a central location. The extracted directory SHOULD be named as a distribution string (without subdir), as described in [CEP 26](../../ceps/cep-0026.md).
4. SHOULD write an `./info/repodata_record.json` file in the extracted directory, whose contents MUST be populated with one of:
   - The `RepodataRecord` information available in the lockfile, if relevant.
   - The `RepodataRecord` information available in the repodata source, if relevant.
   - The contents of `./info/index.json`, as a fallback.

Once extracted, the packages MUST be installed in the target prefix `$CONDA_PREFIX` by following these steps:

1. Execute the relevant `pre-link` scripts.
2. Link or copy the non-`info/` contents of the package into `$CONDA_PREFIX`. Tools SHOULD follow the manifest file at `info/paths.json`. This means that:
   - For non-`noarch: python` packages, place the contents of the artifact into `$CONDA_PREFIX`.
     - If the file contains a prefix placeholder, replace it with the value of `$CONDA_PREFIX` and copy the file.
     - Otherwise, place the file in `$CONDA_PREFIX`, as instructed by the `paths.json` metadata. Tools MAY offer settings to override this operation (e.g. prefer copies to hardlinks).
   - `noarch: python` packages follow some extra rules. In particular, they no longer follow a 1:1 correspondence between the path in the artifact and the linked path in `$CONDA_PREFIX`. The target path depends on variables like the Python version, OS and Python ABI modes. Details are discussed in [CEP 17](../../ceps/cep-0017.md) and [CEP 20](../../ceps/cep-0020.md).
3. Handle the [`./Menu/*.json` documents](./menu.md).
4. Execute the relevant `post-link` scripts.
5. Record the package metadata at `$CONDA_PREFIX/conda-meta/{name}-{version}-{build}.json`, as described in [Installed package records](./environments.md#installed-package-records).

While linking paths into their targets, the conda client MAY run into clobbering conflicts (two or more packages wanting to write to the same path). Tools SHOULD at least warn the user about the conflicts and provide ways to handle the situation.

Pre- and post-link/unlink scripts MUST follow the [script runtime requirements](../packages/contents.md#pre--and-post-linkunlink-scripts). Execution SHOULD be performed in topological order.

### Removing a package

Removing a package from the environment SHOULD follow these instructions:

1. MUST execute the relevant `pre-unlink` scripts.
2. Remove all the files recorded in its `conda-meta/*.json` file (under `paths_data`).
3. Handle the [`./Menu/*.json` documents](./menu.md).
4. MAY execute deprecated `post-unlink` scripts.
5. Remove its `conda-meta/*.json` record.
6. If there were clobbering conflicts, restore the relevant path from the clobbered sources.

### Removing an environment

Once an environment contains no packages, the conda client MAY remove it. This process involves clearing the `conda-meta/` folder and any `condarc` files, and deregistering the environment path from the central manifest, if applicable (e.g. `~/.conda/environments.txt`). If there were any additional files in the environment directory, the conda client SHOULD report that to the user and offer to leave them in place or to proceed and clear all the contents.

### Activating and deactivating an environment

Environment management tools SHOULD implement a mechanism to _activate_ an environment. They MAY also implement logic to _deactivate_ it.

Given a target environment located at `$CONDA_PREFIX`, the activation logic MUST involve the following tasks:

- Temporarily modifying the `PATH` environment variable to include directories that usually contain executables, as discussed in [CEP 34](../../ceps/cep-0034.md):
  - On Unix systems, it MUST include `$CONDA_PREFIX/bin`.
  - On Windows systems, it MUST include (in this order):
    - `$CONDA_PREFIX`.
    - The first directory that exists in this list, if any:`$CONDA_PREFIX/Library/ucrt64/bin`, `$CONDA_PREFIX/Library/clang64/bin`, `$CONDA_PREFIX/Library/mingw64/bin`, `$CONDA_PREFIX/Library/clangarm64/bin`.
    - `$CONDA_PREFIX/Library/mingw-w64/bin`.
    - `$CONDA_PREFIX/Library/usr/bin`.
    - `$CONDA_PREFIX/Library/bin`.
    - `$CONDA_PREFIX/Scripts`.
    - `$CONDA_PREFIX/bin`.
- Handling the environment variables and scripts in `$CONDA_PREFIX/etc/conda/`, as described below.

For deactivation, the effects of the actions above MUST be reverted.

The following files and directories MUST be handled by the conda client:

- `$CONDA_PREFIX/etc/conda/env_vars.d/`: Directory containing JSON documents, each providing a dictionary that maps strings to strings, which are understood as environment variables. The JSON documents SHOULD be loaded alphabetically, with later documents overriding earlier ones. These environment variables SHOULD be exported on environment activation, and unset on deactivation. When both `env_vars.d/` and [`conda-meta/state`](./environments.md#conda-metastate) are present, the latter is loaded last and can override the previously defined variables.
- `$CONDA_PREFIX/etc/conda/activate.d/`: Directory containing shell scripts. They SHOULD be executed on environment activation, in alphabetical order.
- `$CONDA_PREFIX/etc/conda/deactivate.d/`: Directory containing shell scripts. They SHOULD be executed on environment deactivation, in reverse alphabetical order.

Alphabetical order MUST be understood as the ascending lexicographical order provided by Unicode Code Point comparisons, just like Python would sort such a list.

## History

- 2026-06-11: [CEP 34](/learn/ceps/cep-0034) made `pre-link`, `post-link`, and `pre-unlink` script execution mandatory.
- 2026-03-04: [CEP 32](/learn/ceps/cep-0032) standardized environment lifecycle.
