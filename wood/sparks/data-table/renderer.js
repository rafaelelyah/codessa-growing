// Table Renderer - Handles DOM rendering

export class TableRenderer {
  constructor(container, columns, options) {
    this.container = container;
    this.columns = columns;
    this.options = options;
  }

  render(data, paginationInfo) {
    this.container.innerHTML = '';

    const table = this.createTable(data, paginationInfo);
    this.container.appendChild(table);

    if (this.options.paginated) {
      const pagination = this.createPagination(paginationInfo);
      this.container.appendChild(pagination);
    }
  }

  createTable(data, paginationInfo) {
    const table = document.createElement('table');
    table.className = 'data-table';

    // Create header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    this.columns.forEach(column => {
      const th = document.createElement('th');

      if (this.options.sortable) {
        th.className = 'sort-header';
        th.dataset.column = column.key;
        th.textContent = column.label;

        if (paginationInfo.sortColumn === column.key) {
          th.classList.add(`sort-${paginationInfo.sortDirection}`);
        }
      } else {
        th.textContent = column.label;
      }

      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create body
    const tbody = document.createElement('tbody');

    data.forEach(row => {
      const tr = document.createElement('tr');

      this.columns.forEach(column => {
        const td = document.createElement('td');
        td.textContent = row[column.key] || '';
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    return table;
  }

  createPagination(paginationInfo) {
    const nav = document.createElement('nav');
    nav.className = 'pagination';

    for (let i = 1; i <= paginationInfo.totalPages; i++) {
      const link = document.createElement('a');
      link.className = `page-link ${i === paginationInfo.currentPage ? 'active' : ''}`;
      link.dataset.page = i;
      link.textContent = i;
      link.href = '#';
      nav.appendChild(link);
    }

    return nav;
  }
}