---
sidebar_position: 0
---

# Identifying channels

A conda channel is defined as a URL where one can find one or more `repodata.json` files arranged
in one subdirectory (_subdir_) each. `noarch/repodata.json` MUST be present to consider the parent
location a channel.

## Channel base URLs

The base URL for the arbitrary location of a repodata file is defined as:

```text
<scheme>://[<authority>][/<path>/][/label/<label name>]/<subdir>/repodata.json
```

with `<scheme>`, `<authority>` and `<path>` defined by [RFC
3986](https://datatracker.ietf.org/doc/html/rfc3986#section-3.2).

Taken the channel definition above, the base URL without trailing slashes is thus:

```text
<scheme>://[<authority>][/<path>/][/label/<label name>]
```

For example, given `https://conda.anaconda.org/conda-forge/noarch/repodata.json`, the part leading
to `noarch/repodata.json` and thus base URL is `https://conda.anaconda.org/conda-forge`. For local
repodata such as `file:///home/username/channel/noarch/repodata.json`, the channel base URL is
`file:///home/username/channel`.

When present, each path component MUST only contain lowercase ASCII letters, numbers, underscores,
periods, and dashes. They MUST NOT start with a period or a dash. They SHOULD start and end with a
letter or a number. If present, each path component MUST match this regex:

```regex
^[a-z0-9_][a-z0-9_.-]*$
```

For `file://`-based channel URLs, the path component rules MAY be understood as recommendations
only.

The maximum length of an individual path component in a channel base URL MUST NOT exceed 128
characters. The maximum length of a channel base URL SHOULD NOT exceed 256 characters.

To avoid ambiguous `MatchSpec` grammar, the last path component of a channel base URL SHOULD NOT
match any `subdir` identifiers. If it does, the behavior in this ambiguous case is not defined
and implementation dependent.

## Channel names

For convenience, the channel _name_ is defined as the concatenation of `scheme`, `authority` and
`path` components of a channel URL. At least one of `authority` or `path` SHOULD be present. In
their absence, the channel name MUST be considered empty, regardless the scheme. Empty channel
names SHOULD NOT be used.

When the scheme and authority fields are missing, the full URL can be inferred with these rules:

- If the channel name matches the regex `^\.{0,2}[/\\].*$`, or if it matches the regex
  `^[A-Z]:([\\/].*)?$` (for Windows drives), it SHOULD be understood as the path component of a
  `file://` URL.
- Otherwise, the tool SHOULD provide a user-configurable mechanism to use a default scheme and
  authority, with the provided channel name taken as the rest of the path component. At the time of
  this CEP's writing, most tools assume the default URL scheme and authority to be
  `https://conda.anaconda.org`.

## Subdir names

Channel subdir names MUST either be the literal `noarch` or a string following the syntax
`{os}-{arch}`, where `{os}` and `{arch}` MUST only consist of lowercase ASCII letters and numbers.
Non-`noarch` subdirs MUST match this regex:

```regex
^[a-z0-9]+-[a-z0-9]+$
```

The maximum length of a subdir name MUST NOT exceed 32 characters.

## Label names

Channel label names MUST only consist of ASCII letters, digits, underscores, hyphens, forward
slashes, periods, and whitespace. They MUST start with a letter. They MUST match this regex:

```regex
^[a-zA-Z][0-9a-zA-Z_\-\./]*$
```

The last `/`-delimited component of a label SHOULD NOT match any `subdir` identifier. If it does,
the behavior in this ambiguous case is undefined and implementation dependent.

The label `nolabel` is reserved and MUST only be used for conda packages which have no other
labels. In other words, in the space of labels, the empty set is represented by the labels
`nolabel`.

A URL for a package, repodata, etc. without a label component MUST be assumed to have the default
label `main`.

The maximum length of a label name MUST NOT exceed 128 characters.

## History

- 2025-04-17: Channel identifiers were first standardized by [CEP 26](https://github.com/conda/ceps/blob/main/cep-0026.md).
