---
sidebar_position: 0
---

# Environment

This document describes the structure of a conda environment.

## Specification

A conda environment is defined as a directory that contains, at least, a `./conda-meta/history` file.

All relative paths in this specification MUST be understood as relative to the path of a given target environment, referred to as `$CONDA_PREFIX`. So `./conda-meta/` is equivalent to `$CONDA_PREFIX/conda-meta`. Directory paths end with a trailing slash `/`.

### Internal metadata: `./conda-meta/`

This directory stores metadata about the environment and installed packages. It MUST be considered protected and MUST NOT be populated directly by package contents.

The following files MUST be recognized by conda clients:

#### `./conda-meta/history`

Required.

Plain text file. Its existence MUST mark its parent directory as a valid conda environment.

It SHOULD record the operations performed during the lifetime of the environment, but MAY be empty. If populated, a `history` file MUST be composed of one or more _action blocks_. Each action block MUST follow this syntax:

```text
==> YYYY-MM-DD HH:MM:SS <==
# cmd: /path/to/conda/executable subcommand arguments ...
# name-of-tool version: MAJOR.MINOR.PATCH
+channel/subdir::name_of_linked_package1-version-build_string
+channel/subdir::name_of_linked_package2-version-build_string
+channel/subdir::name_of_linked_package3-version-build_string
+channel/subdir::name_of_linked_package4-version-build_string
-channel/subdir::name_of_unlinked_package1-version-build_string
-channel/subdir::name_of_unlinked_package2-version-build_string
# (update|remove|neutered) specs: ['spec1', 'spec2', 'spec3', 'spec4']
```

#### `./conda-meta/{name}-{version}-{build-string}.json`

Required.

This document serves as a manifest of all the files that each installed package brought into the environment, plus some additional metadata to handle its behavior during the environment lifecycle.

It MUST be a JSON document that ships a dictionary conforming to this schema:

- `arch: str | None`. Deprecated, as defined in [CEP 34](./cep-0034.md).
- `build: str`. Build string, as defined in [CEP 34](./cep-0034.md).
- `build_number: int`. Build number, as defined in [CEP 34](./cep-0034.md).
- `channel: str`: URL to source channel, without subdir, as defined in [CEP 26](./cep-0026.md).
- `constrains: list[str]`. Runtime constraints, as defined in [CEP 34](./cep-0034.md).
- `depends: list[str]`. Runtime requirements, as defined in [CEP 34](./cep-0034.md).
- `extracted_package_dir: str`: Absolute path to extracted contents of the artifact.
- `files: list[str]`: list of installed paths that are owned by this artifact, relative to `$CONDA_PREFIX`, forward-slash normalized. It MUST include files that were not initially part of the package but were generated during the installation process (e.g. `*.pyc` bytecode files).
- `fn: str`. Filename of compressed artifact, as defined in [CEP 26](./cep-0026.md).
- `license: str`. SPDX license expression, as defined in [CEP 34](./cep-0034.md).
- `link: dict[str, Any]`: How the package was linked into the prefix. It MUST only allow two keys:
  - `source: str`: The path of the extracted package directory.
  - `type: Literal[1, 2, 3, 4]`: Type of linkage (1 = hardlink, 2 = softlink, 3 = copy, 4 = directory).
