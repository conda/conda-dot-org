---
sidebar_position: 20
---
# The `Menu/` directory

JSON documents found in `$PREFIX/Menu/*.json` are meant to be processed as `menuinst` input files, which are responsible for creating menu items / desktop shortcuts in their target desktop environment. Refer to [Processing `Menu/*.json` items at install time](../installation/menu.md) for more details.

There are two known versions of these documents:

- `menuinst 1.x`: not standardized, only really used in Windows.
- `menuinst 2.x`: standardized by CEP 11, multiplatform.

## Location and content rules

conda packages that wish to create a shortcut at install time MUST provide a JSON file such that:

- The JSON contents MUST pass schema validation (for `menuinst 2.x`).
- The JSON file MUST be placed under `$PREFIX/Menu`.
- The JSON filename MUST be `<package-name>.json`.

Note that packaging tools (e.g. `conda-build`) MUST check the above conditions are met when the package is  being created.

## menuinst 1.x

The required metadata for each platform is documented in [the `menuinst` wiki][wiki]. However, only
Windows is really supported by the tool. This asymmetrical growth has allowed Windows to grow an
ad-hoc specification that doesn't really translate well to other platforms.

The overall schema seems to be:

```python
{
  "menu_name": str,
  "menu_items": list of dict,
}
```

