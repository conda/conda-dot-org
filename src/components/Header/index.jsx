import React from 'react';
import CondaCSVG from '@site/static/img/conda_c.svg';
import styles from './styles.module.css';

export default function Header() {
  return (
    <div className={[styles.header, styles.section_padding].join(' ')}>
      <div className={[styles.header_content, styles.header_content_image].join(' ')}>
        <h1 className={styles.gradient_text}>Package, dependency and environment management for any language</h1>
        <p>Conda is an open source package management system and environment management system that runs on Windows, macOS, Linux and z/OS. Conda quickly installs, runs and updates packages and their dependencies.</p>

        <div className={styles.header_content_input}>
          <a className="button button--primary button--lg col" href="/docs/intro">Get Started</a>
        </div>

      </div>
      <div className={styles.header_image}>
        <CondaCSVG title="Conda Logo" width="100%"/>
      </div>
    </div>
  );
}
