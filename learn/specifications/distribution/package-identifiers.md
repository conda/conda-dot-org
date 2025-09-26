# Identifying packages

## Types of packages

The conda ecosystem distinguishes between two types of packages:

- Distributable package names: represented by a concrete, downloadable, extractable conda artifact.
- Virtual package names: not backed by any concrete artifact. They only exist on the client side.

## Package names

A distributable package name MUST only consist of lowercase ASCII letters, numbers, hyphens,
periods and underscores. It MUST start with a letter, a number, or a single underscore. It MUST NOT
include two consecutive separators (hyphen, period, underscore).

Virtual package names MUST only consist of lowercase ASCII letters, numbers, hyphens, periods and
underscores. They MUST NOT use two consecutive separators, with one exception: they MUST start with
two underscores.

Distributable package names MUST match the following case-insensitive regex:

```regex
^(([a-z0-9])|([a-z0-9_](?!_)))[._-]?([a-z0-9]+(\.|-|_|$))*$`
```

Virtual package names MUST follow this regex: 

```regex
^__[a-z0-9][._-]?([a-z0-9]+(\.|-|_|$))*$
```

In all cases, the maximum length of a package name MUST NOT exceed 64 characters.

## Version strings

:::warning
Version strings are pending full standardization.
:::

Version strings MUST only consist of digits, periods, lowercase ASCII letters, underscores, plus
symbols, and exclamation marks. 

The maximum length of a version string MUST NOT exceed 64 characters.

More information in [Versioning](./versioning.md).

## Build strings

Builds strings MUST only consist of ASCII letters, numbers, periods, plus symbols, and underscores.
They MUST match this regex:

```regex
^[a-zA-Z0-9_\.+]+$
```

The maximum length of a build string MUST NOT exceed 64 characters.

## Artifact extensions

Artifact extensions MUST only consist of lowercase ASCII letters, numbers and periods. They must
start and end with a letter or a number. They MUST NOT include two consecutive periods. They MUST
match this regex:

```regex
^[a-z0-9](\.?[a-z0-9])*$
```

The maximum length of a file extension MUST NOT exceed 16 characters.

> The conda ecosystem currently recognizes two artifact extensions: `tar.bz2` and `conda`,
versioned `v1` and `v2` respectively. See [file formats](./file-formats.md) for more information.

## Distribution strings

A "distribution string" MAY be used to identify a package artifact, without specifying the
extension or channel. It MUST match the following syntax:

```text
[<subdir>/]<package name>-<version string>-<build string>
```

Distribution strings apply to distributable packages. They are used as the name of
the directories where artifacts are extracted in the package cache, for example.

Virtual packages MAY be also identified by a distribution string, but in those cases a subdir MUST NOT be present.

> Note: Despite the similarity, distribution strings are not `MatchSpec`-like specifiers and MUST
> NOT be used as such.

## Filenames

The filename of distributable conda artifacts is obtained by adding the artifact extension to its
distribution string (without the subdir, if present). It MUST match this syntax:

```text
<package name>-<version string>-<build string>.<extension>
```

The maximum length of a filename MUST NOT exceed 211 characters.

Virtual conda packages do not exist on disk and SHOULD NOT need filename standardization.

## History

- 2025-04-17: Package identifiers were first standardized by [CEP 26](https://github.com/conda/ceps/blob/main/cep-0026.md).
