import React from 'react';
import styles from './styles.module.css';
import NewsCard from '../NewsCard';
import NewsData from '../../../news/news'

export default function News() {

  const card = NewsData.map((item, index) => {
    return (
      <NewsCard
          key = {index}
          title={item.title}
          date={item.date}
          url={item.url}
      />
    )
  })

  return (
    <div className={[styles.header, styles.section_padding].join(' ')} id="blog">
      <div className={styles.news_heading}>
        <h1 className={styles.gradient_text}>Discover the latest trends with our Conda blog updates</h1>
      </div>
      <div className={styles.news_container}>
        <div className={styles.news_container_groupA}>
          {card[0]}
        </div>
        <div className={styles.news_container_groupB}>
          {card[1]}
          {card[2]}
          {card[3]}
          {card[4]}
        </div>
      </div>

      <div className={styles.new_read_more}>
          <a href="/blog">Read More</a>
      </div>

    </div>
  )
}