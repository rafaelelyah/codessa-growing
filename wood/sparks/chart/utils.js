// Chart Utility Functions

export function validateData(data) {
  try {
    if (!data || typeof data !== 'object') {
      return false;
    }

    if (!Array.isArray(data.labels)) {
      return false;
    }

    if (!Array.isArray(data.datasets) || data.datasets.length === 0) {
      return false;
    }

    // Validate each dataset
    for (const dataset of data.datasets) {
      if (!dataset.data || !Array.isArray(dataset.data)) {
        return false;
      }
    }

    return true;
  } catch (error) {
    return false;
  }
}

export function calculateScales(data, options) {
  const allValues = data.datasets.flatMap(dataset => dataset.data);
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);

  return {
    min: options.minScale || min,
    max: options.maxScale || max,
    range: max - min
  };
}

export function generateColors(count, baseColor = '#007bff') {
  const colors = [];
  for (let i = 0; i < count; i++) {
    // Generate variations of the base color
    const hue = (i * 137.5) % 360; // Golden angle approximation
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
}

export function formatValue(value, format = 'number') {
  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
    case 'percentage':
      return `${(value * 100).toFixed(1)}%`;
    default:
      return value.toString();
  }
}