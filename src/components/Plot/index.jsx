import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

/**
 * A wrapper component for Plotly charts that works with Docusaurus SSG.
 * Plotly requires browser APIs, so we use BrowserOnly to render it client-side only.
 *
 * @param {Object} props - Plotly props
 * @param {Array} props.data - Plotly data array
 * @param {Object} props.layout - Plotly layout object
 * @param {Object} props.config - Plotly config object (optional)
 * @param {Object} props.style - CSS styles for the plot container (optional)
 */
export default function Plot({ data, layout, config, style, ...rest }) {
  return (
    <BrowserOnly fallback={<div>Loading chart...</div>}>
      {() => {
        // Dynamic import of Plotly to avoid SSR issues
        const PlotlyComponent = require("react-plotly.js").default;

        // Default responsive layout
        const defaultLayout = {
          autosize: true,
          ...layout,
        };

        // Default config for better UX
        const defaultConfig = {
          responsive: true,
          displayModeBar: true,
          displaylogo: false,
          ...config,
        };

        const defaultStyle = {
          width: "100%",
          height: "100%",
          ...style,
        };

        return (
          <PlotlyComponent
            data={data}
            layout={defaultLayout}
            config={defaultConfig}
            style={defaultStyle}
            useResizeHandler={true}
            {...rest}
          />
        );
      }}
    </BrowserOnly>
  );
}
