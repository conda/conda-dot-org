---
title: Update conda and Pixi after the eMudhra certificate compromise
slug: 2026-10-21-emudhra-security-updates
authors: [jezdez]
tags: [announcement, conda, pixi, security]
description: Update your CA packages, check their certificate contents, and prepare for conda 26.9.4 and Pixi 0.82.1.
draft: true
---

<!-- Before publication: verify the conda 26.9.4 release and conda/Pixi package
availability on Anaconda main and conda-forge for the supported platforms.
Then update the availability wording below, move this post into blog/, and
remove draft: true. -->

## What happened?

HTTPS certificates help your package manager check that it is talking to the right server. Researchers found that eight intermediate certificates issued by eMudhra had recoverable private keys. Someone with those keys could impersonate websites and services.

Browsers have blocked the affected certificates, but developer tools often use their own lists of trusted certificate authorities, or CAs. Those lists need updating too. Whether attackers used this weakness against non-browser clients is unknown. The [incident report](https://emudhra.we-have-a-problem.com/) explains the compromise and the response.

<!-- truncate -->

## Conda 26.9.4

We are preparing conda 26.9.4 for Anaconda's main channel and conda-forge. It will enforce minimum versions of the CA packages needed for this incident. Follow the [release ticket](https://github.com/conda/conda/issues/16880) for publication status.

Once the release is available in your configured channels, update with:

```bash
conda install --name base conda=26.9.4
```

The corrected CA packages are already available:

| Package | Anaconda main | conda-forge |
| --- | --- | --- |
| `certifi` | `2026.10.19` or newer | `2026.10.19` or newer |
| `ca-certificates` | `2026.10.20` or newer | `2026.10.19` or newer |

See the [certifi release](https://github.com/certifi/python-certifi/releases/tag/2026.10.19) and the published CA packages for [Anaconda main](https://repo.anaconda.com/pkgs/main/linux-64/ca-certificates-2026.10.20-h06a4308_0.conda) and [conda-forge](https://conda.anaconda.org/conda-forge/noarch/ca-certificates-2026.10.19-hbd8a1cb_0.conda).

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

If you must keep a particular conda version, add `conda=<your-version>` to the command. Older Python versions or package pins may prevent the update. In that case, move to a supported Python version or a current installer. Keep certificate verification enabled.

Updating base does not update every environment. Repeat the CA update for environments that run HTTPS clients, replacing `base` with the environment name. Update custom CA files and the OS trust store separately if your `ssl_verify` setting or `REQUESTS_CA_BUNDLE`, `CURL_CA_BUNDLE`, or `SSL_CERT_FILE` selects them. Pip also has its own vendored CA bundle and needs a separate update.

## Check the package contents

The following commands use the same syntax in Command Prompt, PowerShell, and POSIX shells. They inspect the actual CA bundles from either channel using OpenSSL 3.

First, check the installed versions and channels, find the base installation, and locate certifi's bundle:

```console
conda list --name base --show-channel-urls "^(conda|certifi|ca-certificates)$"
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

## Pixi 0.82.1

[Pixi 0.82.1](https://github.com/prefix-dev/pixi/releases/tag/v0.82.1) is released upstream and includes fixes for the same incident. It updates `webpki-root-certs` to 1.0.10 and `rustls-webpki` to 0.103.16. Existing Pixi users should upgrade.

Anaconda main and conda-forge package availability still needs verification before this announcement is published. Once 0.82.1 is available for your platform, update a conda-installed Pixi from the channel you already use:

```bash
conda install --name base --override-channels --channel defaults "pixi>=0.82.1"
# Or, for a conda-forge installation:
conda install --name base --override-channels --channel conda-forge "pixi>=0.82.1"
```

Check `pixi --version` in the shell you normally use, and update other installed copies separately. Updating `certifi` and `ca-certificates` does not replace the roots compiled into an older Pixi executable.
