// Chart Types and Data Structures

export class ChartData {
  constructor(data) {
    this.labels = data.labels || [];
    this.datasets = data.datasets || [];
    this.validate();
  }

  validate() {
    if (!Array.isArray(this.labels)) {
      throw new Error('Labels must be an array');
    }
    if (!Array.isArray(this.datasets)) {
      throw new Error('Datasets must be an array');
    }
  }

  getDataset(index) {
    return this.datasets[index];
  }

  getLabel(index) {
    return this.labels[index];
  }
}

export const CHART_TYPES = {
  BAR: 'bar',
  LINE: 'line',
  PIE: 'pie',
  DOUGHNUT: 'doughnut',
  AREA: 'area'
};

export const CHART_COLORS = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8'
};