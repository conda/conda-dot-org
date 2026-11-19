import React, { useState } from "react";
import { useColorMode } from "@docusaurus/theme-common";

// firstDay API returns 1 for Monday and 7 for Sunday
// Google Calendar expects 1 for Sunday and 7 for Saturday
function getFirstDay() {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale;
  let day = (new Intl.Locale(locale)?.weekInfo?.firstDay ?? 0) + 1;
  if (day === 8) day = 1; // Sunday
  return day;
}

export default function Calendar() {
  // Read once on mount via lazy initializers: these depend on the browser's Intl API, not on
  // props or other state, so there's nothing to recompute on later renders.
  const [firstDay] = useState(getFirstDay);
  const [timezone] = useState(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const { colorMode } = useColorMode();
  return (
    <iframe
      title="Conda community calendar"
      src={`https://calendar.google.com/calendar/embed?height=500&wkst=${firstDay}&ctz=${timezone}&showTitle=0&showTz=1&showPrint=0&src=ODgwNTU3MGE0ZTFjYTIzMTk4NDI5NzFkYjQzODBlZDUxOGM0OTA1NzdjMDY0NTRhZGYyMzAzNzM0NTA2ZjM5N0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%2333b679`}
      width="100%"
      height="500"
      style={
        colorMode === "dark"
          ? { filter: "invert(95%) brightness(95%) hue-rotate(180deg)" }
          : {}
      }
    ></iframe>
  );
}
