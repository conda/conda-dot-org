import styles from "./styles.module.css";
import React, { useState, useEffect } from "react";
import Calendar from "@ericz1803/react-google-calendar";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useColorMode } from '@docusaurus/theme-common';

let calendars = [
  {
    calendarId: "8805570a4e1ca2319842971db4380ed518c490577c06454adf2303734506f397@group.calendar.google.com",
    color: "#43b02a",
  },
];

export default function GoogleCalendar() {
  const [loaded, setLoaded] = useState(false);
  const { siteConfig } = useDocusaurusContext();
  const { customFields } = siteConfig
  const { GOOGLE_API_KEY } = customFields;

  if (!GOOGLE_API_KEY) {
    console.error("GOOGLE_API_KEY is not set.");
    return <div>Error: GOOGLE_API_KEY is not set.</div>;
  }

  useEffect(() => {
      setLoaded(true);
  }, []);

  const { colorMode } = useColorMode();
  let calendarStyles = {
    day: {
      padding: '2px'
    },
    event: {
      fontSize: '0.65em',
    },
    multiEvent: {
      fontSize: '0.65em',
    },
    today: {
      color: '#43b02a',
      fontWeight: 'bold'
    }
  }
  if (colorMode === 'dark') {
    calendarStyles.calendar = {color: 'white'}
    calendarStyles.eventText = {color: 'white'}
    calendarStyles.tooltip = {
      background: '#1b1a1c',
      borderColor: 'white',
      borderWidht: '1px',
      color: 'white',
      padding: '5px 15px 15px 15px',

    }
  } else {
    calendarStyles.calendar = {color: '#555a64'}
    calendarStyles.eventText = {color: '#555a64'}
    calendarStyles.tooltip = {
      background: 'white',
      padding: '5px 15px 15px 15px'
    }
  }
  if(!loaded) return <div>loading...</div>
  return (
    <div className={styles.calendar}>
        {loaded &&      <Calendar
         apiKey={GOOGLE_API_KEY} calendars={calendars}
         styles={calendarStyles}
         language="en"
       />}
    </div>
  );
}
