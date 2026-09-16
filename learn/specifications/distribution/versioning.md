---
sidebar_position: 10
---

# Versioning

This document describes version literals as used in the conda ecosystem, and their ordering in comparisons.

## Specification

### Version literals

- Version literals MUST only consist of digits, periods, lowercase ASCII letters, underscores, plus symbols, and exclamation marks. The maximum length of a version string MUST NOT exceed 64 characters.
- Version literals MUST be composed of alphanumeric characters `[A-Za-z0-9]`, separated into segments by periods `.` and underscores `_`. Dashes `-` are historically allowed and interpreted as underscores, but SHOULD NOT be used because they break filename conventions.
- Consecutive runs of digits MUST NOT exceed a value of `2^31-1`.
- Empty segments (i.e. two consecutive periods, or a period plus an underscore) SHOULD NOT be allowed.
- A single trailing underscore MAY be used exceptionally for comparisons against `openssl 1.x`-like version schemes (e.g. `1.0.1_ < 1.0.1a`).
- A single epoch number (a positive integer followed by `!`) MAY prefix the rest of the string.
- A single local version string MAY be added at the end, separated by a plus symbol `+`.

### Ordering

Before being compared, version literals MUST be parsed into a list of segments (with each segment being a list of components) as follows:

- They are first split into _epoch_, _main version_, and _local version_ at `!` and `+` respectively.
  - If there is no `!`, the epoch is set to `0`.
  - If there is no `+`, the local version is empty.
- The main version part is then split into components at `.`, `_`, and `-`.
  - Each component is split again into consecutive runs of numerals and non-numerals.
  - Subcomponents containing only numerals are converted to integers.
  - Strings are converted to lowercase, with special treatment for `dev` and `post`.
  - Trailing underscores are considered part of the preceding string, if any.
  - When a component starts with a letter, the fill value `0` is inserted before the letter.
  - Leading zeros in a component are removed.
- The epoch and main version segments are concatenated.
- The same is repeated for the local version part, and stored as a separate list of segments.

For example:

```python
>>> parse("1.2g.beta15.rc")
[[0], [1], [2, 'g'], [0, 'beta', 15], [0, 'rc']], []
>>> parse("1!2.15.1_ALPHA")
[[1], [2], [15], [1], [0, 'alpha']], []
>>> parse("1!2.15.1alpha_")
[[1], [2], [15], [1, 'alpha_']], []
>>> parse("1!2.15.1_alpha+1.2.3h123")
[[1], [2], [15], [1], [0, 'alpha']], [[1], [2], [3, 'h', 123]]
```

The resulting list of components MUST be compared as follows:

- Integers are compared numerically.
- Strings are compared lexicographically, case-insensitive. The substring `dev` is always smaller.
- Strings are considered smaller than integers, except for `post`, which is always greater.
- When a component has no correspondent, the missing component is assumed to be `0`.
- Local versions are only compared when the main versions are identical. A version without a local part is treated as having an implicit local version of 0.

> Warning:
> Pre-releases markers are sensitive to leading zeros and periods. While `"1.1.0" == "1.1.0.0" ==
> "1.1"`, the rule "When a component starts with a letter, the fill value `0` is inserted" results
> in `"1.1.0rc" == "1.1.rc" > "1.1rc"`. See [conda#12568](https://github.com/conda/conda/issues/12568).

## History

- 2026-03-04: Version literals are their ordering are standardized by [CEP 33](/learn/ceps/cep-0033).
- 2025-05-07: Version literals are minimally defined by [CEP 26](/learn/ceps/cep-0026).
