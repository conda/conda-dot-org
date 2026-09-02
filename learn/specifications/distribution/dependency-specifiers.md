---
sidebar_position: 20
---

# Dependency specifiers

The `MatchSpec` query syntax is a mini-language designed to select individual entries in a collection of package records. It is sometimes referred to as simply _spec_ or _conda spec_.

## Specification

`MatchSpec` strings provide a compact method to query collections of conda artifacts (e.g. in a conda channel, or in an installed environment) by matching `str` and `int` fields on package records (see [CEP 34: `./info/index.json`](./cep-0034.md) and [CEP 36: Package Record Metadata](./cep-0036.md)). Note that fields using other types, like `list[str]` (`depends`, `constrains`, etc.), cannot be matched by this syntax.

### Syntax

The `MatchSpec` syntax can be thought of as a structured collection of _matching expressions_, each targeting a package record field. A matching expression is defined as a string that MUST follow these rules:

- For expressions targeting the `version` field, [version specifier rules](#version-matching) MUST be applied.
- For expressions targeting the `channel` field, [channel specifier rules](#channel-matching) MUST be applied.
- For expressions targeting any other `str` field, [string matching conventions](#string-matching) MUST be used.
- For expressions targeting `int` fields, the target value MUST be converted to `str` and handled as such.

The full `MatchSpec` syntax takes this approximate form, with parentheses denoting optional fields:

```text
(channel(/subdir):(namespace):)name(version(build))([key1='value 1'(, )key2=value2])
```

More precisely, the following rules MUST apply:

- A `MatchSpec` string MAY exhibit two forms of expressions: positional and keyword based.
- Six positional expressions are recognized. From left to right, they can be arranged in two groups: (`channel`, `subdir`, `namespace`) and (`name`, `version`, `build`).
  - The first group is optional. If present, it MUST be separated from the second group by a single colon character `:`. Within this group, there are four items:
    - `channel: str`. Optional.
    - `subdir: str`. Optional. It requires `channel` to be defined. MUST be separated from `channel` by a single forward slash, `/`. It MUST use a known subdir identifier; otherwise it could be interpreted as the last component of a channel URL.
    - A colon `:` separator, required if `channel` or `namespace` are defined.
    - `namespace: str`. Optional. This expression field MUST be parsed and ignored.
  - The second group contains three expressions. They MUST be separated by either spaces or a single `=` character. Separator types MUST NOT be mixed. See the [version expression parsing notes](#version-expression-parsing) for additional details on the interaction between the `=` symbol as a separator and as an operator. Leading and trailing spaces MUST be ignored.
    - `name: str`. Required. Empty names MUST be represented as `*`.
    - `version: str | VersionSpec`. Optional.
    - `build: str`. Optional. It requires `version` to be present.
- All keyword expressions are optional. If present, they MUST be enclosed in a single set of square brackets, after the positional expressions. The following rules apply:
  - Keyword expressions are written as key-value pairs. They MUST be built by joining the name of the target record field (key) and the expression string (value) with a single `=` character.
  - The value MUST be quoted with single `'` or double `"` quotes if it contains spaces, commas, equal signs, or square brackets. Quoting rules follow [Python's string literals](https://docs.python.org/3/reference/lexical_analysis.html#strings).
  - Keyword expression pairs MUST be separated by a single comma character `,`. Historically, spaces have also been allowed as separators but SHOULD NOT be used.
  - Spaces between comma separators MAY be allowed and MUST be ignored.
- When both positional and keyword expressions are used, the keyword expressions override the positional values, except for `name`: its keyword expression MUST be ignored.

### Matching conventions

#### String matching

Matching expressions that target string fields MUST be interpreted using these case-insensitive rules:

- If the expression begins with `^` and ends with `$`, it MUST be interpreted as a regular expression (regex). The expression matches if the regex search returns a hit; e.g. with Python: `re.search(expression, field) is not None`. Advanced expressions like lookaround and backreferences SHOULD NOT be allowed.
- If the expression contains one or more asterisks (`*`), it is considered a glob expression and MUST be converted into a regular expression and interpreted as such. To convert a glob expression into a regex string:
   1. Escape characters considered special in regex expressions adequately (e.g. using Python's `re.escape`).
   2. Replace escaped asterisks (`\*`) by `.*`.
   3. Wrap the resulting string with `^` and `$`.
- Otherwise, matches MUST be tested with exact, case-insensitive string equality.

### Channel matching

Channel fields MUST be matched with the same rules as strings.

The value of a channel expression MUST allow both names and full URLs. When a name is used (as per [CEP 26](./cep-0026.md)), it MUST be promoted to its corresponding fully qualified URL before comparison.

#### Version matching

Expressions targeting the `version` field MUST be handled with additional rules. These expressions are referred to as _version specifiers_.

A version specifier MUST consist of one or more _version clauses_, separated by logical operators that MUST follow these rules:

- `|` denotes the logical OR.
- `,` denotes the logical AND.
- `,` (AND) has higher precedence than `|` (OR).
- Parentheses `()` MAY be used to modify precedence.

A _version clause_ consists of either:

- A single version literal (as defined in [CEP 33](./cep-0033.md)).
- An operator plus a single version literal.
- A single version literal containing one or more globs (`*`).
- A single glob (`*`).

> For example, given a string `python>=3,<4`, the version specifier is the full expression `>=3,<4`, which consists of two clauses (`>=3`, `<4`) separated by `,` (AND). Each clause contains a version literal (`3` and `4`, respectively).

Each version clause MUST be described by one of these types:

- [String matching](#string-matching) rules apply when:
  - The value is a regex (surrounded by `^` and `$`).
  - The value contains a non-trailing glob (`*`).
- Exact equality, expressed as a version literal prefixed by the double-equals string `==`, MUST be interpreted as normalized version literal equality.
- Fuzzy equality, expressed as either a version literal prefixed by one `=` symbol, or a version literal trailed by `.*` or `*`. After removing the leading `=` character and appending a `.*` suffix, comparison is only truthy when all the version segments before the glob match are equal.
- Exclusion, expressed as a version literal or a version literal augmented with globs, prefixed by the string `!=`, MUST be interpreted as a negated fuzzy equality.
- Ordered comparison, with the implied ordering described in [CEP 33](./cep-0033.md):
  - Exclusive ordered comparison, expressed as a version literal prefixed by `<` or `>`, MUST be interpreted as "smaller than" and "greater than", respectively, as per their position in the version ordering scheme.
  - Inclusive ordered comparison, expressed as a version literal prefixed by one of these strings: `<=`, `>=`, MUST be interpreted as "smaller than" and "greater than", but they will also match as normalized version literal equality.
- Semver-like comparisons, expressed as a version literal prefixed by the `~=` string, MUST be interpreted as greater than or equal to the version literal while also matching a fuzzy equality test for the version literal sans its last segment (e.g. `~=0.5.3` expands to `>=0.5.3,0.5.*`). This operator is considered deprecated, and its expanded alternative SHOULD be used instead.

Version expressions SHOULD NOT contain spaces between operators, and MUST be removed and ignored if present.

### Version expression parsing

In the name of backwards compatibility, the (`name`, `version`, `build`) group in the `MatchSpec` syntax allows two types of separators: spaces and a single `=` character. This conditions how certain `version` expressions are parsed. Given a _version literal_ denoted as `version-literal` (i.e. no operators or asterisks), the following rules MUST apply:

- If the string only contains two fields, which MUST be `name` and `version`:
  - `{name}={version-literal}` and `{name} ={version-literal}` (note the space) both denote fuzzy equality. They are equivalent to `{name}[version={version-literal}.*]` and `{name} {version-literal}.*`
  - `{name} {version-literal}` denotes exact equality. It is equivalent to `{name}[version={version-literal}]` and `{name}=={version-literal}`.
- If the string contains three fields, `name`, `version` and `build`:
  - `{name} {version-literal} {build}`, `{name} =={version-literal} {build}`, `{name}={version-literal}={build}` and `{name}=={version-literal}={build}` all denote exact equality. They are equivalent to `{name}[version={version-literal},build={build}]`.
  - `{name} ={version-literal} {build}` denotes fuzzy equality.

Some examples for `name=pkg` and `version-literal=1.8`, with equivalent version specifiers in the same block:

```text
pkg=1.8
pkg =1.8
pkg 1.8.*
pkg 1.8.* *
pkg=1.8.*
pkg=1.8.*=*
pkg =1.8.* *
pkg ==1.8.* *
pkg[version=1.8.*]
pkg[version="1.8.*"]
```

```text
pkg 1.8
pkg 1.8 *
pkg==1.8
pkg=1.8=*
pkg==1.8=*
pkg ==1.8 *
pkg[version=1.8]
pkg[version="1.8"]
```

## Appendices

### Canonical representation

The canonical string representation of a `MatchSpec` expression proposed by `conda` follows these rules:

1. `name` is required and MUST be written as a positional expression. Empty names MUST be written as `*`.
2. If `version` describes an exact equality expression, it MUST be written as a positional expression, prepended by `==`. If `version` denotes fuzzy equality (e.g. `1.11.*`), it MUST be written as a positional expression with the `.*` suffix left off and prepended by `=`. Otherwise `version` MUST be included inside the key-value brackets.
3. If `version` is an exact equality expression, and `build` does not contain asterisks, `build` MUST be written as a positional expression, prepended by `=`. Otherwise, `build` MUST go inside the key-value brackets.
4. If `channel` is defined and does not contain asterisks, a `::` separator is used between `channel`
   and `name`. `channel` MAY be represented by its name or full, subdir-less URL.
5. If both `channel` and `subdir` do not contain asterisks, `subdir` is appended to
   `channel` with a `/` separator. Otherwise, `subdir` is included in the key-value brackets.
6. Key-value pairs MUST be separated by commas, with no spaces between delimiters. Values MUST be quoted with single quotes.
7. The `namespace` field MUST NOT be represented.
8. Case-insensitive string fields MUST be lowercased.

### Fully specified expressions

To uniquely identify a single package record, a `MatchSpec` expression can be constructed in two ways:

- By passing exact values to the fields `channel` (preferably by URL), `subdir`, `name`, `version`, `build`.
- By matching its checksum directly: `*[md5=12345678901234567890123456789012]` or `*[sha256=f453db4ffe2271ec492a2913af4e61d4a6c118201f07de757df0eff769b65d2e]`.

Note that an artifact URL may be parsed into a fully specified `MatchSpec`. Given:

```text
https://conda.anaconda.org/conda-forge/linux-64/python-3.11.10-h123456_0.conda
[----------channel--------------------|-subdir-|-name-|version|-build---]
```

, becomes `conda-forge/linux-64::python==3.11.10[build=h123456_0]`.

## History

- 2026-03-04: [CEP 29](/learn/ceps/cep-0029/), which standardizes the `MatchSpec` grammar, is approved.
