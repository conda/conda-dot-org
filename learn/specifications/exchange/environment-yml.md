---
sidebar_position: 10
---

# `environment.yml`

## Nomenclature

The `environment.yml` file format was introduced by `conda env`. It has been traditionally referred
to as "the YAML input file", but other YAML files exist in the ecosystem now. To avoid confusion,
we will only use the term `environment.yml`. Note that the actual filename of an
input file using this format might be a different one (e.g. `env.yml`, `my-env.yaml`).

## Specification

`environment.yml` files are YAML documents that encode the necessary information to create a new
conda environment. The core standard recognizes five top-level keys:

- `name`: The preferred name for the environment.
- `prefix`: The preferred full path to the environment. Often ignored.
- `dependencies`: List of package specifications that MUST be installed in the new environment.
- `channels`: Conda channels that will be used to resolve the dependencies.
- `variables`: Environment variables that SHOULD be added to the `conda-meta/state` file in the
  resulting environment.

The file name is not standardized, but the extension MUST be `yml` or `yaml`.

Notably, this version of the specification does not feature a `version` (or equivalent) top-level
key. Future revisions MAY include such a field. As such, the version information of this revision
is omitted and considered to be `1`.

### Optional extensions

A number of extensions have been implemented by some conda clients. These are not guaranteed to be
available in all conda clients.

Two additional top-level keys MAY be present:

- `platforms`: Target subdirs for the solver.
- `category`: Free-form field to label the dependencies as a group.

Preprocessing selectors MAY be available to specify line filters to allow platform-specific values,
among other uses. There are two types: comment-based and dictionary-based. Only one type of filter
SHOULD be used in the same document.

### Other top-level keys

Additional top-level keys can be present, but they MUST be ignored, and the user SHOULD receive an
informative warning about them when the conda client does not support them.

## Schema

### `name` and `prefix`

Optional, `str`.

Both fields refer to the _preferred_ name or path for the newly created environment. Tools SHOULD
allow these suggestions to be overridden by the user with additional CLI flags or equivalent. If
the proposed environment path exists, tools MUST NOT overwrite silently by default.

Special names `base` and `root` SHOULD NOT be accepted. Prefixes targeting protected system paths
SHOULD be rejected. Paths can contain tildes (`~`) and environment variables, and they MUST be
expanded when present.

The name of the environment (and the last component of the expanded `prefix` path) MUST NOT contain
any of these characters: `/`, " " (space), `:`, `#`.

### `dependencies`

Required, `list[str | dict[str, Any]]`.

The simplest form for this section is a list of `str` encoding `MatchSpec`-compatible requirements.
These items MUST be processed as conda requirements and submitted to the solver (along with
`channels`) to obtain the contents for the resulting conda environment.

This section can also contain "subsection" dictionaries that map `str` to arbitrary values. Each
key refers to a non-conda installer tool that will process the associated contents as necessary.
The additional subsections MUST be processed after the conda requirements. They SHOULD only add new
contents. Processing these keys SHOULD NOT result in existing contents being overwritten.

Currently known subsections include `pip`, the contents of which encode a list of `str` referring
to PyPI requirements. How this list is processed is left as an implementation detail, but common
approaches involve invoking the `pip` or equivalent command line tools directly.

Additional subsections are allowed. The conda client MUST error out by default if it cannot process
unknown sections.

### `channels`

Optional, `list[str]`.

These are the conda channels that will be queried to solve the requirements added in
`dependencies`. They can be expressed with names, URLs, and local paths.

If not specified, the conda client MUST use the default configuration. When specified, these
channels MUST be used to populate the channel list passed to the solver. The default channel
configuration MUST be appended, unless the special name `nodefaults` is present. When this is the
case, the default configuration MUST not be appended. The `nodefaults` name MUST NOT be passed to
the solver.

### `variables`

Optional, `dict[str, str]`.

Keys MUST be valid environment variable names for the target operating system. We recommend
sticking to names compatible with both Windows and POSIX standards. Values SHOULD be `str`. If they
are not, they MUST be converted to `str`.

These contents SHOULD be dumped into the `conda-meta/state` file of the target environment, or
equivalent, so they can be set upon environment activation.

### `platforms`

Optional, `list[str]`.

Platforms for which the environment must be solved. Mostly used by tools that generate lock files
without installing to a prefix on the running machine. Each string MUST belong to the set of valid
`subdirs`, with one exception: `noarch` MUST be rejected as a valid platform value.

In the absence of the field, the single value MUST be assumed to correspond to a user-specified
value, falling back to the running platform value. For example, running on Linux x86_64 the
`platforms` would default to `[linux-64]`.

### `category`

Optional, `str`.

A free-form field where users can annotate the type of dependencies handled in the environment
file. For example, `dev` or `test`.  Mostly used by tools that generate lock files.

### Preprocessing selectors

`environment.yml` files MAY specify per-line filters that contain an expression that MUST be
evaluate to a boolean. If `true`, the expression MUST be removed and the value MUST be kept in the
document. If `false`, both the expression and the value MUST be removed.

### Comment-based selectors

The syntax for these selectors MUST be in the form of a line comment with the expression between
square brackets: `# [<expression>]`. The space between `#` and the opening square bracket is
optional but recommended. Once the selectors have been processed, the resulting document MUST be
parsable as YAML.

The expressions MUST be composed of one or more boolean variables, and can be chained with `and`
and `or` logic operators. Precedence can be specified with parentheses.

The supported boolean variables are the OS- and architecture-specific values collected in
[conda-build's 25.1.x documentation][selectors], plus `osx64` (equivalent to `osx and x64`). More
specifically,`py`, `py*`, `np` and `build_platform` are NOT supported.

These are used by `conda-lock`.

### Dictionary-based selectors

The `dependencies` section MAY contain elements that are `dict[str, str]` instead of `str`. The key
in these cases MUST be of the form `sel(<expression>)`, where `<expression>` evaluates to a
boolean. The expression MUST only contain one of the following boolean variables: `unix` (true when
the target OS is Linux or macOS), `linux`, `osx`, or `win` (true when the target OS is Linux, macOS
or Windows, respectively).

The value MUST be a `MatchSpec`-compatible string. When the expression is true, the dictionary
entry in the list MUST be replaced with the value.

These are used by `micromamba`.

## History

- 2025-04-09: `environment.yml` files were first standardized by [CEP 24](https://github.com/conda/ceps/blob/main/cep-0024.md).

<!-- links -->

[selectors]:
    https://docs.conda.io/projects/conda-build/en/25.1.x/resources/define-metadata.html#preprocessing-selectors