- `md5: str`: Hexadecimal string of MD5 hash, as defined in [CEP 34](./cep-0034.md).
- `name: str`: Lowercase name of the package, as defined in [CEP 26](./cep-0026.md).
- `noarch: Literal['generic', 'python']`: Optional. Noarch type, as defined in [CEP 34](./cep-0034.md).
- `package_tarball_full_path: str`: Absolute path to downloaded artifact (compressed).
- `paths_data: dict[str, Any]`: Metadata about the artifact installed contents, which includes the artifact distributed files, and the generated files at install time. It MUST be a mapping with two keys:
  - `paths: list[dict[str, Any]]`: Information about installed files. Extends [CEP 34](./cep-0034.md)'s `paths.json` with some extra details:
    - `_path: str`: Relative path of file within `$CONDA_PREFIX`, forward-slash normalized.
    - `file_mode: Literal['text', 'binary']`: Optional, defaults to `text`. How to perform prefix replacement.
    - `no_link: bool`: Optional, defaults to `false`. Whether to force copy or allow link.
    - `path_type: Literal['softlink', 'hardlink', 'directory', 'pyc_file', 'unix_python_entry_point', 'windows_python_entry_point_script', 'windows_python_entry_point_exe', 'linked_package_record']`: Optional, defaults to `hardlink`. How the file was written to `$CONDA_PREFIX`, which includes what type of generated file it is, if applicable.
    - `prefix_placeholder: str`: Optional. String that MUST be replaced with the target location at `$CONDA_PREFIX`.
    - `sha256: str`: Optional if the file is generated. 64-char hex string corresponding to the SHA256 checksum of the original file in cache.
    - `sha256_in_prefix: str`: Optional if generated. 64-char hex string corresponding to the SHA256 checksum of the file as installed in the target prefix. This MAY be different from `sha256` due to prefix replacement.
    - `size_in_bytes: int`: Optional if generated. Size of file, in bytes.
  - `paths_version: int`: Version of this schema. Currently, `1`.
- `platform: str | None`. Deprecated, as defined in [CEP 34](./cep-0034.md).
- `requested_spec: str`: Deprecated, use `requested_specs` instead. `MatchSpec` string (as defined in [CEP 29](./cep-0029.md)) that led to choosing this package.
- `requested_specs: list[str]`: List of `MatchSpec` strings (as defined in [CEP 29](./cep-0029.md)) that led to choosing this package.
- `sha256: str`: Hexadecimal string of SHA256 hash, as defined in [CEP 34](./cep-0034.md).
- `size: int`: Size, in bytes, of compressed artifact, as defined in [CEP 34](./cep-0034.md).
- `subdir: str`: Subdir string, as defined in [CEP 34](./cep-0034.md).
- `timestamp: int`: Moment the package build started, as defined in [CEP 34](./cep-0034.md).
- `url: str`: Direct URL to download the artifact. It SHOULD be the result of joining the `channel` URL plus `subdir` (or its `base_url` field as defined in [CEP 15](./cep-0015.md)) plus the `fn` field.
- `version: str`: Package version, as defined in [CEP 33](./cep-0033.md).

The fields above that also appear in [CEP 34](./cep-0034.md)'s `info/index.json` MUST match the relevant fields in the most up-to-date repodata information available for the package at install time (`depends` and `constrains` are of particular importance due to repodata patching).
This is generally the channel's `repodata.json`, but it MAY also be an alternative source like the serialized metadata in a lockfile. The package's `info/index.json` SHOULD be used as a fallback if no other sources are available.

Additional keys MAY be present in the file and MUST be ignored if not recognized.

#### `./conda-meta/frozen`

Optional.

Empty file or JSON document that MUST follow [CEP 22](./cep-0022.md).

#### `./conda-meta/state`

Optional.

JSON document that MUST provide a dictionary with a single key, `env_vars`, whose value is a dictionary that maps strings to strings. These are environment variable names and their values, respectively.

conda clients SHOULD parse this document and export the environment variables on environment activation, and unset them on deactivate.

### General contents

The rest of the environment directory is generally populated by the contents of its installed packages, after extraction and linking. As a result, the structure is arbitrary and determined by which packages are installed. Refer to [Package contents](../packages/contents.md) for more details on which conventions to follow.

Packages MAY include files in some special paths that conda clients need to handle in a specific way. Refer to [Lifecycle](./lifecycle.md) for more details.

## History

- 2026-03-04: [CEP 32](/learn/ceps/cep-0032) standardized environment contents.
