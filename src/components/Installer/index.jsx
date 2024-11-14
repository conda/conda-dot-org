import React, { useState } from "react";
import styles from "./styles.module.css";

export default function CondaInstallerSelector() {
  const [os, setOs] = useState("");
  const [arch, setArch] = useState("");
  const [installerType, setInstallerType] = useState("");

  const osArchitectures = {
    Linux: ["x64", "aarch64", "ppc64le"],
    macOS: ["x64", "ARM64"],
    Windows: ["x64", "ARM64 (Beta)"],
  };

  const installerData = {
    Anaconda: {
      name: "Anaconda",
      url: "https://docs.anaconda.com/anaconda/install/index.html",
      defaultChannel: "defaults",
      description: "Complete distribution for scientific Python development",
    },
    Miniconda: {
      name: "Miniconda",
      url: "https://docs.anaconda.com/miniconda/index.html",
      defaultChannel: "defaults",
      description: "Minimal installation of Anaconda Distribution",
    },
    Miniforge: {
      name: "Miniforge",
      url: "https://github.com/conda-forge/miniforge",
      defaultChannel: "conda-forge",
      description: "Community-driven minimal installer using conda-forge",
    },
    Mambaforge: {
      name: "Mambaforge",
      url: "https://github.com/conda-forge/miniforge#mambaforge",
      defaultChannel: "conda-forge",
      description: "Miniforge variant with mamba as default package manager",
    },
    Micromamba: {
      name: "Micromamba",
      url: "https://mamba.readthedocs.io/en/latest/installation.html#micromamba",
      defaultChannel: "conda-forge",
      description: "Standalone fast package manager (no conda required)",
      isStandalone: true,
    },
    Pixi: {
      name: "Pixi",
      url: "https://prefix.dev/docs/pixi/installation",
      defaultChannel: "conda-forge",
      description: "Modern package management solution for Python, C++, and R",
      isStandalone: true,
    },
  };

  const getInstallerDetails = () => {
    if (!os || !installerType) {
      return null;
    }
    return installerData[installerType];
  };

  const installerDetails = getInstallerDetails();

  return (
    <div className={styles.container}>
      <div className={styles.selector_wrapper}>
        <h2 className={styles.title}>Conda Installer Selector</h2>
        <p className={styles.description}>
          Choose your operating system, architecture, and installer type
        </p>

        <div className={styles.form_group}>
          <div>
            <label htmlFor="os-select" className={styles.label}>
              {" "}
              Operating System
            </label>
            <select
              id="os-select"
              value={os}
              onChange={(e) => {
                setOs(e.target.value);
                setArch("");
              }}
              className={styles.select}
            >
              <option value="">Select Operating System</option>
              {Object.keys(osArchitectures).map((osName) => (
                <option key={osName} value={osName}>
                  {osName}
                </option>
              ))}
            </select>
          </div>

          {os && (
            <div>
              <label htmlFor="arch-select" className={styles.label}>
                {" "}
                Architecture
              </label>
              <select
                id="arch-select"
                value={arch}
                onChange={(e) => setArch(e.target.value)}
                className={styles.select}
              >
                <option value="">Select Architecture</option>
                {osArchitectures[os].map((archOption) => (
                  <option key={archOption} value={archOption}>
                    {archOption}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="installer-select" className={styles.label}>
              {" "}
              Installer Type
            </label>
            <select
              id="installer-select"
              value={installerType}
              onChange={(e) => setInstallerType(e.target.value)}
              className={styles.select}
            >
              <option value="">Select Installer Type</option>
              {Object.entries(installerData).map(([key, data]) => (
                <option key={key} value={key}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>

          {installerDetails && (
            <div className={styles.details_wrapper}>
              <div>
                <strong>Selected Configuration:</strong>
                <ul className={styles.details_list}>
                  <li>
                    OS:
                    {os}
                  </li>
                  {arch && (
                    <li>
                      Architecture:
                      {arch}
                    </li>
                  )}
                  <li>
                    Installer:
                    {installerDetails.name}
                  </li>
                  <li>
                    Default Channel:
                    {installerDetails.defaultChannel}
                  </li>
                </ul>
              </div>

              <div className={styles.description}>
                <p>{installerDetails.description}</p>
                <a
                  href={installerDetails.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Installation Guide →
                </a>
              </div>

              {installerDetails.isStandalone && (
                <div className={styles.standalone_warning}>
                  <p>
                    ⚠️ This is a standalone tool that does not require a full
                    conda installation.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
