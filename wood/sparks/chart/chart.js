// Chart Module - Main Entry Point
// A comprehensive charting library with multiple visualization types

import { renderBarChart } from './renderers/bar.js';
import { renderLineChart } from './renderers/line.js';
import { renderPieChart } from './renderers/pie.js';
import { ChartData } from './types.js';
import { validateData } from './utils.js';

class Chart {
  constructor(container, data, options = {}) {
    this.container = container;
    this.data = new ChartData(data);
    this.options = {
      type: 'bar',
      width: 600,
      height: 400,
      ...options
    };

    if (!validateData(this.data)) {
      throw new Error('Invalid chart data format');
    }
  }

  render() {
    const { type } = this.options;

    switch (type) {
      case 'bar':
        return renderBarChart(this.container, this.data, this.options);
      case 'line':
        return renderLineChart(this.container, this.data, this.options);
      case 'pie':
        return renderPieChart(this.container, this.data, this.options);
      default:
        throw new Error(`Unsupported chart type: ${type}`);
    }
  }

  update(newData) {
    this.data = new ChartData(newData);
    this.render();
  }

  destroy() {
    // Cleanup chart instance
    this.container.innerHTML = '';
  }
}

export default Chart;