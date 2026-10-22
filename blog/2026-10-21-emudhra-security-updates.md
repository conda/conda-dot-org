---
title: Security updates for conda, Mamba, and Pixi
slug: 2026-10-21-emudhra-security-updates
authors: [jezdez]
image: img/blog/2026-10-21-emudhra-security-updates/banner.png
tags: [announcement, conda, mamba, pixi, security]
description: Update conda, Mamba, Pixi, and CA packages after the eMudhra certificate compromise.
---

## Update now

- [Conda](/blog/2026-10-21-emudhra-security-updates#conda-2694): run `conda self update --all` if `conda-self` is installed. Otherwise, run `conda install --name base conda=26.9.4`.
- [Mamba](/blog/2026-10-21-emudhra-security-updates#mamba): update Mamba, libmamba, and the CA packages together.
- [Pixi](/blog/2026-10-21-emudhra-security-updates#pixi-0821): run `pixi self-update` if you used its installer. Otherwise, update through the package manager you used.
- [Update CA packages separately](/blog/2026-10-21-emudhra-security-updates#updating-an-older-conda-installation) if you need to keep your current conda version.

Updating `base` does not update other environments or custom CA stores.

<!-- truncate -->

## What happened?

HTTPS certificates help your package manager check which server it is talking to. Researchers found that eight intermediate certificates issued by eMudhra had recoverable private keys. An attacker with those keys could impersonate websites and services.

Browsers have blocked the affected certificates. Many developer tools use their own certificate authority (CA) bundles and need separate updates. It is not known whether attackers exploited this weakness against non-browser clients. See the [incident report](https://emudhra.we-have-a-problem.com/) for details.

## Update your package manager

### Conda 26.9.4

Conda 26.9.4 is available on Anaconda's main channel and conda-forge. It requires the minimum CA package versions listed below. See the [release ticket](https://github.com/conda/conda/issues/16880) for details.

Conda packages from Anaconda main and conda-forge include `conda-self` starting with 26.5. Use it to update conda, its plugins, and their dependencies, including the CA packages:

```bash
conda self update --all
```

If `conda-self` is unavailable, update conda directly:

```bash
conda install --name base conda=26.9.4
```

| Package | Anaconda main | conda-forge |
| --- | --- | --- |
| `certifi` | `2026.10.19` or newer | `2026.10.19` or newer |
| `ca-certificates` | `2026.10.20` or newer | `2026.10.19` or newer |

See the [certifi release](https://github.com/certifi/python-certifi/releases/tag/2026.10.19) and the published CA packages for [Anaconda main](https://repo.anaconda.com/pkgs/main/linux-64/ca-certificates-2026.10.20-h06a4308_0.conda) and [conda-forge](https://conda.anaconda.org/conda-forge/noarch/ca-certificates-2026.10.19-hbd8a1cb_0.conda).

### Mamba

For a conda-forge installation, update `mamba`, its native `libmamba` library, and `ca-certificates` together:

```console
mamba install --name base --override-channels --channel conda-forge mamba libmamba "ca-certificates>=2026.10.19"
```

Replace `base` with the environment where mamba is installed. Include `libmambapy` if present to keep the Python bindings and native library compatible. For mamba 1.x, also include `"certifi>=2026.10.19"` because it uses Python HTTPS clients.

The [conda-forge mamba and libmamba rebuilds](https://github.com/conda-forge/mamba-feedstock/pull/403) add the CA minimum without changing the package version. Check both the version and build with `conda list`. The explicit CA minimum above also protects older mamba builds.

Anaconda main provides `libmamba` and `libmambapy` for conda's solver, but does not provide the `mamba` command. Follow the [conda-libmamba-solver instructions](#conda-libmamba-solver-and-conda-pypi) for those packages.

### Pixi 0.82.1

[Pixi 0.82.1](https://github.com/prefix-dev/pixi/releases/tag/v0.82.1) is available on Anaconda main and conda-forge. It addresses the incident by updating `webpki-root-certs` to 1.0.10 and `rustls-webpki` to 0.103.16.

If you used Pixi's installer, follow its [update instructions](https://pixi.prefix.dev/latest/installation/#update) on Windows, macOS, or Linux:

```console
pixi self-update
pixi --version
```

To install this exact release, use [`pixi self-update --version 0.82.1`](https://pixi.prefix.dev/latest/reference/cli/pixi/self-update/).

If you used a package manager, update Pixi through it. For example, use `brew upgrade pixi` for Homebrew. For Pixi installed from conda-forge in an environment named `my-pixi-env`:

```console
conda update --name my-pixi-env --channel conda-forge pixi
```

Replace `my-pixi-env` and `conda-forge` with the environment and channel you used to install Pixi, such as `defaults` for Anaconda main.

Run `pixi --version` in your usual shell and confirm it reports 0.82.1 or newer. Update other installed copies separately.

Standalone Pixi binaries bundle their own CA roots, so update Pixi itself. Package-manager builds may use the system or environment CA store. Update that store as needed, following the [CA instructions below](#updating-an-older-conda-installation).

## Update CA packages separately {#updating-an-older-conda-installation}

Use the command for your distribution. To keep a specific conda version, add `conda=<your-version>` to the command.

For Anaconda or Miniconda using Anaconda main:

```bash
conda install --name base --override-channels --channel defaults "certifi>=2026.10.19" "ca-certificates>=2026.10.20"
```

For Miniforge or other conda-forge installations:

```bash
conda install --name base --override-channels --channel conda-forge "certifi>=2026.10.19" "ca-certificates>=2026.10.19"
```

The updated `certifi` packages require Python 3.10 or newer on Anaconda main and 3.11 or newer on conda-forge. If Python or package pins block the update, use a supported Python version or a current installer. Keep certificate verification enabled.

Anaconda main has no corrected CA packages for the retired `osx-64`, `linux-ppc64le`, and `linux-s390x` platforms. Use a distribution with corrected CA packages for your platform, or move to a supported platform.

Repeat the CA update in every environment that runs HTTPS clients, replacing `base` with its name. Update custom CA files and the OS trust store separately if selected by `ssl_verify`, `REQUESTS_CA_BUNDLE`, `CURL_CA_BUNDLE`, `SSL_CERT_FILE`, or `SSL_CERT_DIR`. Pip vendors its own CA bundle and needs a separate update.

## conda-libmamba-solver and conda-pypi

`conda-libmamba-solver` uses Python and native HTTPS clients, so update both CA packages. Request the solver, Python bindings, and native library together so conda can select compatible versions and builds.

For Anaconda main:

```console
conda install --name base --override-channels --channel defaults conda-libmamba-solver libmambapy libmamba "certifi>=2026.10.19" "ca-certificates>=2026.10.20"
```

For conda-forge:

```console
conda install --name base --override-channels --channel conda-forge conda-libmamba-solver libmambapy libmamba "certifi>=2026.10.19" "ca-certificates>=2026.10.19"
```

Solver rebuilds on [Anaconda main](https://github.com/AnacondaRecipes/conda-libmamba-solver-feedstock/pull/41) and [conda-forge](https://github.com/conda-forge/conda-libmamba-solver-feedstock/pull/59) add the CA minimums to their metadata. The [Anaconda main libmamba rebuild](https://github.com/AnacondaRecipes/mamba-feedstock/pull/33) adds the corresponding `ca-certificates` minimum. Check the build as well as the library version to identify a corrected package.

Repodata hotfixes are live on [Anaconda main](https://github.com/AnacondaRecipes/repodata-hotfixes/pull/353) and [conda-forge](https://github.com/conda-forge/conda-forge-repodata-patches-feedstock/pull/1289). They add CA constraints to covered older builds. The constraints apply when a solve selects those builds using updated channel metadata. Hotfixes do not update installed packages, and installs that bypass solving can bypass the constraints. Use the explicit CA minimums above when updating an existing installation.

If you use `conda-pypi`, include it in the same update command. Unearth's default HTTPX client handles package discovery using certifi's CA bundle, so the plugin needs updated `certifi` in the environment that runs conda. Version 0.13.0 build 1 on [Anaconda main](https://github.com/AnacondaRecipes/conda-pypi-feedstock/pull/20) and [conda-forge](https://github.com/conda-forge/conda-pypi-feedstock/pull/74) sets this minimum. So does [conda-pypi 0.13.1 on PyPI](https://pypi.org/project/conda-pypi/0.13.1/).

## Check the package contents

These OpenSSL 3 commands inspect the CA bundles from either channel. They work in Command Prompt, PowerShell, and POSIX shells.

Check the installed versions and channels, then locate the base installation and certifi's bundle:

```console
conda list --name base --show-channel-urls "^(conda|conda-libmamba-solver|libmambapy|libmamba|mamba|conda-pypi|certifi|ca-certificates)$"
conda info --base
conda run --name base python -m certifi
conda run --name base openssl version
```

Find the `ca-certificates` bundle under the base directory printed by `conda info --base`:

| Platform | Bundle location within base |
| --- | --- |
| Windows | `Library/ssl/cacert.pem` |
| macOS or Linux | `ssl/cacert.pem` |

Download the disclosure's [12 test chains](https://emudhra.we-have-a-problem.com/chains.zip) and extract them into the current directory:

```console
conda run --name base python -m zipfile -e chains.zip .
```

Replace `<bundle.pem>` with the full path to an installed bundle, keeping the double quotes. These examples check the eMudhra and Sectigo cross-signed chains:

```console
conda run --name base openssl verify -show_chain -no-CApath -no-CAstore -CAfile "<bundle.pem>" -untrusted "chains/dv-g3b-emudhra.we-have-a-problem.com.pem" "chains/dv-g3b-emudhra.we-have-a-problem.com.pem"
conda run --name base openssl verify -show_chain -no-CApath -no-CAstore -CAfile "<bundle.pem>" -untrusted "chains/dv-g3b-aaa-emudhra.we-have-a-problem.com.pem" "chains/dv-g3b-aaa-emudhra.we-have-a-problem.com.pem"
```

Repeat the checks for every `.pem` file in the extracted `chains` directory, using certifi's bundle and then the `ca-certificates` bundle. Expect an `unable to get local issuer certificate` error. `OK` means the bundle still trusts that compromised chain. Investigate other errors. The checks run offline without contacting the test hosts.

If base has OpenSSL older than 3, create a checking environment with `conda create --name ca-audit "openssl>=3"` and use `--name ca-audit` for the OpenSSL commands. Keep using the bundle paths from the installation you are checking.

To inspect packages before installing them, download `certifi` and `ca-certificates` for your platform from [Anaconda main](https://repo.anaconda.com/pkgs/main/) or [conda-forge](https://conda.anaconda.org/conda-forge/). Extract each into a separate directory:

```bash
conda run --name base cph x "<package.conda>" --dest "<inspection-directory>"
```

Run the offline chain checks with the extracted PEM files. Check both packages from every channel you use or distribute.
