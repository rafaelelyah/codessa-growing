// Codessa Growing - JavaScript Utilities (Sparks)
// Interactive components and utilities

// Modal functionality
export class Modal {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    // Modal initialization logic
    const triggers = document.querySelectorAll('[data-modal-trigger]');
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => this.open());
    });
  }

  open() {
    this.element.classList.add('is-open');
  }

  close() {
    this.element.classList.remove('is-open');
  }
}

// Dropdown functionality
export class Dropdown {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.element.addEventListener('click', () => this.toggle());
  }

  toggle() {
    this.element.classList.toggle('is-open');
  }
}

// Utility functions
export const utils = {
  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }
};

// Auto-initialize components
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modals
  document.querySelectorAll('[data-modal]').forEach(modal => {
    new Modal(modal);
  });

  // Initialize all dropdowns
  document.querySelectorAll('[data-dropdown]').forEach(dropdown => {
    new Dropdown(dropdown);
  });
});