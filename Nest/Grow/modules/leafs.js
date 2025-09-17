/**
 * Grow - Leafs Component Manager
 * Handles utility class extraction from leafs
 */

import fs from 'fs';
import path from 'path';
import { BaseComponentManager, extractScssComponent } from './base.js';

export class LeafsManager extends BaseComponentManager {
  constructor(config = {}) {
    super('leafs', config);
  }

  // Static mappings for leafs
  getStaticMappings() {
    return {
      // Layout and positioning
      'align': 'aligns.scss',
      'position': 'position.scss',

      // Visual styling
      'color': 'colors.scss',
      'border': 'borders.scss',
      'display': 'display.scss',

      // Effects and interactions
      'effect': 'effects.scss',
      'interactivity': 'interactivity.scss',

      // Flexbox utilities
      'flex': 'flex-advanced.scss',

      // Overflow and z-index
      'overflow': 'overflow-zindex.scss',

      // Sizing and spacing
      'size': 'sizes.scss',
      'spacing': 'spacings.scss',

      // Ratios and transforms
      'ratio': 'ratio.scss',
      'transform': 'transforms.scss',

      // Typography
      'typography': 'typography.scss',

      // Responsive utilities
      'responsive': 'responsive.scss'
    };
  }

  async findComponent(utilityName) {
    const sourceDir = this.getSourceDirectory();

    // First, try static mapping
    const staticMappings = this.getStaticMappings();
    for (const [prefix, filename] of Object.entries(staticMappings)) {
      if (utilityName.startsWith(`${prefix}-`)) {
        const leafFile = path.join(sourceDir, filename);
        if (this.validateSourceExists(leafFile)) {
          this.updateCacheMapping(utilityName, leafFile);
          return leafFile;
        }
      }
    }

    // Second, check persistent cache
    if (this.cache.mappings[utilityName]) {
      const leafFile = path.join(sourceDir, this.cache.mappings[utilityName]);
      if (this.validateSourceExists(leafFile)) {
        return leafFile;
      }
    }

    // Third, automatic discovery
    try {
      const leafFiles = fs.readdirSync(sourceDir).filter(file =>
        file.endsWith('.scss')
      );

      for (const leafFile of leafFiles) {
        const fullPath = path.join(sourceDir, leafFile);
        const content = fs.readFileSync(fullPath, 'utf8');

        // Look for utility class in file
        if (content.includes(`.${utilityName}`) ||
            content.includes(`&--${utilityName.split('-').pop()}`)) {
          this.updateCacheMapping(utilityName, fullPath);
          return fullPath;
        }
      }
    } catch (error) {
      console.warn('⚠️  Error in automatic discovery:', error.message);
    }

    return null;
  }

  async extractComponent(utilityName, options = {}) {
    const leafFile = await this.findComponent(utilityName);
    if (!leafFile) {
      console.log(`❌ Leaf file not found for: ${utilityName}`);
      console.log(`💡 Available utilities: ${Object.keys(this.getStaticMappings()).join(', ')}`);
      return null;
    }

    // Read leaf content
    const leafContent = fs.readFileSync(leafFile, 'utf8');

    // Extract specific utility class
    const componentCode = extractScssComponent(leafContent, utilityName);
    if (!componentCode) {
      console.log(`❌ Utility not found: ${utilityName}`);
      return null;
    }

    return {
      code: componentCode,
      source: leafFile,
      type: 'scss'
    };
  }

  async searchComponents(searchTerm) {
    const results = [];
    const sourceDir = this.getSourceDirectory();

    try {
      const leafFiles = fs.readdirSync(sourceDir).filter(file =>
        file.endsWith('.scss')
      );

      for (const leafFile of leafFiles) {
        const fullPath = path.join(sourceDir, leafFile);
        const content = fs.readFileSync(fullPath, 'utf8');

        // Look for utility classes containing search term
        const classRegex = /\.([a-zA-Z][a-zA-Z0-9-]*)/g;
        let match;

        while ((match = classRegex.exec(content)) !== null) {
          const utilityName = match[1];
          if (utilityName.includes(searchTerm) || searchTerm.includes(utilityName.split('-')[0])) {
            results.push({
              component: utilityName,
              file: leafFile,
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