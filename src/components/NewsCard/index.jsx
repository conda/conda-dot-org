import React from 'react';
import styles from './styles.module.css';

export default function NewsCard(props) {
  return (
    <div className={styles.news_container_blog}>
      <div className={styles.news_container_content}>
        <div>
          <h4>{props.date}</h4>
          <h3>{props.title}</h3>
          <p>{props.description}</p>
        </div>
        <a href={props.url}>Read Full Blog</a>
      </div>
    </div>
  )
}