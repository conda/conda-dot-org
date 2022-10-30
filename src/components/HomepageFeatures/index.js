import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Any language',
    // Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        While conda itself is written in Python, its packaging approach allows you to manage applications and libraries written in any language, like C, C++, Java, Rust or Go.
      </>
    ),
  },
  {
    title: 'Any platform',
    // Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Conda supports all major platforms and architectures: macOS, Windows, Linux, and z/OS. Intel/AMD, ARM, PowerPC, Apple Silicon... you name it.
      </>
    ),
  },
  {
    title: 'Vibrant community',
    // Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        The conda ecosystem includes tools and projects from many organizations, like <a href="https://github.com/conda-forge" target="_blank">conda-forge</a> or <a href="https://github.com/conda-incubator" target="_blank">conda-incubator</a>.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
