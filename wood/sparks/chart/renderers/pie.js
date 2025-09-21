// Pie Chart Renderer

export function renderPieChart(container, data, options) {
  const { width = 400, height = 400 } = options;
  const radius = Math.min(width, height) / 2 - 20;
  const centerX = width / 2;
  const centerY = height / 2;

  // Clear container
  container.innerHTML = '';

  // Create SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);

  // Calculate total
  const total = data.datasets[0].data.reduce((sum, value) => sum + value, 0);
  let currentAngle = 0;

  // Render pie slices
  data.labels.forEach((label, index) => {
    const value = data.datasets[0].data[index];
    const angle = (value / total) * 360;

    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

    // Convert to radians
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    // Calculate path
    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('fill', `hsl(${index * 60}, 70%, 50%)`);

    svg.appendChild(path);
    currentAngle = endAngle;
  });

  container.appendChild(svg);
  return svg;
}