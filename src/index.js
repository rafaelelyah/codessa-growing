// Codessa Growing - Design System Library
// Main entry point for the library

// Import core styles
import './styles/main.scss';

// Import JavaScript utilities
import './sparks/index.js';

// Export main components and utilities
export * from './sparks/index.js';

// Version info
export const VERSION = '0.0.1-alpha';

// Library initialization
export function initGrowing(options = {}) {
  console.log('Codessa Growing initialized', VERSION);

  // Initialize any global functionality here
  if (options.autoInit !== false) {
    // Auto-initialize interactive components
    initInteractiveComponents();
  }
}

function initInteractiveComponents() {
  // Initialize modals, dropdowns, etc.
  document.addEventListener('DOMContentLoaded', () => {
    // Component initialization logic
    console.log('Interactive components initialized');
  });
}

// Default export for convenience
export default {
  init: initGrowing,
  version: VERSION
};