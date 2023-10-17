import React from "react";
import styles from "./styles.module.css";
import NewsCard from "../NewsCard";
import NewsData from "../../../blog/news";

export default function News() {
  const cards = NewsData.map((item, index) => {
    return (
      <NewsCard
        index={index}
        title={item.title}
        date={item.date}
        slug={item.slug}
        description={item.description}
        imageUrl={item.image}
        first={index === 0}
      />
    );
  });

  return (
    <div
      className={[styles.header, styles.section_padding].join(" ")}
      id="blog"
    >
      <div className={styles.news_heading}>
        <h1 className={styles.gradient_text}>
          Discover the latest news and learn more in our blog
        </h1>
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
          <a className="button button--primary button--lg col" href="/blog">
            View Full Blog
          </a>
        </div>
      </div>
    </div>
  );
}
