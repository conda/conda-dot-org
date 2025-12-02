# Plotly Chart Examples

Here are some examples of different chart types you can use with the Plot component:

## 1. Bar Chart (Grouped)

```jsx
<Plot
  data={[
    {
      x: ['Cold Cache', 'Warm Cache'],
      y: [12.5, 2.3],
      type: 'bar',
      name: 'Before',
      marker: { color: '#e74c3c' },
    },
    {
      x: ['Cold Cache', 'Warm Cache'],
      y: [8.2, 1.1],
      type: 'bar',
      name: 'After',
      marker: { color: '#2ecc71' },
    },
  ]}
  layout={{
    title: 'Performance Comparison',
    xaxis: { title: 'Cache Status' },
    yaxis: { title: 'Time (seconds)' },
    barmode: 'group',
    height: 500,
  }}
/>
```

## 2. Line Chart

```jsx
<Plot
  data={[
    {
      x: [1, 2, 3, 4, 5, 6],
      y: [15.2, 13.8, 11.5, 9.2, 8.4, 8.1],
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Legacy',
      line: { color: '#e74c3c', width: 3 },
    },
    {
      x: [1, 2, 3, 4, 5, 6],
      y: [15.2, 9.1, 6.8, 5.2, 4.8, 4.5],
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Sharded',
      line: { color: '#2ecc71', width: 3 },
    },
  ]}
  layout={{
    title: 'Performance Over Time',
    xaxis: { title: 'Version' },
    yaxis: { title: 'Time (seconds)' },
    height: 450,
  }}
/>
```

## 3. Stacked Bar Chart

```jsx
<Plot
  data={[
    {
      x: ['v1', 'v2', 'v3'],
      y: [5.2, 3.8, 2.1],
      type: 'bar',
      name: 'Network I/O',
      marker: { color: '#3498db' },
    },
    {
      x: ['v1', 'v2', 'v3'],
      y: [4.3, 3.1, 1.9],
      type: 'bar',
      name: 'Parsing',
      marker: { color: '#9b59b6' },
    },
    {
      x: ['v1', 'v2', 'v3'],
      y: [2.8, 1.9, 0.8],
      type: 'bar',
      name: 'Processing',
      marker: { color: '#e67e22' },
    },
  ]}
  layout={{
    title: 'Performance Breakdown',
    xaxis: { title: 'Version' },
    yaxis: { title: 'Time (seconds)' },
    barmode: 'stack',
    height: 500,
  }}
/>
```

## 4. Scatter Plot with Custom Styling

```jsx
<Plot
  data={[
    {
      x: [100, 250, 500, 1000, 2000, 5000],
      y: [0.5, 1.2, 2.8, 6.1, 13.4, 35.2],
      type: 'scatter',
      mode: 'markers',
      name: 'Legacy',
      marker: {
        color: '#e74c3c',
        size: 12,
        line: { color: '#c0392b', width: 2 },
      },
    },
    {
      x: [100, 250, 500, 1000, 2000, 5000],
      y: [0.3, 0.7, 1.5, 3.2, 6.8, 17.1],
      type: 'scatter',
      mode: 'markers',
      name: 'Sharded',
      marker: {
        color: '#2ecc71',
        size: 12,
        line: { color: '#27ae60', width: 2 },
      },
    },
  ]}
  layout={{
    title: 'Scalability Test',
    xaxis: { title: 'Number of Packages', type: 'log' },
    yaxis: { title: 'Time (seconds)', type: 'log' },
    height: 500,
  }}
/>
```

## 5. Horizontal Bar Chart

```jsx
<Plot
  data={[
    {
      x: [8.2, 12.5],
      y: ['Sharded', 'Legacy'],
      type: 'bar',
      orientation: 'h',
      marker: {
        color: ['#2ecc71', '#e74c3c'],
      },
      text: ['8.2s', '12.5s'],
      textposition: 'auto',
    },
  ]}
  layout={{
    title: 'Cold Cache Performance',
    xaxis: { title: 'Time (seconds)' },
    height: 300,
    margin: { l: 100 },
  }}
/>
```

## Usage Tips

1. **Import the component**: `import Plot from '@site/src/components/Plot';`
2. **Data format**: Use Plotly's data format (see https://plotly.com/javascript/)
3. **Responsive by default**: Charts automatically resize to fit their container
4. **Interactive**: Hover over data points, zoom, pan, etc.
5. **Dark mode**: Consider using `template: 'plotly_dark'` in layout for dark mode support
6. **Custom config**: Pass `config` prop for toolbar customization

## Advanced: Loading External Data

```jsx
import Plot from '@site/src/components/Plot';
import { useEffect, useState } from 'react';

export function DynamicChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Load data from JSON file or API
    fetch('/data/performance.json')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (data.length === 0) return <div>Loading...</div>;

  return (
    <Plot
      data={data}
      layout={{
        title: 'Dynamic Data Chart',
        height: 500,
      }}
    />
  );
}
```
