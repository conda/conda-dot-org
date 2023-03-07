import React from 'react';
import styles from './styles.module.css';
import NewsCard from '../NewsCard';
import NewsData from '../../../blog/news';

export default function News() {

  const cards = NewsData.map((item, index) => {

    return (
      <NewsCard
        key={index}
        title={item.title}
        date={item.date}
        url={item.url}
        description={item.description}
      />
    )
  })

  return (
    <div className={[styles.header, styles.section_padding].join(' ')} id="blog">
      <div className={styles.news_heading}>
        <h1 className={styles.gradient_text}>Discover the latest trends with our Conda blog updates</h1>
      </div>
      <div className={styles.news_container}>
        <div className={styles.news_container_group_highlighted}>
          {cards[0]}
        </div>
        <div className={styles.news_container_group_not_highlighted}>
          {cards[1]}
          {cards[2]}
          {cards[3]}
          {cards[4]}
        </div>
      </div>
      <div className={styles.news_read_more}>
        <div>
          <a className="button button--primary button--lg col" href="/blog">Read More</a>
        </div>
      </div>
    </div>
  )
}