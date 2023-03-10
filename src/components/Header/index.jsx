import React from 'react';
import condac from '@site/static/img/conda_c.png';
import Image from '@theme/IdealImage';
import styles from './styles.module.css';

export default function Header() {
  return (
    <div className={[styles.header, styles.section_padding].join(' ')}>
      <div className={[styles.header_content, styles.header_content_image].join(' ')}>
        <h1 className={styles.gradient_text}>Package, dependency and environment management for any language</h1>
        <p>Conda is an open source package management system and environment management system that runs on Windows, macOS, Linux and z/OS. Conda quickly installs, runs and updates packages and their dependencies.</p>

        <div className={styles.header_content_input}>
          <a href="/docs/intro">Get Started</a>
        </div>

      </div>
      <div className={styles.header_image}>
        <Image img={condac} alt="conda logo" />
      </div>
    </div>
  );
}
