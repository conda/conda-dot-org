import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ThemedImage from "@theme/ThemedImage";
import styles from "./styles.module.css";

/* data of supporters */
const financial = [];

const infrastructure = [
  {
    name: "Anaconda",
    link: "https://www.anaconda.com/",
    light: "img/supporters/anaconda_light.svg",
    dark: "img/supporters/anaconda_dark.svg",
    width: 250,
  },
  {
    name: "Netlify",
    link: "https://www.netlify.com/",
    light: "img/supporters/netlify_light.svg",
    dark: "img/supporters/netlify_dark.svg",
    width: 250,
  },
  {
    name: "Zulip",
    link: "https://zulip.com",
    light: "img/supporters/zulip.svg",
    dark: "img/supporters/zulip.svg",
    width: 250,
  },
];

const developer = [
  {
    name: "Anaconda",
    link: "https://www.anaconda.com/",
    light: "img/supporters/anaconda_light.svg",
    dark: "img/supporters/anaconda_dark.svg",
    width: 250,
  },
  // {
  //   name: "IOOS Integrated Ocean Observing System",
  //   link: "https://ioos.noaa.gov/",
  //   light: "img/supporters/ioos.png",
  //   dark: "img/supporters/ioos.png",
  //   width: 150,
  // },
  {
    name: "NVIDIA",
    link: "https://www.nvidia.com/",
    light: "img/supporters/nvidia_light.svg",
    dark: "img/supporters/nvidia_dark.svg",
    width: 250,
  },
  // {
  //   name: "Voltron Data",
  //   link: "https://voltrondata.com/",
  //   light: "img/supporters/voltron_light.svg",
  //   dark: "img/supporters/voltron_dark.svg",
  //   width: 250,
  // },
  {
    name: "Quansight Labs",
    link: "https://labs.quansight.org/",
    light: "img/supporters/quansightlabs_light.svg",
    dark: "img/supporters/quansightlabs_dark.svg",
    width: 250,
  },
  {
    name: "QuantStack",
    link: "https://quantstack.net/",
    light: "img/supporters/quantstack_light.svg",
    dark: "img/supporters/quantstack_dark.svg",
    width: 250,
  },
  {
    name: "Prefix.dev",
    link: "https://prefix.dev/",
    light: "img/supporters/prefix_light.svg",
    dark: "img/supporters/prefix_dark.svg",
    width: 250,
  },
  {
    name: "QuantCo",
    link: "https://www.quantco.com/",
    light: "img/supporters/quantco_light.svg",
    dark: "img/supporters/quantco_dark.svg",
    width: 210,
  },
];

export default function Supporters() {
  return (
    <div className={[styles.supporters, styles.section_padding].join(" ")}>
      <div className={styles.supporters_conda_org}>
        <h1 className={styles.gradient_text}>Supporters</h1>
        <p>
          If you like the conda community and want to support our mission,
          please consider making a{" "}
          <Link to="https://opencollective.com/conda">donation</Link> to support
          our efforts.
        </p>
      </div>
      <div className={styles.fiscal_sponsor}>
        <Link to="https://numfocus.org/">
          <div className={styles.numfocus_card}>
            <ThemedImage
              className={styles.image}
              alt="NumFOCUS Logo"
              sources={{
                light: useBaseUrl("/img/supporters/numfocus.svg"),
                dark: useBaseUrl("/img/supporters/numfocus.svg"),
              }}
              width="100%"
            />
          </div>
        </Link>
        <div className={styles.about_numfocus}>
          <h3>
            conda is a <span className="gradient_text">fiscally sponsored</span>{" "}
            project of NumFOCUS.
          </h3>
          <p>
            A nonprofit dedicated to supporting the open source scientific
            computing community.
          </p>
        </div>
      </div>
      <div className={styles.other_supporters}>
        {financial.length > 0 ? (
          <div className={styles.supporters_card}>
            <div className={styles.supporters_conda_org}>
              <h2>
                <span className="gradient_text">Financial</span> Support
              </h2>
            </div>
            <div className={styles.card}>
              {financial.map(({ name, link, light, dark, width }, index) => (
                <Link to={link} key={index}>
                  <div className={styles.cardWrapper}>
                    <ThemedImage
                      className={styles.image}
                      alt={`${name} logo`}
                      title={`Go to ${name}'s website`}
                      sources={{
                        light: useBaseUrl(`${light}`),
                        dark: useBaseUrl(`${dark}`),
                      }}
                      width={width}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
        {infrastructure.length > 0 ? (
          <div className={styles.supporters_card}>
            <div className={styles.supporters_conda_org}>
              <h2>
                <span className="gradient_text">Infrastructure</span> Support
              </h2>
            </div>
            <div className={styles.card}>
              {infrastructure.map(
                ({ name, link, light, dark, width }, index) => (
                  <Link key={index} to={link}>
                    <div className={styles.cardWrapper}>
                      <ThemedImage
                        className={styles.image}
                        alt={`${name} logo`}
                        title={`Go to ${name}'s website`}
                        sources={{
                          light: useBaseUrl(`${light}`),
                          dark: useBaseUrl(`${dark}`),
                        }}
                        width={width}
                      />
                    </div>
                  </Link>
                ),
              )}
            </div>
          </div>
        ) : null}
        {developer.length > 0 ? (
          <div className={styles.supporters_card}>
            <div className={styles.supporters_conda_org}>
              <h2>
                <span className="gradient_text">Developer</span> Support
              </h2>
            </div>
            <div className={styles.card}>
              {developer.map(({ name, link, light, dark, width }, index) => (
                <Link key={index} to={link}>
                  <div className={styles.cardWrapper}>
                    <ThemedImage
                      className={styles.image}
                      alt={`${name} logo`}
                      title={`Go to ${name}'s website`}
                      sources={{
                        light: useBaseUrl(`${light}`),
                        dark: useBaseUrl(`${dark}`),
                      }}
                      width={width}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
