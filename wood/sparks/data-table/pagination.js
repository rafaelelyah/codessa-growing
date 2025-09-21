// Pagination Manager - Handles pagination logic

export class PaginationManager {
  constructor(totalItems, itemsPerPage) {
    this.totalItems = totalItems;
    this.itemsPerPage = itemsPerPage;
  }

  getTotalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  getCurrentPage() {
    return this.currentPage || 1;
  }

  setCurrentPage(page) {
    this.currentPage = Math.max(1, Math.min(page, this.getTotalPages()));
  }

  setTotalItems(total) {
    this.totalItems = total;
  }

  getPageItems() {
    const start = (this.getCurrentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return { start, end };
  }

  hasNextPage() {
    return this.getCurrentPage() < this.getTotalPages();
  }

  hasPreviousPage() {
    return this.getCurrentPage() > 1;
  }
}