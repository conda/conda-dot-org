---
title: "Conda documentation gets a new theme"
slug: "2023-11-27-conda-documentation-get-a-new-theme"
authors: [travishathaway]
tags: [conda, announcement]
description: |
image: img/blog/2023-11-27-conda-documentation-gets-a-new-theme/conda-documentation-screenshot.png
---

[conda]: https://github.com/conda/conda
[conda-build]: https://github.com/conda/conda-build
[conda-sphinx-theme]: https://github.com/conda-incubator/conda-sphinx-theme
[pydata-sphinx-theme]: https://github.com/pydata/pydata-sphinx-theme
[conda-incubator]: https://github.com/conda-incubator
[conda-org]: https://github.com/conda

We recently pushed out a new theme to the documentation sites for
[conda][conda] and [conda-build][conda-build]. This theme is also available
for all conda related projects to use as a Sphinx theme (check out the
[conda-sphinx-theme][conda-sphinx-theme] project).

<!-- truncate -->

The theme we recently developed is derived from the [PyData Sphinx Theme][pydata-sphinx-theme],
which is currently used by many projects in the Python ecosystem focusing on scientific computing
and data science. The conda-sphinx-theme adds a couple customizations such as custom fonts
and primary colors.

Going forward, we hope this theme will be the default theme to choose when creating a new
project under the [conda-incubator][conda-incubator] or [conda][conda-org] organizations in GitHub.
It should be noted that this will never be a required choice. Ultimately, it is up to the project
team to choose what is best for them.

For any feature requests or bug reports regarding the new theme, please file them in the issues
section of the [conda-sphinx-theme project on GitHub][conda-sphinx-theme].

The theme itself is currently installable either by `pip install conda-sphinx-theme` or
by `conda install -c conda-forge conda-sphinx-theme`.

We hope you all enjoy a better looking conda documentation experience!
