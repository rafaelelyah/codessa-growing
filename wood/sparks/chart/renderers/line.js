// Line Chart Renderer

export function renderLineChart(container, data, options) {
  const { width = 600, height = 400 } = options;

  // Clear container
  container.innerHTML = '';

  // Create SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);

  // Line chart implementation
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('stroke', '#007bff');
  path.setAttribute('stroke-width', '2');
  path.setAttribute('fill', 'none');

  // Generate path data
  let pathData = 'M';
  const maxValue = Math.max(...data.datasets[0].data);

  data.labels.forEach((label, index) => {
    const value = data.datasets[0].data[index];
    const x = (index / (data.labels.length - 1)) * width;
    const y = height - (value / maxValue) * height;

    if (index === 0) {
      pathData += `${x},${y}`;
    } else {
      pathData += ` L${x},${y}`;
    }
  });

  path.setAttribute('d', pathData);
  svg.appendChild(path);
  container.appendChild(svg);

  return svg;
}