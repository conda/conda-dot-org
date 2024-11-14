---
title: "October 2024 Releases"
slug: "2024-10-21-october-releases"
authors: [dashagurova]
tags: [announcement, conda-package-handling, conda-package-streaming]
description: |
  conda-package-handling 2.4.0 and conda-package-streaming 0.11.0 have been released! 🎉
image: img/blog/2024-10-21-october-releases/banner.png
---

The October 2024 releases included updates to conda-package-handling and conda-package-streaming! 🎉 All of these have been released to both `main` and `conda-forge` channels.

<!-- truncate -->

## Changes in [conda-package-handling 2.4.0](https://github.com/conda/conda-package-handling/releases/tag/2.4.0)

To update conda-package-handling to the latest version, run:

```bash
conda install -n base conda-package-handling=2.4.0
```

### ✨ What's New? ✨

- Expose API keyword and CLI argument to control which component(s) of the `.conda` artifact is listed in `cph list`.
- Allow `cph list` on remote `.conda` artifact URLs.

### 🔧 What Got Fixed? 🔧

- Use `force_zip64=True` when directly creating `.conda` files. Allows >2GB
(compressed) size.
- Replace `.conda` or `.tar.bz2` extensions from end of string only instead of
`str.replace(...)`.

### Other

- Improved type annotations on an internal function.


## Changes in [conda-package-streaming 0.11.0](https://github.com/conda/conda-package-streaming/releases/tag/v0.11.0)

To update conda-package-streaming to the latest version, run:

```bash
conda install -n base conda-package-streaming=0.11.0
```

### ✨ What's New? ✨

- Add Python 3.12 to test matrix.
- Pass Python `tarfile.extractall(filter="fully_trusted")` in addition to
internal filtering, when available, to avoid Python 3.12+ `DeprecationWarning`.
- Improve `umask` handling.
- Add `transmute_stream(...)` to create `.conda` from `(TarFile, TarInfo)`
iterators, allowing more creative data sources than just `.tar.bz2` inputs.
- Add `create` module with `TarFile` interface for creating `.conda`
archives, also used by `transmute`.
- Pass `encoding="utf-8"` to `TarFile` instead of the system default, avoiding
rare potential issues with non-ASCII filenames.
