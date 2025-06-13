import React from "react";
import styles from "./styles.module.css";
import Image from "@theme/IdealImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import Link from "@docusaurus/Link";

export default function NewsCard({
  slug,
  imageUrl,
  title,
  first,
  date,
  description,
}) {
  const url = `/blog/${slug}`;
  const image = imageUrl ? (
    <Image
      img={require(`@site/static/${imageUrl}`)}
      alt={`Banner image for ${title} blog post`}
      className={styles.news_card_image}
    />
  ) : (
    ""
  );

  function getDateLocalString(date) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  }

  return (
    <div className={styles.news_container_blog}>
      <div className={styles.news_container_content}>
        <div>
          {first && image && <Link to={url}>{image}</Link>}
          <h3>
            <Link to={url}>{title}</Link>
          </h3>
          <h4>
            <FontAwesomeIcon icon={faCalendar} />
            <span>{getDateLocalString(date)}</span>
          </h4>
          <p>{description}</p>
          <Link
            to={url}
            className={styles.read_full_blog}
            style={{ fontWeight: first ? "bold" : "normal" }}
          >
            Read Full Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
