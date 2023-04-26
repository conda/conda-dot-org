import React from 'react';
import CondaCSVG from '@site/static/img/conda_c.svg';
import styles from './styles.module.css';

export default function Info() {
  return (
    <div className={[styles.info, styles.section_padding].join(' ')}>
      <div className={styles.info_heading}>
        <h1 className={styles.gradient_text}>What is conda?</h1>
        <p>
        Initially started as a multi-platform package management tool, the term "conda" has since
        evolved to encompass an entire <b>open-source packaging ecosystem and philosophy</b>. This ecosystem
        is supported by many organizations who all share the common goal of <b>providing easier
        access to programming tools and libraries</b>.
        </p>
      </div>
    </div>
  );
}
