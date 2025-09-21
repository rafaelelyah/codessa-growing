// Data Table Module - Main Entry Point
// An advanced data table with sorting, filtering, and pagination

import { TableRenderer } from './renderer.js';
import { DataProcessor } from './processor.js';
import { FilterManager } from './filters.js';
import { PaginationManager } from './pagination.js';

class DataTable {
  constructor(container, data, columns, options = {}) {
    this.container = container;
    this.data = data;
    this.columns = columns;
    this.options = {
      sortable: true,
      filterable: true,
      paginated: true,
      pageSize: 10,
      ...options
    };

    this.currentPage = 1;
    this.sortColumn = null;
    this.sortDirection = 'asc';
    this.filters = {};

    this.init();
  }

  init() {
    this.processor = new DataProcessor(this.data, this.columns);
    this.renderer = new TableRenderer(this.container, this.columns, this.options);
    this.filterManager = new FilterManager();
    this.paginationManager = new PaginationManager(
      this.getTotalRows(),
      this.options.pageSize
    );

    this.render();
    this.bindEvents();
  }

  render() {
    const processedData = this.getProcessedData();
    this.renderer.render(processedData, {
      currentPage: this.currentPage,
      totalPages: this.paginationManager.getTotalPages(),
      sortColumn: this.sortColumn,
      sortDirection: this.sortDirection
    });
  }

  getProcessedData() {
    let data = this.processor.getData();

    // Apply filters
    data = this.filterManager.applyFilters(data, this.filters);

    // Apply sorting
    if (this.sortColumn) {
      data = this.processor.sort(data, this.sortColumn, this.sortDirection);
    }

    // Apply pagination
    const startIndex = (this.currentPage - 1) * this.options.pageSize;
    const endIndex = startIndex + this.options.pageSize;
    data = data.slice(startIndex, endIndex);

    return data;
  }

  getTotalRows() {
    return this.filterManager.applyFilters(
      this.processor.getData(),
      this.filters
    ).length;
  }

  sort(column) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.render();
  }

  filter(column, value) {
    this.filters[column] = value;
    this.currentPage = 1;
    this.paginationManager.setTotalItems(this.getTotalRows());
    this.render();
  }

  goToPage(page) {
    this.currentPage = page;
    this.render();
  }

  bindEvents() {
    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('sort-header')) {
        const column = e.target.dataset.column;
        this.sort(column);
      }

      if (e.target.classList.contains('page-link')) {
        const page = parseInt(e.target.dataset.page);
        this.goToPage(page);
      }
    });
  }

  destroy() {
    this.container.innerHTML = '';
  }
}

export default DataTable;