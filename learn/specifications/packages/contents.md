---
sidebar_position: 0
---
# Package contents

This document describes the contents of conda packages, regardless of how they are compressed and distributed.

## Specification

> Relative paths in this document MUST be interpreted as relative to the root directory of the package.

An extracted conda package is a directory that MUST at least include two files: `./info/index.json` and `./info/paths.json`. Other important metadata files SHOULD be included under `./info/`. Please refer to [The `info/` metadata directory](./info.md) for more details.

Additionally, the package directory MAY contain any number of files in any subdirectories.
Some locations MAY receive special handling by conda clients.

The `./conda-meta/` directory is reserved for conda environments and MUST NOT be populated by conda packages directly.

### Specially handled paths

#### The `./etc/conda/` directory

This special directory stores configuration files that can modify the behavior of the conda client at runtime. Packages are allowed to ship files under this directory.

The following files and directories MUST be handled by the conda client:

- `./etc/conda/env_vars.d/`: Directory containing JSON documents, each providing a dictionary that maps strings to strings, meant to be exported as environment variables on environment activation, and unset on deactivation.
- `./etc/conda/activate.d/`: Directory containing shell scripts, meant to be executed on environment activation.
- `./etc/conda/deactivate.d/`: Directory containing shell scripts, meant to be executed on environment deactivation.

Please refer to the [Installation section](../installation/) for more details.

#### The `./Menu/` directory

Please refer to [The `Menu/` directory](./menu.md).

#### Pre- and post-link/unlink scripts

The `./bin/` and `./Scripts/` directories usually contain executables populated by the packages themselves. For files named like `.{package-name}-{action}.{extension}`, where `{package-name}` corresponds to the package name and `{extension}` is either `sh` (Unix) or `bat` (Windows), there are four possible `{action}` values and associated behaviors:

- `pre-link`: The script MUST be executed before a package is installed / linked.
- `post-link`: The script MUST be executed after a package is installed / linked.
- `pre-unlink`: The script MUST be executed before a package is removed / unlinked.
- `post-unlink`: Deprecated. The script MAY be executed after a package is removed / unlinked.

These scripts should be avoided whenever possible. If they are indeed necessary, these rules apply:

- They MUST NOT write to stdout, but they MAY write to `$CONDA_PREFIX/.messages.txt`, whose contents SHOULD be reported after the conda client completes all actions.
- They MUST NOT touch anything other than the files being installed.
- They MUST NOT depend on any installed or to-be-installed conda packages.
- They SHOULD depend only on standard system tools. For example, `rm`, `cp`, `mv`, and `ln` on Unix machines. Or `del`, `ren`, `copy`, and `mklink` on Windows machines.

The following environment variables MUST be exposed to the script runtime:

- `ROOT_PREFIX`: Path to the `base` environment where the conda client is installed. Empty otherwise.
- `PREFIX`, `SOURCE_DIR`: Path to the target environment.
- `PKG_NAME`: Name of the package that owns the script.
- `PKG_VERSION`: Version of the package that owns the script.
- `PKG_BUILDNUM`: Build number of the package that owns the script.

The `PATH` environment variable MUST include the directory where the script is located as its first element.

Please refer to the [Installation section](../installation/) for more details.

## Recommendations for any other locations

### Unix

On Unix filesystems, packages should generally follow a subset of the `/usr` tree in the [Filesystem Hierarchy Standard (FHS)](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard):

- `./bin/`: executables and scripts.
- `./etc/`: configuration files.
- `./include/`: header files.
- `./lib/`: dynamic and static libraries, build system configuration files (`pkg-config`, `CMake`), modules for interpreted languages (Python, Perl, etc), and program-specific executables.
- `./share/`: miscellaneous data contents.

Other subdirectories like `./doc/`, `./man/`, `./var/`, or `./opt/` are also common.

On Linux, some sysroot packages may also populate a top-level directory named as a [target triplet](https://www.gnu.org/software/autoconf/manual/autoconf-2.65/html_node/Specifying-Target-Triplets.html) with a single subdirectory `sysroot/` populated with an FHS-like tree.

### Windows

On Windows, the directory structure is a bit different due to how Python is organized in this operating system. Essentially, it can be explained with two additional convention sets that may coexist with the Unix FHS structure:

- `./Library/`: uses the same directories as the Unix structure listed above. Most packages are installed to this directory.
  - MSYS2 or MinGW-w64 can be understood as sysroot packages that may also present FHS-structured contents under `./Library/usr/` or `./Library/mingw-w64/`, respectively. Additional variants like `./Library/ucrt64/`, `./Library/clang64/`, `./Library/mingw64/`, and `./Library/clangarm64/` may also be found. `./Library/<target-triplet>` is also common.
- Python interpreters and Python-related packages stay at the root level:
  - `./DLLs/`: Compiled Python extensions (`.pyd`).
  - `./include/`: Python development headers (`.h`).
  - `./Lib/`: Equivalent to `./lib/pythonX.Y` on Unix.
  - `./libs/`: Python `.lib` files.
  - `./Scripts/`: Python entry points (`.exe` trampolines and the corresponding `-script.py` files).
  - `./Tools/`: Historically used by miscellaneous scripts shipped with the Python interpreter. Not recommended.
  - `./python*.(exe|dll|pdb)`: The Python interpreter executables and libraries.

Note that other interpreted languages have historically populated the root level directly, especially if they relied on `noarch: generic` packages:

- Node.js has historically placed its executables at the root level, and left everything else under `./node_modules/`. This is not recommended and should use `.[/Library]/bin/` and `.[/Library]/lib/node_modules/` instead.
- R installs to `./lib/R/` using a Unix-style directory structure, but historically has also placed some executables in `./Scripts/` (reserved for Python entry points).
- Ruby places its files directly at the root level, using a Unix-style directory structure to benefit from `noarch` builds.

## History

- 2026-03-04: [CEP 34](/learn/ceps/cep-0034) standardizes the content structure of conda packages.
