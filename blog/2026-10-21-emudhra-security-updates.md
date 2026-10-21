---
title: Update conda and Pixi after the eMudhra certificate compromise
slug: 2026-10-21-emudhra-security-updates
authors: [jezdez]
tags: [announcement, conda, pixi, security]
description: Conda 26.9.4 and Pixi 0.82.1 address the eMudhra certificate compromise. Learn how to update and check your CA packages.
---

## Contents

- [What happened?](#what-happened)
- [Pixi 0.82.1](#pixi-0821)
- [Conda 26.9.4](#conda-2694)
- [Mamba](#mamba)
- [Updating an older conda installation](#updating-an-older-conda-installation)
- [conda-libmamba-solver and conda-pypi](#conda-libmamba-solver-and-conda-pypi)
- [Check the package contents](#check-the-package-contents)

## What happened?

HTTPS certificates help your package manager check that it is talking to the right server. Researchers found that eight intermediate certificates issued by eMudhra had recoverable private keys. Someone with those keys could impersonate websites and services.

Browsers have blocked the affected certificates, but developer tools often use their own lists of trusted certificate authorities, or CAs. Those lists need updating too. Whether attackers used this weakness against non-browser clients is unknown. The [incident report](https://emudhra.we-have-a-problem.com/) explains the compromise and the response.

<!-- truncate -->

## Pixi 0.82.1

[Pixi 0.82.1](https://github.com/prefix-dev/pixi/releases/tag/v0.82.1) is available on Anaconda main and conda-forge and includes fixes for the same incident. It updates `webpki-root-certs` to 1.0.10 and `rustls-webpki` to 0.103.16. Existing Pixi users should upgrade.

If you installed Pixi with its installer, follow [Pixi's update instructions](https://pixi.prefix.dev/latest/installation/#update). Run these commands on Windows, macOS, or Linux:

```console
pixi self-update
pixi --version
```

Confirm that the version is 0.82.1 or newer. To install this exact release, use [`pixi self-update --version 0.82.1`](https://pixi.prefix.dev/latest/reference/cli/pixi/self-update/).

If you installed Pixi through a package manager, update it through that package manager, such as `brew upgrade pixi` for Homebrew. For conda-installed copies, use the channel that provided Pixi.

For Anaconda main:

```console
conda install --name base --override-channels --channel defaults "pixi>=0.82.1"
```

Or, for a conda-forge installation:

```console
conda install --name base --override-channels --channel conda-forge "pixi>=0.82.1"
```

Check `pixi --version` in the shell you normally use, and update other installed copies separately. Updating `certifi` and `ca-certificates` does not replace the roots compiled into an older Pixi executable.

## Conda 26.9.4

Conda 26.9.4 is now available on Anaconda's main channel and conda-forge. It enforces minimum versions of the CA packages needed for this incident. See the [release ticket](https://github.com/conda/conda/issues/16880) for details.

Update with:

```bash
conda install --name base conda=26.9.4
```

The corrected CA packages are already available:

| Package | Anaconda main | conda-forge |
| --- | --- | --- |
| `certifi` | `2026.10.19` or newer | `2026.10.19` or newer |
| `ca-certificates` | `2026.10.20` or newer | `2026.10.19` or newer |

See the [certifi release](https://github.com/certifi/python-certifi/releases/tag/2026.10.19) and the published CA packages for [Anaconda main](https://repo.anaconda.com/pkgs/main/linux-64/ca-certificates-2026.10.20-h06a4308_0.conda) and [conda-forge](https://conda.anaconda.org/conda-forge/noarch/ca-certificates-2026.10.19-hbd8a1cb_0.conda).

## Mamba

Mamba users need the corrected CA bundle too. For a conda-forge installation, update `mamba`, its native `libmamba` library, and `ca-certificates` together:

```console
mamba install --name base --override-channels --channel conda-forge mamba libmamba "ca-certificates>=2026.10.19"
```

Replace `base` if mamba is installed in another environment. If that environment also contains `libmambapy`, include it in the command so the Python bindings can move with the matching native library. For mamba 1.x, also include `"certifi>=2026.10.19"` because those versions use Python HTTPS clients.

The [conda-forge mamba and libmamba rebuilds](https://github.com/conda-forge/mamba-feedstock/pull/403) add the CA minimum to their package metadata. The package version stays the same, so check the build as well as the version in `conda list`. The explicit CA minimum in the command above also protects older mamba builds.

Anaconda main provides `libmamba` and `libmambapy` for conda's solver, but does not provide the `mamba` command. Follow the [conda-libmamba-solver instructions](#conda-libmamba-solver-and-conda-pypi) for those packages.

## Updating an older conda installation

You can update the CA packages before upgrading conda. Use the command for the distribution you already use.

For Anaconda or Miniconda using Anaconda's main channel:

```bash
conda install --name base --override-channels --channel defaults "certifi>=2026.10.19" "ca-certificates>=2026.10.20"
```

For Miniforge or an installation using conda-forge:

```bash
conda install --name base --override-channels --channel conda-forge "certifi>=2026.10.19" "ca-certificates>=2026.10.19"
```

If you must keep a particular conda version, add `conda=<your-version>` to the command. Conda-forge's corrected `certifi` package requires Python 3.11 or newer. Older Python versions or package pins may prevent the update. In that case, move to a supported Python version or a current installer. Keep certificate verification enabled.

Updating base does not update every environment. Repeat the CA update for environments that run HTTPS clients, replacing `base` with the environment name. Update custom CA files and the OS trust store separately if your `ssl_verify` setting or `REQUESTS_CA_BUNDLE`, `CURL_CA_BUNDLE`, `SSL_CERT_FILE`, or `SSL_CERT_DIR` selects them. Pip also has its own vendored CA bundle and needs a separate update.

## conda-libmamba-solver and conda-pypi

`conda-libmamba-solver` uses both Python and native HTTPS clients, so both CA packages need updating. For installations using `conda-libmamba-solver`, request the solver, Python bindings, and native library together with the corrected CA packages. This lets conda keep the related packages at compatible versions and builds.

For Anaconda main:

```console
conda install --name base --override-channels --channel defaults conda-libmamba-solver libmambapy libmamba "certifi>=2026.10.19" "ca-certificates>=2026.10.20"
```

For conda-forge:

```console
conda install --name base --override-channels --channel conda-forge conda-libmamba-solver libmambapy libmamba "certifi>=2026.10.19" "ca-certificates>=2026.10.19"
```

Rebuilt solver packages add the CA minimums to their metadata on [Anaconda main](https://github.com/AnacondaRecipes/conda-libmamba-solver-feedstock/pull/41) and [conda-forge](https://github.com/conda-forge/conda-libmamba-solver-feedstock/pull/59). The [Anaconda main libmamba rebuild](https://github.com/AnacondaRecipes/mamba-feedstock/pull/33) adds the corresponding `ca-certificates` minimum. These changes update package metadata, so the library version alone does not identify a corrected build.

The [conda-forge repodata hotfix](https://github.com/conda-forge/conda-forge-repodata-patches-feedstock/pull/1289) also adds constraints to covered historical builds. Hotfixes affect solves that select those builds from corrected channel metadata. They do not update packages in an existing environment, and installs that bypass solving can bypass these constraints. Use the explicit CA minimums above when updating an existing installation.

If you use `conda-pypi`, include `conda-pypi` in the same update command. Its package discovery uses Unearth's default HTTPX client, which uses certifi's CA bundle. The plugin therefore needs the corrected `certifi` in the environment that runs conda. Package rebuilds on [Anaconda main](https://github.com/AnacondaRecipes/conda-pypi-feedstock/pull/20) and [conda-forge](https://github.com/conda-forge/conda-pypi-feedstock/pull/74) add the same certifi minimum.

## Check the package contents

The following commands use the same syntax in Command Prompt, PowerShell, and POSIX shells. They inspect the actual CA bundles from either channel using OpenSSL 3.

First, check the installed versions and channels, find the base installation, and locate certifi's bundle:

```console
conda list --name base --show-channel-urls "^(conda|conda-libmamba-solver|libmambapy|libmamba|mamba|conda-pypi|certifi|ca-certificates)$"
conda info --base
conda run --name base python -m certifi
conda run --name base openssl version
```

For `ca-certificates`, use the following file under the base directory printed by `conda info --base`:

| Platform | Bundle location within base |
| --- | --- |
| Windows | `Library/ssl/cacert.pem` |
| macOS or Linux | `ssl/cacert.pem` |

Download the disclosure's [12 test chains](https://emudhra.we-have-a-problem.com/chains.zip), then extract them into the current directory:

```console
conda run --name base python -m zipfile -e chains.zip .
```

Replace `<bundle.pem>` with the full path to one installed bundle, keeping the double quotes. These two examples check the eMudhra and Sectigo cross-signed certificate chains:

```console
conda run --name base openssl verify -show_chain -no-CApath -no-CAstore -CAfile "<bundle.pem>" -untrusted "chains/dv-g3b-emudhra.we-have-a-problem.com.pem" "chains/dv-g3b-emudhra.we-have-a-problem.com.pem"
conda run --name base openssl verify -show_chain -no-CApath -no-CAstore -CAfile "<bundle.pem>" -untrusted "chains/dv-g3b-aaa-emudhra.we-have-a-problem.com.pem" "chains/dv-g3b-aaa-emudhra.we-have-a-problem.com.pem"
```

Repeat for every `.pem` file in the extracted `chains` directory, first with certifi's bundle and then with the `ca-certificates` bundle. An `unable to get local issuer certificate` error is the expected result. `OK` means the bundle still trusts that compromised chain. Other errors need investigation. These checks run offline and do not contact the test hosts.

If base has an older OpenSSL, create a separate checking environment with `conda create --name ca-audit "openssl>=3"` and use `--name ca-audit` for the OpenSSL commands. Continue passing the bundle paths from the installation you are checking.

To inspect a downloaded package before installing it, choose the `certifi` and `ca-certificates` artifacts for your platform from [Anaconda main](https://repo.anaconda.com/pkgs/main/) or [conda-forge](https://conda.anaconda.org/conda-forge/). Extract each into a separate directory:

```bash
conda run --name base cph x "<package.conda>" --dest "<inspection-directory>"
```

Repeat the offline chain checks with the extracted PEM files. Check both packages from each channel you distribute or use.