Unfortunately, each menu item dict (let's call it `MenuItem`) takes a different form in each
platform.

### `MenuItem` on Windows

```python
{
  ["system" | "script" | "pyscript" | "pywscript" | "webbrowser"]: str,
  "scriptargument": str,
  "scriptarguments": list of str,
  "name": str,
  "workdir": str,
  "icon": str,
  "desktop": bool,
  "quicklaunch": bool,
}
```

Currently allowed placeholders are:

- `${PREFIX}`: Python environment prefix
- `${ROOT_PREFIX}`: Python environment prefix of root (conda or otherwise) installation
- `${PYTHON_SCRIPTS}`: Scripts folder in Python environment, `${PREFIX}/Scripts`
- `${MENU_DIR}`: Folder for menu config and icon files, `${PREFIX}/Menu`
- `${PERSONALDIR}`: Not sure
- `${USERPROFILE}`: User's home folder
- `${ENV_NAME}`: The environment in which this shortcut lives.
- `${DISTRIBUTION_NAME}`: The name of the folder of the root prefix, for example "Miniconda" if
  distribution installed at "C:\Users\Miniconda".
- `${PY_VER}`: The Python major version only. This is taken from the root prefix. Used generally
  for placing shortcuts under a menu of a parent installation.
- `${PLATFORM}`: one of (32-bit) or (64-bit). This is taken from the root prefix. Used generally
  for placing shortcuts under a menu of a parent installation.

### `MenuItem` on MacOS

```python
{
    "cmd": str,
    "name": str,
    "icns": str,
}
```

Currently allowed placeholders are:

- `${BIN_DIR}`: `PREFIX/bin`
- `${MENU_DIR}`: `PREFIX/Menu`

### `MenuItem` on Linux

```python
{
    "cmd": list of str,
    "id": str,
    "name": str,
    "comment": str.
    "terminal": bool,
    "icon": str,
},
```

On Linux, only `cmd` can take two special placeholders `{{FILEBROWSER}}` and `{{WEBBROWSER}}`,
which are replaced by the default Desktop file explorer, and the default web browser, respectively.

## menuinst 2.x

The full JSON schema is defined in [this document][menuinst-json-schema], but here you can see a
simplified overview of all possible keys and their default values:

```python
{
  "$id": "https://schemas.conda.io/menuinst-1.schema.json",
  "$schema": "https://json-schema.org/draft-07/schema",
  "menu_name": "REQUIRED",
  "menu_items": [
    {
      "name": "REQUIRED",
      "description": "REQUIRED",
      "command": [
        "REQUIRED",
      ],
      "icon": None, # path to ico / png / icns file
      "precreate": None, # command to run before the shortcut is created
      "precommand": None, # command to run before activation and 'command'
      "working_dir": None, # starting working location for the process
      "activate": true,  # activate conda environment before running 'command'
      "terminal": false, # open in terminal and leave it open
      "platforms": {
        # To create the menu item for a fiven platform, the key must be present in this
        # dictionary. Presence is enough; the value can just be the empty dictionary: {}.
        "linux": {
          # See XDG Desktop standard for details
          # https://specifications.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html#recognized-keys
          "Categories": None,
          "DBusActivatable": None,
          "GenericName": None,
          "Hidden": None,
          "Implements": None,
          "Keywords": None,
          "MimeType": None,
          "NoDisplay": None,
          "NotShowIn": None,
          "OnlyShowIn": None,
          "PrefersNonDefaultGPU": None,
          "StartupNotify": None,
          "StartupWMClass": None,
          "TryExec": None,
          #: Map of custom MIME types to their corresponding glob patterns (e.g. ``*.txt``).
          "glob_patterns": None
        },
        "osx": {
          # See Apple docs for CF* and LS* variables
          # CF*: https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html
          # LS*: https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html
          "CFBundleDisplayName": None,
          "CFBundleIdentifier": None,
          "CFBundleName": None,
          "CFBundleSpokenName": None,
          "CFBundleVersion": None,
          "CFBundleURLTypes": None,
          "CFBundleDocumentTypes": None,
          "LSApplicationCategoryType": None,
          "LSBackgroundOnly": None,
          "LSEnvironment": None,
          "LSMinimumSystemVersion": None,
          "LSMultipleInstancesProhibited": None,
          "LSRequiresNativeExecution": None,
          "UTExportedTypeDeclarations": None,
          "UTImportedTypeDeclarations": None,
          #: list of permissions to request for the app
          #: see https://developer.apple.com/documentation/bundleresources/entitlements
          "entitlements": None,
          #: symlink a file (usually the executable in 'command') into the .app directory
          "link_in_bundle": None,
          #: shell logic that will run when an Apple event is received
          "event_handler": None,
        },
        "win": {
          "desktop": true, # create desktop location
          "quicklaunch": true, # create quick launch shortcut too
          "file_extensions": None, # file extensions to associate with shortcut in registry
          "url_protocols": None, # URI protocols to associate with shortcut in registry
          "app_user_model_id": None, # Identifier used to associate processes with a taskbar icon
        }
      }
    }
  ]
}
```

Note that each `platforms` sub-dictionary (`linux`, `macos`, `win`) can override the global values
of their `menu_items[*]` entry (e.g. redefining `command` to adjust the shell syntax).

Each JSON file MUST be validated against its `$id` schema at build time; e.g in `conda-build`.

### Placeholders

Each platform MUST provide these placeholders, to be used in the value of any `str`-accepting key.
To be replaced, they MUST be wrapped in double curly braces: `{{ NAME }}`.

Placeholder | Value
------------|-------
`BASE_PREFIX` | Path to the base Python location. In `conda` terms, this is the `base` environment
`DISTRIBUTION_NAME` | Name of the base prefix directory; e.g. if `BASE_PREFIX` is `/opt/my-project`, this is `my-project`.
`PREFIX` | Path to the target Python location. In `conda` terms, this is the path to the environment that contains the JSON file for this menu item. In some cases, it might be the same as `BASE_PREFIX`.
`ENV_NAME` | Same as `DISTRIBUTION_NAME`, but for `PREFIX`.
`PYTHON` | Path to the `python` executable in `PREFIX`.
`BASE_PYTHON` | Path to the `python` executable in `BASE_PREFIX`.
`MENU_DIR` | Path to the `Menu` directory in `PREFIX`.
`MENU_ITEM_LOCATION` | Path to the main menu item artifact once installed. On Linux, this is the path to the `.desktop` file, on macOS it is the path to the `.app` directory, and on Windows it is the path to the Start Menu `.lnk` file.
`BIN_DIR` | Path to the `bin` (Unix) or `Library/bin` (Windows) directories in `PREFIX`.
`PY_VER` | Python `major.minor` version in `PREFIX`.
`SP_DIR` | Path to Python's `site-packages` directory in `PREFIX`.
`HOME` | Path to the user directory (`~`).
`ICON_EXT` | Extension of the icon file expected by each platform. `png` in Linux, `icns` in macOS, and `ico` in Windows. Note the dot is _not_ included.
**macOS-only** | <br>
`PYTHONAPP` | Path to the `python` executable installed in `PREFIX`, assuming the `python.app` conda package is installed. Equivalent to `{{ PREFIX }}/python.app/Contents/MacOS/python`.
**Windows-only** | <br>
`SCRIPTS_DIR` | Path to the `Scripts` directory in `PREFIX`.
`BASE_PYTHONW` | Path to the `pythonw.exe` executable in `BASE_PREFIX`.
`PYTHONW` | Path to the `pythonw.exe` executable in `PREFIX`.


## History

- 2023-07-28: `Menu/*.json` documents were first standardized by [CEP 11](https://github.com/conda/ceps/blob/main/cep-0011.md).

<!-- links -->

[menuinst-json-schema]: https://schemas.conda.org/menuinst/menuinst-1-1-0.schema.json

[wiki]:
    https://github.com/conda/menuinst/wiki/Menu-Shortcut-Config-Structure/632fbc84251c8a8093e1b56b0b5314d23c1e946b
