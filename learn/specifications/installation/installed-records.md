---
sidebar_position: 10
---

# Recording installed packages

When a conda package is installed in a conda environment, a JSON document is placed in `conda-meta/`. The JSON document MUST be named like the source conda package (sans the extension), and subscribe to the following schema.

> More info at https://github.com/conda/ceps/pull/124/files#diff-bebfa3f1d70547b3695124927ba31659f76574696cb2ae65c971578b2069ff5fR154
