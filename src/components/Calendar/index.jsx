import React from "react";
import FullCalendar from "@fullcalendar/react";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import dayGridPlugin from "@fullcalendar/daygrid";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import BrowserOnly from "@docusaurus/BrowserOnly";

export default function GoogleCalendar() {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        const { siteConfig } = useDocusaurusContext();
        const GOOGLE_API_KEY = siteConfig.customFields.GOOGLE_API_KEY;
        if (!GOOGLE_API_KEY)
          return <div>Error: GOOGLE_API_KEY is not set.</div>;
        const calendarId =
          "8805570a4e1ca2319842971db4380ed518c490577c06454adf2303734506f397@group.calendar.google.com";
        return (
          <>
            <FullCalendar
              plugins={[dayGridPlugin, googleCalendarPlugin]}
              googleCalendarApiKey={GOOGLE_API_KEY}
              events={{ googleCalendarId: calendarId }}
              initialView="dayGridMonth"
            />
            <a
              href="https://calendar.google.com/calendar/r?cid=8805570a4e1ca2319842971db4380ed518c490577c06454adf2303734506f397@group.calendar.google.com"
              target="_blank"
              rel="noreferrer"
            >
              Add it to your calendar
            </a>
          </>
        );
      }}
    </BrowserOnly>
  );
}
