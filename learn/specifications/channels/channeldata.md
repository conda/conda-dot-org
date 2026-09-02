---
sidebar_position: 30
---

# `channeldata.json`

This document describes the channel-wide metadata files served in conda channels. Namely, `channeldata.json`.

## Specification

A conda channel MAY serve a `channeldata.json` path.

If present, this JSON document MUST be served at the root of the conda channel (i.e., one directory above `noarch/repodata.json`). It aggregates some packaging metadata across all the channel subdirectories. It MUST follow this schema:

- `channeldata_version: int`. Required. Version of the `channeldata` schema. Currently `1`.
- `subdirs: list[str]`: Required. List of channel subdirectories available in the channel.
- `packages: dict[str, dict]`. Required. Mapping of package names to a dictionary with the following metadata:
  - `activate.d: bool`. Required. Whether the packages feature activation scripts.
  - `binary_prefix: bool`. Required. Whether the package files contain a prefix placeholder that must be replaced in binary mode.
  - `deactivate.d: bool`. Required. Whether the packages feature deactivation scripts.
  - `dev_url: str`. Optional. URL to the main website of the project.
  - `doc_url: str`. Optional. URL to the documentation website of the project.
  - `home: str`. Optional. URL to the main website of the project.
  - `license: str`. Optional. License of the project, preferably a SPDX expression.
  - `post_link: bool`. Required. Whether the packages feature post-link scripts.
  - `pre_link: bool`. Required. Whether the packages feature pre-link scripts.
  - `pre_unlink: bool`. Required. Whether the packages feature pre-unlink scripts.
  - `run_exports: dict[str, dict]`. Required. Mapping of versions to their `run_exports` metadata. See [CEP 12](./cep-0012.md) for the valid keys.
  - `source_url: str | list[str]`. Optional. URL (or URLs) of the sources that were fetched to build the package.
  - `subdirs: list[str]`. Required. Channel subdirectories under which this package is available.
  - `summary: str`. Optional. Short description of the project.
  - `text_prefix: bool`. Required. Whether the package files contain a prefix placeholder that must be replaced in text mode.
  - `timestamp: int`. Required. Most recent `timestamp` value of all given records for this name, as a POSIX timestamp in seconds.
  - `version: str`. Required. Most recent version published in the channel.

## History

- 2026-03-04: `channeldata.json` is standardized by [CEP 38](/learn/ceps/cep-0038).
