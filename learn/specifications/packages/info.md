---
sidebar_position: 10
---

# The `info/` metadata directory

This special directory contains all the metadata necessary to provide a functional conda package.

Build tools MUST NOT allow arbitrary files in this directory.

## Specification

> Relative paths in this document MUST be interpreted as relative to the root directory of the package.

### `./info/index.json`

Required.

This file contains essential metadata about the package, such as its name, version or dependencies. The contents of this file MAY be used to populate the `repodata.json` files.

This file MUST conform to the following schema:

- `schema_version: int`. A non-negative integer representing the version of the `index.json` format. This CEP specifies version 2. If absent, it MUST be understood as `1`; in other words, prior to this CEP and hence non-standardized.
- `name: str`. Lowercased name of the package. It MUST comply with [CEP 26](/learn/ceps/cep-0026).
- `version: str`. Normalized package version. It MUST comply with [CEP 33](/learn/ceps/cep-0033).
- `build: str`. A string that helps disambiguate different variant builds of the same package version. It MUST comply with [CEP 26](/learn/ceps/cep-0026). It SHOULD contain the `build_number` field, usually at the end of the string, preceded by an underscore `_`. It MAY contain the hexadecimal string of the SHA1-hash of the key-sorted dictionary provided in `./info/hash_input.json`, preceded by `h`, usually trimmed to the first seven characters.
- `build_number: int`. A non-negative integer representing the build number of the package.
- `depends: list[str]`. Dependencies the package requires at runtime. Each string MUST be a valid `MatchSpec` positional string, as defined in [CEP 29](/learn/ceps/cep-0029).
- `constrains: list[str]`. Dependencies the package is compatible with at runtime. These dependencies are not required, but if present, they MUST match the specifier. Each string MUST be a valid `MatchSpec` positional string, as defined in [CEP 29](/learn/ceps/cep-0029).
- `subdir: str`. The target platform for this package, or `noarch` if platform-agnostic. It MUST comply with [CEP 26](/learn/ceps/cep-0026).
- `noarch: Literal['generic', 'python']`. Optional. When `subdir` is `noarch`, this field indicates the type of `noarch` package. It MUST be one of: `generic`, `python`.
- `timestamp: int`. Starting time of the package build. It MUST be expressed as [Unix time](https://en.wikipedia.org/wiki/Unix_time) in milliseconds.
- `track_features: str`. Space-separated or comma-separated string of unique identifiers. Each identifier SHOULD match the `[A-Za-z0-9\-_.]+` regex.
- `python_site_packages_path: str`. Site-packages path, as introduced in [CEP 20](/learn/ceps/cep-0020).

Additional keys MAY be present. The following ones are well-known but deprecated or non-standard:

- `arch: str`. The architecture the package is built for, as returned by Python's `platform.machine()`, or empty in the case of `subdir == 'noarch'`.
- `platform: str`. The OS the package is built for. This is the first component of `subdir`, or empty in the case of `noarch`.
- `features: str`. Space-separated string of identifiers of properties unique to this build.
- `app: dict[str, Any]`. Metadata for Anaconda Navigator.
- `preferred_env: str`. Unknown purpose.
- `provides_features: dict[str, str]`. Unknown purpose.
- `requires_features: dict[str, str]`. Unknown purpose.

### `./info/paths.json`

Required.

This file MUST list the contents of the package as a list of _path entries_, as described below. It MUST NOT list the contents of the `./info/` folder.

The `./info/paths.json` file MUST be JSON parsable into a dictionary that complies with the following schema:

- `paths_version: int`. Required. The schema version of this file.
- `paths: list[dict[str, Any]]`. Required. A list of the _path entries_ representing the non-`info/` files shipped by the package.

Each _path entry_ MUST be a dictionary that complies with the following schema:

- `_path: str`. Required. The path of the file, relative to the root of the package. It MUST use `/` as a path separator, even on Windows.
- `path_type: Literal['hardlink', 'softlink', 'directory']`. Optional, defaults to `hardlink`. Type of path entry.
- `file_mode: Literal['binary', 'text']`. Optional, defaults to `text`. How to handle the file for prefix replacement.
- `prefix_placeholder: str`. Optional, defaults to an empty string. This is the placeholder string that MAY be replaced at install time with the target location. It MUST use `/` as a path separator, even on Windows.
- `no_link: bool`. Optional, defaults to `false`. Whether to link the file from the cache or force a copy.
- `sha256: str`. Required. The hexadecimal string of SHA256 hash of the file contents. It MUST be a 64 character string containing only characters in the `[a-z0-9]` range. If the path is a softlink, the contents of the target file are hashed.
- `size_in_bytes: int`. Required. The size of the file, in bytes. If the path is a softlink, the size of the target file is reported.

`./info/paths.json` supersedes `./info/files`, `./info/has_prefix`, and `./info/no_link`. If both are present, `./info/paths.json` MUST take precedence.

### `./info/hash_input.json`

Optional.

A free-form dictionary that maps `str` keys to `str` values. The dictionary MAY be empty.

Its contents MAY be used to generate a hash string that uniquely identifies the package.

### `./info/run_exports.json`

Optional.

This JSON document MUST be either a list of `MatchSpec` strings, or a dictionary that maps string keys (`weak`, `strong`, `weak_constrains`, `strong_constrains`, `noarch`) to a list of `MatchSpec` strings. When provided as a `list[str]`, it MUST be considered equivalent to `{"weak": list[str]}`.

In its dictionary form, the field `schema_version` MUST be present and map to a positive integer when its value is `2` or greater. In its absence, this value is assumed to be `1`.

### `./info/about.json`

Optional.

A dictionary that maps `str` keys to arbitrary values.

The contents of this file usually include the `about` section of the originating recipe for the package, plus metadata about the context of the build process. The following keys SHOULD be included and, if present, they MUST conform to the proposed schema:

- `channels: list[str]`. Conda channels used to solve the build and test environments.
- `description: str`. A longer form description of the package.
- `dev_url: str`. URL pointing to the development website (often a repository) of the package.
- `doc_url: str`. URL pointing to the documentation website of the package.
- `env_vars: dict[str, str]`. Allow-listed environment variables set during the package build.
- `extra: dict[str, Any]`. A free-form dictionary of arbitrary metadata. This MAY be used to record provenance metadata as described in [CEP 31](/learn/ceps/cep-0031).
- `home: str`. URL pointing to the homepage of the package.
- `license: str`. SPDX license identifier for the package.
- `summary: str`. A short summary of the package (usually one sentence).

These keys are commonly found, but are now considered deprecated:

- `license_file: str | list[str]`. Paths to the license files, relative to the `recipe/` directory.
- `license_family: str`. Use `license` instead.
- `tags: list[str]`. Unknown purpose.
- `identifiers: list[str]`. Unknown purpose.
- `keywords: list[str]`. Unknown purpose.

Additional keys MAY be allowed. Some examples include vendor information such as the conda-build and conda versions used at build time, along with the packages present in the conda `base` environment (`conda_build_version`, `conda_version`, `root_pkgs`, respectively).

### `./info/link.json`

Optional.

A dictionary containing important metadata for installation (linking) operations. Its contents MUST conform to the following schema:

- `package_metadata_version: int`. Version of this file. The only known value is `1`.
- `noarch: dict[str, Any]`. A dictionary describing the `noarch` configuration of the package. Its keys MUST conform to:
  - `type: Literal["generic", "python"]`. Type of `noarch` package.
  - `entry_points: list[str]`. If `type == "python"`, this key MUST list the console entry points of the Python package, as a list of strings with syntax `{executable-name}={dotted-import-path}:{function-name}` (for example `bsdiff4 = bsdiff4.cli:main_bsdiff4`).

These keys are commonly found, but are now considered deprecated:

- `preferred_env: dict[str, str]`. It MUST have two keys: `name: str` (name of the preferred environment) and `executable_paths: list[str]` (list of preferred executable paths in that environment).

### `./info/licenses/`

Optional.

Directory containing all the license files that apply to the distributed code and resources.

It MAY be empty or absent if the recipe doesn't ship any installable files.

### `./info/recipe/`

Optional.

Directory containing the recipe used to build the package. It SHOULD contain the original and rendered versions of the recipe file, along with the files necessary to run the build again.

It SHOULD contain a file specifying the licensing details of the recipe itself.

### `./info/test/`

Optional.

Directory containing the scripts and files needed to test the package.

### `./info/git`

Optional.

If the package sources come from a `git` repository and the `git` executable is available, this file will include information about the status of the cloned repository. Namely, the output of:

- `git log -n1`
- `git describe --tags`
- `git status`

### `./info/files`

Deprecated.

Lists all files that are part of the package itself, one per line. All of these files need to get linked into the environment. Any files in the package that are not listed in this file are not linked when the package is installed. The directory delimiter for the files in `info/files` MUST always be `/`, even on Windows. This matches the directory delimiter used in the tarball.

### `./info/has_prefix`

Deprecated.

Lists all files that contain a hard-coded build prefix or placeholder prefix, which needs to be replaced by the install prefix at installation time.

Each line of this file should be either a path, in which case it is considered a text file with the default placeholder `/opt/anaconda1anaconda2anaconda3`, or a space-separated list of `placeholder`, `mode`, and `path`, where:

- Placeholder is the path of the build prefix which needs to be replaced at install time.
- Mode is either `text` or `binary`.
- Path is the relative path of the file to be updated.

### `./info/no_link`

Deprecated. Optional.

Lists all files that cannot be linked into environments and MUST be copied instead.

### `./info/repodata_record.json`

This file MAY be written at extraction time by conda client tools. It MUST NOT be present in the distributed artifacts.

## History

- 2026-03-04: The `info/` metadata directory is standardized by [CEP 33](/learn/ceps/cep-0033).
