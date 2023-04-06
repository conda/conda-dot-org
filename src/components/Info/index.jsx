import React from 'react';
import CondaCSVG from '@site/static/img/conda_c.svg';
import styles from './styles.module.css';

export default function Info() {
  return (
    <div className={[styles.header, styles.section_padding].join(' ')}>
      <div className={styles.info_heading}>
        <h1 className={styles.gradient_text}>What is conda?</h1>
        <h2>
        <a href="https://docs.conda.io/" target="_blank">Conda</a> is an <a href="https://github.com/conda/conda#readme" target="_blank">open-source</a> package manager and environment management system that helps users install, run, and
        update over 7,500+ open-source packages as well as their dependencies. It also creates,
        saves, loads and switches between environments on your local computer.
        <br></br><br></br>
        Conda was created primarily for Python programs, but it’s language-agnostic, which means
        that it can package and distribute software written in any language. It runs on Windows,
        Linux, and macOS, as well as various platforms and architectures.
        </h2>

      </div>
    </div>
  );
}
