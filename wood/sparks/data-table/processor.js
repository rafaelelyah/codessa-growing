// Data Processor - Handles data manipulation

export class DataProcessor {
  constructor(data, columns) {
    this.originalData = [...data];
    this.columns = columns;
  }

  getData() {
    return [...this.originalData];
  }

  sort(data, column, direction) {
    return [...data].sort((a, b) => {
      const aVal = a[column];
      const bVal = b[column];

      if (direction === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }

  search(data, query, columns) {
    if (!query) return data;

    return data.filter(row => {
      return columns.some(column => {
        const value = row[column]?.toString().toLowerCase();
        return value?.includes(query.toLowerCase());
      });
    });
  }
}