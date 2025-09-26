# Specifications

This section aggregates all the _currently relevant_ interoperability specifications available in the conda ecosystem.

:::note
The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in the documents below are to be interpreted as described in [RFC2119](https://www.ietf.org/rfc/rfc2119.txt) when, and only when, they appear in all capitals, as shown here.

More specifically, violations of a MUST or MUST NOT rule MUST result in an error. Violations of the rules specified by any of the other all-capital terms MAY result in a warning, at discretion of the implementation.
:::


## Package Distribution Metadata

- [Names and package identifiers](./specifications/distribution/package-identifiers.md)
- [Versioning](./specifications/distribution/version.md)
- [Dependency specifiers](./specifications/distribution/dependency-specifiers.md)
- [The `info/` folder](./specifications/distribution/info.md)
- [File formats: `.tar.bz2` and `.conda`](./specifications/distribution/file-formats.md)

## Channels

- [Channel identifiers](./specifications/channels/channel-identifiers.md)
- [The channel interface](./specifications/channels/channel-interface.md)
- [Repodata](./specifications/channels/repodata.md)
- [Attestation and signing](./specifications/channels/package-signing.md)

## Package Installation Metadata

- [The conda environment structure](./specifications/installation/environments.md)
- [Recording installed packages](./specifications/installation/installed-records.md)
- [The `Menu/` folder](./specifications/installation/menu.md)

## Package Building

- [The `meta.yaml` file format](./specifications/building/meta-yaml.md)
- [The `recipe.yaml` file format](./specifications/building/recipe-yaml.md)

## Environment Sharing

- [Text spec input files](./specifications/exchange/text-spec.md)
- [`environment.yml` files](./specifications/exchange/environment-yml.md)
- [Lockfiles](./specifications/exchange/lockfiles.md)
