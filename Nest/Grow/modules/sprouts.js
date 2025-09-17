/**
 * Grow - Sprouts Component Manager
 * Handles SCSS component extraction from sprouts
 */

import fs from 'fs';
import path from 'path';
import { BaseComponentManager, extractScssComponent, extractScssMixin } from './base.js';

export class SproutsManager extends BaseComponentManager {
  constructor(config = {}) {
    super('sprouts', config);
  }

  // Static mappings for sprouts
  getStaticMappings() {
    return {
      // Behaviors
      'behavior': 'behaviors.scss',
      'interaction': 'interactions.scss',

      // Fields and Forms
      'field': 'fields.scss',

      // Media and Navigation
      'media': 'media.scss',
      'navigation': 'navigation.scss',

      // Structures and Text
      'structure': 'structures.scss',
      'textual': 'textual.scss',

      // Utilities
      'util': 'utils.scss'
    };
  }

  async findComponent(componentName) {
    const sourceDir = this.getSourceDirectory();

    // First, try static mapping
    const staticMappings = this.getStaticMappings();
    for (const [prefix, filename] of Object.entries(staticMappings)) {
      if (componentName.startsWith(`${prefix}-`)) {
        const sproutFile = path.join(sourceDir, filename);
        if (this.validateSourceExists(sproutFile)) {
          this.updateCacheMapping(componentName, sproutFile);
          return sproutFile;
        }
      }
    }

    // Second, check persistent cache
    if (this.cache.mappings[componentName]) {
      const sproutFile = path.join(sourceDir, this.cache.mappings[componentName]);
      if (this.validateSourceExists(sproutFile)) {
        return sproutFile;
      }
    }

    // Third, automatic discovery - search in ALL .scss files
    try {
      const sproutFiles = fs.readdirSync(sourceDir).filter(file =>
        file.endsWith('.scss')
      );

      for (const sproutFile of sproutFiles) {
        const fullPath = path.join(sourceDir, sproutFile);
        const content = fs.readFileSync(fullPath, 'utf8');

        // Look for mixin definition (more specific search)
        const mixinRegex = new RegExp(`@mixin ${componentName}\\s*\\(`, 'g');
        if (mixinRegex.test(content)) {
          this.updateCacheMapping(componentName, fullPath);
          return fullPath;
        }

        // Also look for @include usage as fallback
        if (content.includes(`@include ${componentName}`)) {
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
    const sproutFile = await this.findComponent(componentName);
    if (!sproutFile) {
      console.log(`❌ Sprout file not found for: ${componentName}`);
      console.log(`💡 Available prefixes: ${Object.keys(this.getStaticMappings()).join(', ')}`);
      return null;
    }

    // Read sprout content
    const sproutContent = fs.readFileSync(sproutFile, 'utf8');

    // Extract specific mixin
    const componentCode = extractScssMixin(sproutContent, componentName);
    if (!componentCode) {
      console.log(`❌ Mixin not found: ${componentName}`);
      return null;
    }

    return {
      name: componentName,
      code: componentCode,
      source: sproutFile,
      type: 'scss'
    };
  }

  async searchComponents(searchTerm) {
    const results = [];
    const sourceDir = this.getSourceDirectory();

    try {
      const sproutFiles = fs.readdirSync(sourceDir).filter(file =>
        file.endsWith('.scss')
      );

      for (const sproutFile of sproutFiles) {
        const fullPath = path.join(sourceDir, sproutFile);
        const content = fs.readFileSync(fullPath, 'utf8');

        // Look for classes containing search term
        const classRegex = /\.([a-zA-Z][a-zA-Z0-9-]*)/g;
        let match;

        while ((match = classRegex.exec(content)) !== null) {
          const componentName = match[1];
          if (componentName.includes(searchTerm) || searchTerm.includes(componentName.split('-')[0])) {
            results.push({
              component: componentName,
              file: sproutFile,
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