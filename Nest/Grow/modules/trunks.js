/**
 * Grow - Trunks Component Manager
 * Handles SCSS component extraction from trunks
 */

import fs from 'fs';
import path from 'path';
import { BaseComponentManager, extractScssComponent } from './base.js';

export class TrunksManager extends BaseComponentManager {
  constructor(config = {}) {
    super('trunks', config);
  }

  // Static mappings for trunks
  getStaticMappings() {
    return {
      // Navigation and Layout
      'header': 'header.scss',
      'nav': 'nav.scss',
      'footer': 'footer.scss',

      // Content and Structure
      'content': 'content.scss',
      'container': 'container.scss',
      'layout': 'layout.scss',

      // Forms
      'form': 'forms.scss',
      'input': 'inputs.scss',
      'button': 'buttons.scss',

      // UI Components
      'card': 'cards.scss',
      'modal': 'modals.scss',
      'alert': 'alerts.scss',
      'badge': 'badges.scss',
      'tabs': 'tabs.scss',

      // Typography and Media
      'typography': 'typography.scss',
      'media': 'media.scss',
      'image': 'images.scss',
      'video': 'videos.scss',

      // Utilities
      'grid': 'grid.scss',
      'table': 'tables.scss',
      'pagination': 'pagination.scss',
      'breadcrumb': 'breadcrumbs.scss'
    };
  }

  async findComponent(componentName) {
    const sourceDir = this.getSourceDirectory();

    // First, try static mapping
    const staticMappings = this.getStaticMappings();
    for (const [prefix, filename] of Object.entries(staticMappings)) {
      if (componentName.startsWith(`${prefix}-`)) {
        const trunkFile = path.join(sourceDir, filename);
        if (this.validateSourceExists(trunkFile)) {
          this.updateCacheMapping(componentName, trunkFile);
          return trunkFile;
        }
      }
    }

    // Second, check persistent cache
    if (this.cache.mappings[componentName]) {
      const trunkFile = path.join(sourceDir, this.cache.mappings[componentName]);
      if (this.validateSourceExists(trunkFile)) {
        return trunkFile;
      }
    }

    // Third, automatic discovery
    try {
      const trunkFiles = fs.readdirSync(sourceDir).filter(file =>
        file.endsWith('.scss')
      );

      for (const trunkFile of trunkFiles) {
        const fullPath = path.join(sourceDir, trunkFile);
        const content = fs.readFileSync(fullPath, 'utf8');

        // Look for component in file
        if (content.includes(`.${componentName}`) || content.includes(`&--${componentName.split('-').pop()}`)) {
          this.updateCacheMapping(componentName, fullPath);
          return fullPath;
        }
      }
    } catch (error) {
      console.warn('⚠️  Error in automatic discovery:', error.message);
    }

    return null;
  }

  async extractComponent(componentName, options = {}) {
    const trunkFile = await this.findComponent(componentName);
    if (!trunkFile) {
      console.log(`❌ Trunk file not found for: ${componentName}`);
      console.log(`💡 Available prefixes: ${Object.keys(this.getStaticMappings()).join(', ')}`);
      return null;
    }

    // Read trunk content
    const trunkContent = fs.readFileSync(trunkFile, 'utf8');

    // Extract specific component
    const componentCode = extractScssComponent(trunkContent, componentName);
    if (!componentCode) {
      console.log(`❌ Component not found: ${componentName}`);
      return null;
    }

    // Check for auto-dependencies if enabled
    let dependencies = [];
    if (options.autoDeps !== false) { // Default to true
      dependencies = this.detectDependencies(componentCode);
      console.log(`🔗 Detected ${dependencies.length} dependencies for ${componentName}`);
    }

    return {
      code: componentCode,
      source: trunkFile,
      type: 'scss',
      dependencies: dependencies
    };
  }

  // Detect sprout dependencies in trunk code
  detectDependencies(componentCode) {
    const dependencies = [];
    
    // Regex to find @include sprout-* calls
    const includeRegex = /@include\s+sprout-([a-zA-Z_-]+)\s*\(/g;
    let match;
    
    while ((match = includeRegex.exec(componentCode)) !== null) {
      const sproutName = `sprout-${match[1]}`;
      if (!dependencies.includes(sproutName)) {
        dependencies.push(sproutName);
      }
    }
    
    return dependencies;
  }

  async searchComponents(searchTerm) {
    const results = [];
    const sourceDir = this.getSourceDirectory();

    try {
      const trunkFiles = fs.readdirSync(sourceDir).filter(file =>
        file.endsWith('.scss')
      );

      for (const trunkFile of trunkFiles) {
        const fullPath = path.join(sourceDir, trunkFile);
        const content = fs.readFileSync(fullPath, 'utf8');

        // Look for classes containing search term
        const classRegex = /\.([a-zA-Z][a-zA-Z0-9-]*)/g;
        let match;

        while ((match = classRegex.exec(content)) !== null) {
          const componentName = match[1];
          if (componentName.includes(searchTerm) || searchTerm.includes(componentName.split('-')[0])) {
            results.push({
              component: componentName,
              file: trunkFile,
              type: 'scss'
            });
          }
        }
      }
    } catch (error) {
      console.warn('⚠️  Error in search:', error.message);
    }

    return results;
  }
}