# Specifications

This section aggregates all the _currently relevant_ interoperability specifications available in the conda ecosystem.

:::note
The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in the documents below are to be interpreted as described in [RFC2119](https://www.ietf.org/rfc/rfc2119.txt) when, and only when, they appear in all capitals, as shown here.

More specifically, violations of a MUST or MUST NOT rule MUST result in an error. Violations of the rules specified by any of the other all-capital terms MAY result in a warning, at discretion of the implementation.
:::

:::info
This section is a work in progress. These codes can be used to identify status:

- _(status: pending)_: Pending standardization (no CEP available yet)
- _(status: in progress)_: Standardization in progress (CEP being written / discussed)
- _(status: ready)_: Standardization finished, ready to be summarized here (CEP approved)
- _(status: done)_: Section standardized and written.

:::

## Package Distribution Metadata

- [Names and package identifiers](./specifications/distribution/package-identifiers.md) _(status: ready)_
- [Versioning](./specifications/distribution/versioning.md) _(status: in progress)_
- [Dependency specifiers](./specifications/distribution/dependency-specifiers.md) _(status: in progress)_

## Distributable and virtual packages

- Distributable packages:
  - [Overview of contents](./specifications/packages/contents.md) _(status: pending)_
  - [The `info/` folder](./specifications/packages/info.md) _(status: pending)_
  - [The `Menu/` directory](./specifications/packages/menu.md) _(status: ready)_
  - [File formats: `.tar.bz2` and `.conda`](./specifications/packages/file-formats.md) _(status: pending)_
- [Virtual packages](./specifications/virtual-packages.md) _(status: in progress)_

## Channels

- [Channel identifiers](./specifications/channels/channel-identifiers.md) _(status: ready)_
- [The channel interface](./specifications/channels/channel-interface.md) _(status: pending)_
- [Repodata](./specifications/channels/repodata.md) _(status: pending)_
- [Repodata patches](./specifications/channels/repodata-patches.md) _(status: pending)_
- [`channeldata.json`](./specifications/channels/channeldata.md) _(status: pending)_
- [Attestation and signing](./specifications/channels/package-signing.md) _(status: ready)_

## Package Installation Metadata

- [The conda environment structure](./specifications/installation/environments.md) _(status: in progress)_
- [Recording installed packages](./specifications/installation/installed-records.md) _(status: in progress)_
- [Processing `Menu/*.json` items](./specifications/installation/menu.md) _(status: ready)_

## Package Building

- [The `meta.yaml` file format](./specifications/recipes/meta-yaml.md) _(status: pending)_
- [The `recipe.yaml` file format](./specifications/recipes/recipe-yaml.md) _(status: ready)_

## Environment Sharing

- [Text spec input files](./specifications/exchange/text-spec.md) _(status: ready)_
- [`environment.yml` files](./specifications/exchange/environment-yml.md) _(status: ready)_
- [Lockfiles](./specifications/exchange/lockfiles.md) _(status: pending)_
