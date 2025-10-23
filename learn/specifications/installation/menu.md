---
sidebar_position: 30
---

# Processing `Menu/*.json` items

:::info
Refer to [The `Menu/` directory](../packages/menu.md) for more details on these documents. This page details how they must be processed at install time.
:::

## Linking

conda clients MUST process matching `Menu/*.json` documents. Placeholders MUST be rendered as indicated in [the `Menu/` directory specification](../packages/menu.md).

Each platform MUST place the menu artifacts in these target locations:

Operating system | Artifact type | User location | System location | Notes
-----------------|---------------|---------------|-----------------|-------
Linux            | `.desktop` file   | `~/.local/share/applications` | `/usr/local/share/applications` | Some other user files are modified
macOS            | `.app` directory | `~/Applications` | `/Applications` | <br>
Windows          | `.lnk` file | `{{ menu_name }}` directory inside Start Menu, Desktop, and/or Quick Launch | Start Menu | These locations are customizable and configured in the Windows registry.

- On Linux, little needs to be done because XDG delegates the responsibility to the desktop
  manager. The implementer only needs to create the `.desktop` file and adjust/add the menu XML
  file(s).
- On macOS, the shortcut is actually an `.app` directory. Implementers must follow Apple's guidelines.
- On Windows, `.lnk` files are created with the Windows API. File type and URL protocol association
  is done in the [Windows
  registry](https://learn.microsoft.com/en-us/windows/win32/shell/fa-file-types).

## Unlinking

When a package is removed, the file artifacts MUST be deleted too. If changes were done in other
resources (XML files on Linux, Registry on Windows), these MUST be undone too.

## History

- 2023-07-28: `Menu/*.json` document processing was first standardized by [CEP 11](https://github.com/conda/ceps/blob/main/cep-0011.md).
