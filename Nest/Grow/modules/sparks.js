/**
 * Grow - Sparks Component Manager
 * Handles JavaScript component extraction from sparks
 */

import fs from 'fs';
import path from 'path';
import { BaseComponentManager, extractJsComponent } from './base.js';

export class SparksManager extends BaseComponentManager {
  constructor(config = {}) {
    super('sparks', config);
  }

  // Static mappings for sparks
  getStaticMappings() {
    return {
      // Main files
      'main': 'main.js',
      'index': 'index.js',

      // Common patterns
      'component': 'main.js',
      'util': 'main.js',
      'helper': 'main.js'
    };
  }

  async findComponent(componentName) {
    const sourceDir = this.getSourceDirectory();

    // First, try static mapping
    const staticMappings = this.getStaticMappings();
    for (const [prefix, filename] of Object.entries(staticMappings)) {
      if (componentName.startsWith(`${prefix}-`) || componentName === prefix) {
        const sparkFile = path.join(sourceDir, filename);
        if (this.validateSourceExists(sparkFile)) {
          this.updateCacheMapping(componentName, sparkFile);
          return sparkFile;
        }
      }
    }

    // Second, check persistent cache
    if (this.cache.mappings[componentName]) {
      const sparkFile = path.join(sourceDir, this.cache.mappings[componentName]);
      if (this.validateSourceExists(sparkFile)) {
        return sparkFile;
      }
    }

    // Third, automatic discovery
    try {
      const sparkFiles = fs.readdirSync(sourceDir).filter(file =>
        file.endsWith('.js') || file.endsWith('.ts')
      );

      for (const sparkFile of sparkFiles) {
        const fullPath = path.join(sourceDir, sparkFile);
        const content = fs.readFileSync(fullPath, 'utf8');

        // Look for component in file
        if (content.includes(`function ${componentName}`) ||
            content.includes(`class ${componentName}`) ||
            content.includes(`const ${componentName}`) ||
            content.includes(`export.*${componentName}`)) {
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
    const sparkFile = await this.findComponent(componentName);
    if (!sparkFile) {
      console.log(`❌ Spark file not found for: ${componentName}`);
      console.log(`💡 Available prefixes: ${Object.keys(this.getStaticMappings()).join(', ')}`);
      return null;
    }

    // Read spark content
    const sparkContent = fs.readFileSync(sparkFile, 'utf8');

    // Extract specific component
    const componentCode = extractJsComponent(sparkContent, componentName);
    if (!componentCode) {
      console.log(`❌ Component not found: ${componentName}`);
      return null;
    }

    return {
      code: componentCode,
      source: sparkFile,
      type: 'javascript'
    };
  }

  async searchComponents(searchTerm) {
    const results = [];
    const sourceDir = this.getSourceDirectory();

    try {
      const sparkFiles = fs.readdirSync(sourceDir).filter(file =>
        file.endsWith('.js') || file.endsWith('.ts')
      );

      for (const sparkFile of sparkFiles) {
        const fullPath = path.join(sourceDir, sparkFile);
        const content = fs.readFileSync(fullPath, 'utf8');

        // Look for functions, classes, and exports containing search term
        const patterns = [
          /function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g,
          /class\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g,
          /const\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g,
          /export.*([a-zA-Z_$][a-zA-Z0-9_$]*)/g
        ];

        for (const pattern of patterns) {
          let match;
          while ((match = pattern.exec(content)) !== null) {
            const componentName = match[1];
            if (componentName.includes(searchTerm) || searchTerm.includes(componentName)) {
              results.push({
                component: componentName,
                file: sparkFile,
                type: 'javascript'
              });
            }
          }
        }
      }
    } catch (error) {
      console.warn('⚠️  Error in search:', error.message);
    }

    return results;
  }
}