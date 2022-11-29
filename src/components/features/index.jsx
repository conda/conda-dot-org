import React from 'react';
import styles from './styles.module.css';

const features = [
  {
    logo: {
      alt:
                'Any language',
      src: '/img/conda_language.svg',
      width: 205,
      height: 113,
    },
    title: 'Any language',
    content: (
      <>
        While conda itself is written in Python, its packaging approach allows you to manage applications and libraries written in any language, like C, C++, Java, Rust or Go.
      </>
    ),
  },
  {
    logo: {
      alt:
                'Any platform',
      src: '/img/conda_platform.svg',
      width: 205,
      height: 113,
    },
    title: 'Any platform',
    content: (
      <>
        Conda supports all major platforms and architectures: macOS, Windows, Linux, and z/OS. Intel/AMD, ARM, PowerPC, Apple Silicon... you name it.
      </>
    ),
  },
  {
    logo: {
      alt: 'Vibrant community',
      src: '/img/conda_community.svg',
      width: 205,
      height: 113,
    },
    title: 'Vibrant community',
    content: (
      <>
        The conda ecosystem includes tools and projects from many organizations, like
        {' '}
        <a href="https://github.com/conda-forge" target="_blank" rel="noreferrer">conda-forge</a>
        {' '}
        or
        {' '}
        <a href="https://github.com/conda-incubator" target="_blank" rel="noreferrer">conda-incubator</a>
        .
      </>
    ),
  },
];

export default function Features() {
  return (
    <div className={[styles.features, styles.section_padding].join(' ')}>
      {features.map(({ logo, title, content }, index) => (
        <div className={styles.feature_card} key={index}>
          <img
            alt={logo.alt}
            className={styles.illustration}
            src={logo.src}
            width={logo.width}
            height={logo.height}
          />
          <div />
          <h3>{title}</h3>
          <p className={styles.info}>{content}</p>
        </div>
      ))}
    </div>
  );
}
