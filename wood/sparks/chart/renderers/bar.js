// Bar Chart Renderer

export function renderBarChart(container, data, options) {
  const { width = 600, height = 400 } = options;

  // Clear container
  container.innerHTML = '';

  // Create SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  // Calculate dimensions
  const margin = { top: 20, right: 20, bottom: 60, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Create chart group
  const chartGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  chartGroup.setAttribute('transform', `translate(${margin.left}, ${margin.top})`);

  // Render bars
  const barWidth = innerWidth / data.labels.length;
  const maxValue = Math.max(...data.datasets[0].data);

  data.labels.forEach((label, index) => {
    const value = data.datasets[0].data[index];
    const barHeight = (value / maxValue) * innerHeight;

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', index * barWidth);
    rect.setAttribute('y', innerHeight - barHeight);
    rect.setAttribute('width', barWidth * 0.8);
    rect.setAttribute('height', barHeight);
    rect.setAttribute('fill', '#007bff');

    chartGroup.appendChild(rect);
  });

  svg.appendChild(chartGroup);
  container.appendChild(svg);

  return svg;
}