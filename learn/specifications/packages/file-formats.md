---
sidebar_position: 50
---

# Package file formats

This document describes the archive file formats used for conda artifacts distribution: `.tar.bz2` and `.conda`.

## Nomenclature

- Archive: A compressed file which, once extracted, may result in one or more files and/or directories.
- Artifact: The distributable file that is produced as a result of a build process. It happens to be an archive. When used as "conda artifact", it is meant to encompass both `.tar.bz2` and `.conda` archive file formats.
- Tarball: A file that has been produced by running `tar` on a set of files. The resulting `.tar` file MAY be further compressed into another file format (e.g. `.gz` or `.bz2`), and may be still called compressed tarball or simply tarball.
- Package: Roughly speaking, a distributable artifact that ships executables, libraries or resources needed to support the execution of programs. It may refer to the compressed archive, or its extracted form, without further distinction. The emphasis is on the distributed contents, not so much on the form.

## Specification

conda packages MAY be archived and distributed in two formats:

- `.tar.bz2`: The first generation of conda archives. Referred to as version 1.
- `.conda`: The second generation of conda archives. Referred to as version 2.

### `.tar.bz2`

To produce a `.tar.bz2` file, the conda package contents MUST be first archived into an uncompressed tarball (`.tar`). The root level of the archive MUST match the root level of the target location once installed (i.e. no intermediate subdirectories). The resulting tarball MUST be then compressed using the BZ2 compression scheme. The [filename](../distribution/package-identifiers.md) MUST have a `.tar.bz2` extension. Namely: `{name}-{version}-{build}.tar.bz2`.

For example, given a package directory `project-1.2.3-0/`, GNU `tar` can be used like this:

```bash
cd project-1.2.3-0/
tar cvjf project-1.2.3-0.tar.bz2 .
```

The resulting tarball `project-1.2.3-0.tar.bz2` can be extracted using:

```bash
tar xvf project-1.2.3-0.tar.bz2
```

### `.conda`

A `.conda` artifact MUST be a ZIP file with a [filename](../distribution/package-identifiers.md) using the `.conda` extension (i.e. `{name}-{version}-{build}.conda`). It MUST NOT be compressed. The ZIP archive MUST contain two Zstandard-compressed tarballs and a JSON document, named as:

- `info-{name}-{version}-{build}.tar.zst`
- `pkg-{name}-{version}-{build}.tar.zst`
- `metadata.json`

Each tarball MUST be named with the above syntax, taking the `name`, `version` and `build` values from the [`info/index.json` file](../packages/info.md).

The `info-*` tarball MUST contain the [full `info/` folder](../packages/info.md). The `pkg-*` tarball MUST carry everything else in the package directory. The root level of the tarballs MUST match the root level of the target location once installed (i.e. no intermediate subdirectories).

The `metadata.json` MUST be a JSON document that ships a dictionary following this schema:

- `conda_pkg_format_version: int`. The version of the `.conda` file format. Currently `2`.

## History

- 2026-03-04: [CEP 35](/learn/ceps/cep-0035) is approved, standardizing `.tar.bz2` and `.conda` archive file formats.
