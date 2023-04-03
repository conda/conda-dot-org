import React from 'react';
import styles from './styles.module.css';
import Image from '@theme/IdealImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import CondaCSVG from '@site/static/img/conda_c.svg';


export default function NewsCard(props) {
  const url = `/blog/${props.slug}`;
  let image = "";
  
  console.log(props);

  if (props.imageUrl) {
    image = (
    <div>
      <Image img={props.imageUrl} alt={`Banner image for ${props.title}`} className={styles.news_card_image} /> 
      <hr style={{backgroundColor: "var(--ifm-color-secondary-lightest"}} />
    </div>)
  } else if (props.key === 0) {
    image = (
      <CondaCSVG />
    )
  }

  function getDateLocalString(date) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  }

  return (
    <div className={styles.news_container_blog}>
      <div className={styles.news_container_content}>
        <div>
          <a href={url} >
            {image}
          </a>
          <h3><a href={url}>{props.title}</a></h3>
          <h4>
            <FontAwesomeIcon icon={faCalendar} />
            <span>{getDateLocalString(props.date)}</span>
          </h4>
          <p>{props.description}</p>
        </div>
        <a 
          href={url}
          style={{"font-weight": (props.first ? "bold" : "normal")}}
          className={styles.read_full_blog}>
            Read Full Blog
        </a>
      </div>
    </div>
  )
}