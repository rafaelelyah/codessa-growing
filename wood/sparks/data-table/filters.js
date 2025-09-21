// Filter Manager - Handles data filtering

export class FilterManager {
  constructor() {
    this.filters = {};
  }

  applyFilters(data, filters) {
    let filteredData = [...data];

    Object.entries(filters).forEach(([column, value]) => {
      if (value) {
        filteredData = filteredData.filter(row => {
          const cellValue = row[column]?.toString().toLowerCase();
          return cellValue?.includes(value.toLowerCase());
        });
      }
    });

    return filteredData;
  }

  setFilter(column, value) {
    this.filters[column] = value;
  }

  clearFilter(column) {
    delete this.filters[column];
  }

  clearAllFilters() {
    this.filters = {};
  }
}