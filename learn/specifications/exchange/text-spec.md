---
sidebar_position: 0
---

# Text spec input files

## Nomenclature

This type of input file has not received a specific name. Different conda clients vaguely refer to it as [file specification](https://github.com/conda/conda/blob/841d9d57fd96ad27cda4b7c43549104a96f961ce/conda/cli/helpers.py#L90-L91), or [text spec file](https://github.com/mamba-org/mamba/blob/9300a6530cac4f5575e7f8aa4049fbb9c1150909/docs/source/user_guide/micromamba.rst?plain=1#L143).

In this page, we will use the term "text spec file".

## Specification

Text spec files use plain text to specify one package requirement per line. Lines starting with `#` are considered comments and SHOULD be ignored. Empty lines or lines consisting only of whitespace MUST be ignored.

Some conda clients tend to include a comment line specifying the platform the file was written for. This line often follows the syntax `# platform: {SUBDIR}`, where `{SUBDIR}` is a platform identifier like `linux-64` or `osx-arm64`. Other field comments like the version of the generator tool may be found, such as `# conda version: 24.11.0`. These lines are not required, but implementers might choose to parse it if found for logging or verification purposes.

There are two flavors of this input file: explicit and not explicit.

### Explicit input files

If the file includes a line whose only non-whitespace content is the case-sensitive word `@EXPLICIT`, the file MUST be considered and handled as explicit.

In explicit files, each package requirement line MUST specify a single, direct URL (as in RFC 3986) to a conda artifact, or a file path. File paths SHOULD be preferably expressed as `file://` URLs. Relative paths MAY be used, and SHOULD be processed as relative to the working directory, not the input file parent directory.

Each URL MAY be immediately followed by an anchor tag (`#<hash>`) that encodes the expected MD5 or SHA256 checksum of the downloaded artifact as a lowercase string of 32 or 64 hexadecimal characters, respectively. The prefix `sha256:` MAY be present in the case of SHA256 checksums.

More specifically, whitespace-stripped lines SHOULD be parsable by this Python-style regex:

```regex
(?:(?P<url_p>.+)(?:[/\\]))?(?P<fn>[^/\\#]+(?:\.tar\.bz2|\.conda))(?:#((?P<md5>[0-9a-f]{32})|((sha256:)?(?P<sha256>[0-9a-f]{64}))))?$
```

Leading tildes (`~`) and environment variables MUST be replaced with their values at runtime for backwards compatibility (as Python's [`os.path.expanduser`](https://docs.python.org/3/library/os.path.html#os.path.expanduser) and [`os.path.expandvars`](https://docs.python.org/3/library/os.path.html#os.path.expandvars) would do, respectively). That said, users SHOULD NOT use environment variables in their explicit spec files for the sake of reproducibility.

When an explicit input file is processed, the conda client SHOULD NOT invoke a solver. Because of this, the lines SHOULD be sorted topologically; e.g. if a package `A` depends on `B`, then the URL of B should come first.

### Non-explicit input files

In the absence of an `@EXPLICIT` line, the file is considered regular or not explicit. Each line will encode a `MatchSpec`-compatible string. The solver SHOULD be invoked and, as such, topological sorting is not required.

## History

- 2025-04-03: Text spec input files were first standardized by [CEP 23](https://github.com/conda/ceps/blob/main/cep-0023.md).
