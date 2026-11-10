---
sidebar_position: 15
---

# Virtual packages

Virtual packages are used to expose details of the system configuration to a conda client. They are commonly used as dependencies in regular packages to constrain on which systems they can be installed. Some examples include:

* On Linux, the minimum GNU `libc` version that must be available in the system via the `__glibc` virtual package.
* The oldest macOS version compatible with the package via the `__osx` virtual package.
* Whether a `noarch` package should be constrained to a single operating system via the `__linux`, `__osx` or `__win` virtual packages (often with no version constraint).
* The minimum CPU microarchitecture level that the binaries require via the `__archspec` virtual package.
* The latest CUDA version compatible with the GPU driver via `__cuda`.

## Specification

A virtual package is defined as a package record with three fields: name, version and build string.
These fields MUST comply with [CEP 26](/learn/ceps/cep-0026/). More specifically, the version field MUST follow the version string specifications as discussed in [CEP 33](/learn/ceps/cep-0033/), regardless of its origin (computed from a system property, overridden by the user or configuration, or provided by default by the tool).

Some general considerations:

* A virtual package name MUST start with double underscore (`__`).
* The version or build string of a virtual package MAY be overridden by the value of the `CONDA_OVERRIDE_{NAME}` environment variable, with `{NAME}` being the uppercased name of the virtual package (excluding the leading underscores). Many exceptions apply, so please observe the details in the section below.
* The build string SHOULD be zero (`0`). Some exceptions apply. See below.

### Required virtual packages

In alphabetical order, every conda client MUST support the following virtual packages:

* `__archspec`
* `__cuda`
* `__glibc`
* `__linux`
* `__osx`
* `__unix`
* `__win`

#### `__archspec`

This virtual package MUST always be present.

The build string MUST reflect either:

