---
sidebar_position: 20
---

# Lockfiles

This document describes lockfiles in the conda ecosystem. Several formats are available:

- `@EXPLICIT` text input files can be used as minimal, conda-only lockfiles for one environment and platform at a time.
- `conda-lock.yml`, introduced by `conda-lock`, can handle more than one environment and platform, as well as PyPI dependencies.
- `pixi.lock`, introduced by `pixi`, is not yet standardized at the CEP level. Some documentation can be found in the [Pixi docs site](https://pixi.prefix.dev/latest/workspace/lock_file/#lock-file-satisfiability) and the [`rattler_lock` docs site](https://docs.rs/rattler_lock/latest/rattler_lock/index.html).

## `@EXPLICIT` text input files

Please refer to [Text spec input files](./text-spec.md).

## `conda-lock.yml` lockfiles

`conda-lock.yml` files are YAML documents with three top-level fields: `version`, `metadata` and `package`. The `metadata` section contains provenance information, while `package` enumerates the lockfile information as a list of packages and their details.

A `conda-lock.yml` file name SHOULD contain the term `conda-lock` and MUST end in `.yml` or `.yaml`.

The `package` list enumerates two types of packages via the `manager` field: `conda` and `pip`. Packages labeled with `manager == "conda"` SHOULD be installed first. For a lockfile to contain packages labeled with `manager == "pip"`, a Python interpreter SHOULD be provided by the conda packages.

### Schema

#### Top-level `version`

Optional, defaults to `1`.

A positive integer that describes the version of the schema. The only currently admitted value is `1`.

#### `metadata`

Required.

A dictionary that describes provenance and reproducibility metadata for the lockfile. It MUST only include the following keys, mapping to the values specified below. Additional keys MUST NOT be present.

##### `content_hash`

`dict[str, str]`, required.

This dictionary MUST map each key present in `platforms` to a SHA256 hash, as a lowercased hexadecimal string. The hash MUST be computed from the packages present in that target platform.

##### `channels`

`list[Channel]`, required.

This list collects all the conda channels used to generate the lockfile.

Each `Channel` item MUST be a dictionary with the following keys:

- `url` MUST map to a non-empty `str` that describes the source URL of the given channel.
- `used_env_vars` MUST map to a `list[str]` that describes which environment variables are necessary to access the channel URL, if any.

##### `platforms`

`list[str]`, required.

This list collects all the target platforms supported by the lockfile. Each target platform MUST conform to a [`subdir` string](../channels/channel-identifiers.md), excluding `noarch`.

##### `sources`

`list[str]`, required.

A list of paths to source files used to generate the lockfile. These paths MUST be relative to the location of the lockfile.

##### `time_metadata`

`dict[str, str]`, optional.

A dictionary with a single key, `created_at`, that MUST map to a string encoding the ISO 8601 timestamp as `%Y-%m-%dT%H:%M:%SZ`.

##### `git_metadata`

`dict[str, str]`, optional.

A dictionary that includes provenance information about the git repository and the user that created it.

It MUST accept the following optional keys. Any other keys MUST NOT be accepted.

- `git_user_name`: `str`, optional. User name, as obtained from the `user.name` field in the global configuration.
- `git_user_email`: `str`, optional. User email, as obtained from the `user.email` field in the global configuration.
- `git_sha`: `str`, optional. Hash of the most recent git commit that modified one of the `sources` for this lockfile.

##### `inputs_metadata`

`dict[str, dict[str, str]]`, optional.

A dictionary that maps each of the paths in `sources` to their corresponding content hashes. Each value MUST be a dictionary with only two keys, `md5` and `sha256`, which MUST map to the hexadecimal digest strings of the MD5 and SHA256 hashes of the input file contents, respectively.

##### `custom_metadata`

`dict[str, str]`, optional.

Free form metadata, as key-value string pairs.

#### `package`

`list[LockedDependency]`, required.

This list enumerates the lockfile contents. Each item MUST be a dictionary, termed `LockedDependency` with keys as described below. All items in the list MUST be unique with respect to the fields `(name, manager, platform, category)`.

##### `name`

`str`, required.

Package name, as described in [Package identifiers](../distribution/package-identifiers.md).

##### `version`

`str`, required.

Version string, as described in [Versioning](../distribution/versioning.md).

##### `manager`

`Literal["conda", "pip"]`, required.

The ecosystem this package belongs to. `pip` is to be understood as PyPI.

##### `platform`

`str`, required.

The platform this package targets. It MUST be one of the items in `metadata.platforms`.

##### `dependencies`

`dict[str, str]`, optional.

A dictionary that MUST map a package name string (as in [Package identifiers](../distribution/package-identifiers.md)) to a constraint string.

When these two strings are concatenated, it MUST result in:

- For `manager == "conda"` entries, a `MatchSpec` string, as described in [Dependency specifiers](../distribution/dependency-specifiers.md).
- For `manager == "pip"` entries, a [PEP 440](https://peps.python.org/pep-0440/) dependency specifier.

##### `url`

`str`, required.

Direct download URL for this package.

##### `hash`

`dict[str, str]`, required.

A dictionary which MUST only contain at most two keys, `md5` and `sha256`, which MUST map to the hexadecimal digest strings of the MD5 and SHA256 hashes of the downloaded artifact, respectively.

##### `source`

`dict[str, str]`, optional.

Provenance details of the package. It MUST only contain two keys, `type` (whose only valid value is the string `url`) and `url` (which maps to a URL string).

##### `build`

`str`, optional.

It MUST be the build string of the package, as expressed in [Package identifiers](../distribution/package-identifiers.md), when the `manager` field is set to `conda`. It SHOULD be `None` otherwise.

##### `category`

`str`, optional, defaults to `main`.

A non-empty string that reports which install group this package belongs to. If not provided, `main` MUST be assumed.

##### `optional`

`bool`, required.

A boolean specifying whether this package is required in the created environment or not.

## History

- 2026-03-04: [CEP 37](/learn/ceps/cep-0037) is approved, standardizing `conda-lock.yml` files.
- 2025-04-03: Text spec input files were first standardized by [CEP 23](https://github.com/conda/ceps/blob/main/cep-0023.md).
