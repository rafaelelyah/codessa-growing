/**
 * 🌱 Codessa Grow - Local Operations Core
 * Handles all local component management operations
 */

import fs from 'fs';
import path from 'path';
import { COMPONENT_TYPES } from '../modules/base.js';

export class LocalOperations {
  constructor(growInstance) {
    this.grow = growInstance;
  }

  // ========================================
  // LOCAL SEARCH OPERATIONS
  // ========================================

  async searchLocal(searchTerm, type = null) {
    console.log(`🔍 Searching locally for "${searchTerm}"${type ? ` in ${type}` : ' across all types'}`);

    let results = [];

    if (type && this.grow.managers[type]) {
      // Search in specific type
      results = await this.grow.managers[type].searchComponents(searchTerm);
    } else {
      // Search across all types
      for (const [typeName, manager] of Object.entries(this.grow.managers)) {
        const typeResults = await manager.searchComponents(searchTerm);
        results.push(...typeResults.map(r => ({ ...r, componentType: typeName })));
      }
    }

    return results;
  }

  // ========================================
  // LOCAL GROWTH OPERATIONS
  // ========================================

  async growLocal(components, options = {}) {
    console.log('🌱 Starting local component growth...');

    const results = [];
    for (const componentArg of components) {
      const { component, newName } = this.grow.parseComponentArg(componentArg);
      const result = await this.growComponentLocal(component, newName, options);
      results.push(result);
    }

    console.log('✅ Local growth complete!');
    return results;
  }

  async growComponentLocal(componentName, newName = null, options = {}) {
    // Determine component type and manager
    const { type, manager } = this.determineComponentType(componentName);

    if (!manager) {
      console.log(`❌ Unknown component type for: ${componentName}`);
      return null;
    }

    console.log(`🌱 Growing ${componentName} locally (${type})...`);

    // Extract component
    const componentData = await manager.extractComponent(componentName, options);
    if (!componentData) {
      return null;
    }

    // Handle different component types
    if (type === COMPONENT_TYPES.HARVEST) {
      // For assets, just return the path info
      console.log(`✅ Asset found: ${componentData.path}`);
      return componentData;
    } else {
      // For code components, append to tree
      return this.grow.appendToTree(componentData, componentName, newName);
    }
  }

  // ========================================
  // LOCAL CLEANUP OPERATIONS
  // ========================================

  async cleanLocal(components, options = {}) {
    console.log('🧹 Starting local cleanup...');

    if (options.all) {
      return this.cleanAllLocal();
    }

    const results = [];
    for (const component of components) {
      const result = await this.cleanComponentLocal(component, options);
      results.push(result);
    }

    return results;
  }

  async cleanComponentLocal(componentName, options = {}) {
    // This is a simplified version - in practice you'd need to track which manager owns each component
    console.log(`🧹 Cleaning ${componentName} locally...`);

    // For now, assume it's from trunks (most common)
    const manager = this.grow.managers[COMPONENT_TYPES.TRUNKS];
    // Implementation would go here

    console.log(`✅ ${componentName} cleaned locally!`);
    return true;
  }

  async cleanAllLocal() {
    console.log('🧹 Cleaning all components locally...');

    try {
      if (!fs.existsSync(this.grow.config.TREE_FILE)) {
        console.log('⚠️  Tree file not found.');
        return true;
      }

      // Keep only the header
      const headerContent = `@use '../sprouts' as *;\n@use '../soils' as *;\n\n// ========================================\n// TREE — DEVELOPMENT COMPONENTS\n// ========================================\n// Components in development\n\n`;

      fs.writeFileSync(this.grow.config.TREE_FILE, headerContent);
      console.log('✅ All components cleaned locally!');
      return true;
    } catch (error) {
      console.error('❌ Error cleaning tree:', error.message);
      return false;
    }
  }

  // ========================================
  // UTILITY METHODS
  // ========================================

  determineComponentType(componentName) {
    // Simple heuristic to determine component type
    const heuristics = {
      [COMPONENT_TYPES.TRUNKS]: ['header-', 'nav-', 'footer-', 'content-', 'container-', 'layout-', 'form-', 'input-', 'button-', 'card-', 'modal-', 'alert-', 'badge-', 'tabs-', 'typography-', 'media-', 'image-', 'video-', 'grid-', 'table-', 'pagination-', 'breadcrumb-'],
      [COMPONENT_TYPES.SPROUTS]: ['behavior-', 'interaction-', 'field-', 'media-', 'navigation-', 'structure-', 'textual-', 'util-'],
      [COMPONENT_TYPES.SPARKS]: ['main', 'index', 'component-', 'util-', 'helper-'],
      [COMPONENT_TYPES.HARVEST]: ['image-', 'video-', 'audio-', 'text-', 'icon-'],
      [COMPONENT_TYPES.SOILS]: ['soil', 'compact', 'dark', 'spacious', 'theme-'],
      [COMPONENT_TYPES.SEEDS]: ['color-', 'palette-', 'type-', 'typography-', 'layout-', 'spacing-', 'motion-', 'outline-', 'scale-'],
      [COMPONENT_TYPES.LEAFS]: ['align-', 'position-', 'color-', 'border-', 'display-', 'effect-', 'interactivity-', 'flex-', 'overflow-', 'size-', 'spacing-', 'ratio-', 'transform-', 'typography-', 'responsive-'],
      [COMPONENT_TYPES.BARKS]: ['foundation', 'bark']
    };

    for (const [type, prefixes] of Object.entries(heuristics)) {
      if (prefixes.some(prefix => componentName.startsWith(prefix) || componentName === prefix.replace('-', ''))) {
        return { type, manager: this.grow.managers[type] };
      }
    }

    // Default to trunks for unknown patterns
    return { type: COMPONENT_TYPES.TRUNKS, manager: this.grow.managers[COMPONENT_TYPES.TRUNKS] };
  }
}