* A fitting CPU microarchitecture in the [`archspec/archspec-json` database](https://github.com/archspec/archspec-json/blob/v0.2.5/cpu/microarchitectures.json). In this case, the version number MUST be `1`.
* The second component of the target platform string as is. In this case, the version number MUST be `0`.

The build string MUST be overridable with the `CONDA_OVERRIDE_ARCHSPEC` environment variable, if set to a non-empty value that can be parsed as a build string. The version in this case MUST be `1`.

When depending on `__archspec`, the version field MUST NOT be populated (i.e. it MUST be `*`).

#### `__cuda`

This virtual package MUST be present when the system exhibits NVIDIA GPU drivers compatible with the CUDA runtimes. For systems without such support, the virtual package MUST NOT be present.

When available, the version value MUST be set to the latest CUDA version supported by the detected drivers (i.e. the formatted value of [`cuDriverGetVersion()`](https://docs.nvidia.com/cuda/cuda-driver-api/group__CUDA__VERSION.html)), constrained to the first two components (major and minor) and formatted as `{major}.{minor}`.

The build string MUST be `0`.

If the `CONDA_OVERRIDE_CUDA` environment variable is set to a non-empty value that can be parsed as a version string, the `__cuda` virtual package MUST be exposed with that version.

#### `__cuda_arch`

#### `__glibc`

This virtual package MUST NOT be present if the target platform is not `linux-*`.

This virtual package MUST be present when the native and target platforms are both the same type of `linux-*` and GNU `libc` is installed in the system. The version value MUST be set to the system GNU `libc` version, constrained to the first two components (major and minor) formatted as `{major}.{minor}`. If the version cannot be estimated, the tool MUST set the version to a default value (e.g. `2.17`) of its choice.

If the native platform does not match the target platform, the tool MAY export `__glibc` with its `version` field set to a default value (e.g. `2.17`) of its choice.

If the `CONDA_OVERRIDE_GLIBC` environment variable is set to a non-empty value that complies with the version string specification and the target platform is `linux-*`, the tool MUST export `__glibc` with its version value set to the value of the environment variable.

The build string MUST always be `0`.

> The GNU `libc` version can be computed via:
>
> * Python's `os.confstr("CS_GNU_LIBC_VERSION")`
> * `getconf GNU_LIBC_VERSION`
> * `ldd --version`. Please verify that it references GNU `libc` or GLIBC. For non-standard installs using a GLIBC compatibility layer, this may require locating the implementation and directly querying.
> * Dynamically load the `gnu_get_libc_version` symbol from `libc.so.6`.

#### `__linux`

This virtual package MUST be present when the target platform is `linux-*`. Its version value MUST be set to the upstream (mainline) Linux kernel version, but it MUST exclude any and all [distribution-specific components](https://www.kernel.org/releases.html#distribution-kernels) of the kernel version. If the version cannot be estimated (e.g. because the native platform is not Linux), the tool MUST set `version` to a fallback value of its choice. The build string MUST be `0`.

The version MUST be overridable with the `CONDA_OVERRIDE_LINUX` environment variable, if set to a non-empty value that matches the regex `"[0-9]+\.[0-9]+(\.[0-9]+)?(\.[0-9]+)?"`. The environment variable MUST be ignored when the target platform is not `linux-*`.

> The Linux kernel version can be obtained via:
>
> * Python's `platform.release()`
> * `uname -r`
> * `cat /proc/version`

#### `__osx`

This virtual package MUST be present when the target platform is `osx-*`. Its version value MUST be set to the first two numeric components of the macOS version formatted as `{major}.{minor}`. If applicable, the `SYSTEM_VERSION_COMPAT` environment variable workaround MUST NOT be enabled; e.g. the version reported for Big Sur must be 11.x and not 10.16.

If the version cannot be estimated (e.g. because the native platform is not macOS), the fallback value MUST be set to `0`. The build string MUST be `0`.

The version MUST be overridable with the `CONDA_OVERRIDE_OSX` environment variable if set to a non-empty value that can be parsed as a version string. The environment variable MUST be ignored when the target platform is not `osx-*`.

> The macOS version can be obtained via:
>
> * Python's `platform.mac_ver()[0]`
> * `SYSTEM_VERSION_COMPAT=0 sw_vers -productVersion`

#### `__unix`

This virtual package MUST be present when the target platform is `linux-*`, `osx-*`, `freebsd-*`, or `emscripten-*`. It SHOULD be present for any other sufficiently POSIX-y platforms (e.g. using `/` as path delimiters, supporting `fork(3)`, etc.). The version and build string fields MUST be set to `0`.

The `CONDA_OVERRIDE_UNIX` environment variable MUST NOT have any effect.

#### `__win`

This virtual package MUST be present when the target platform is `win-*`. The version MUST be set to the first three numeric components of the Windows build version, formatted as `{major}.{minor}.{micro}`. If the version cannot be estimated (e.g. because the target platform does not match the native platform), the tool MUST set the version to a default value of its choice.

The version MUST be overridable with the `CONDA_OVERRIDE_WIN` environment variable if set to a non-empty value that can be parsed as a version string. The environment variable MUST be ignored when the target platform is not `win-*`.

The build string MUST be `0`.

> The version string `{major}.{minor}.{micro}` can be obtained from:
>
> * Python's `platform.win32_ver()`
> * CMD's `ver`
> * PowerShell's `[System.Environment]::OSVersion.Version` or `(Get-CimInstance Win32_OperatingSystem).version`
> * The command `wmic os get version`
> * The [`RtlGetVersion`](https://learn.microsoft.com/en-us/windows-hardware/drivers/ddi/wdm/nf-wdm-rtlgetversion) Kernel Function
> * The [`GetVersionExW`](https://learn.microsoft.com/en-us/windows/win32/api/sysinfoapi/nf-sysinfoapi-getversionexw) Win32 API
>
> Note that `{micro}` here refers to what Microsoft calls the "build" version component, not to be mistaken with the `build` string of the virtual package.


### Recommended virtual packages

Additionally, the following virtual packages SHOULD be supported:

* `__cuda_arch`

#### `__cuda_arch`

If a conda-compatible client chooses to implement the `__cuda_arch` virtual package, it MUST follow these specifications:

The `__cuda_arch` virtual package MUST be absent when the `__cuda` virtual package is
absent.

When present, the version value MUST be set to the lowest compute capability of all CUDA
devices detected on the system, formatted as `{major}.{minor}`; subarchitecture letters
(e.g. `a`, `f`) are excluded. The build string MUST be `0`.

The `__cuda_arch` virtual package MUST be present when a CUDA device is detected EXCEPT when
`CONDA_OVERRIDE_CUDA_ARCH` is set as described below.

For systems without CUDA devices (e.g. a driver is installed but no devices are present),
the virtual package MUST be absent EXCEPT when `CONDA_OVERRIDE_CUDA_ARCH` is set as
described below.

If the `CONDA_OVERRIDE_CUDA_ARCH` environment variable is set to a non-empty value that can
be parsed as a compute capability string, the `__cuda_arch` virtual package MUST be exposed
with that version with the build string set to `0` EXCEPT when the `__cuda` virtual package
is absent as described above.

If the `CONDA_OVERRIDE_CUDA_ARCH` environment variable is set to the empty string, the
`__cuda_arch` virtual package MUST be absent.

## History

- 2026-05-20: `__cuda_arch` is recognized as a recommended virtual package by [CEP 46](/learn/ceps/cep-0046/).
- 2026-03-04: Required virtual packages are standardized by [CEP 30](/learn/ceps/cep-0030/).
