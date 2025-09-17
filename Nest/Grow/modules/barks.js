/**
 * Grow - Barks Component Manager
 * Handles foundation component extraction from barks
 */

import fs from 'fs';
import path from 'path';
import { BaseComponentManager, extractScssComponent } from './base.js';

export class BarksManager extends BaseComponentManager {
  constructor(config = {}) {
    super('barks', config);
  }

  // Static mappings for barks
  getStaticMappings() {
    return {
      // Foundation files
      'foundation': '_foundation.scss',
      'bark': '_bark.scss'
    };
  }

  async findComponent(barkName) {
    const sourceDir = this.getSourceDirectory();

    // First, try static mapping
    const staticMappings = this.getStaticMappings();
    for (const [prefix, filename] of Object.entries(staticMappings)) {
      if (barkName.startsWith(`${prefix}-`) || barkName === prefix) {
        const barkFile = path.join(sourceDir, filename);
        if (this.validateSourceExists(barkFile)) {
          this.updateCacheMapping(barkName, barkFile);
          return barkFile;
        }
      }
    }

    // Second, check persistent cache
    if (this.cache.mappings[barkName]) {
      const barkFile = path.join(sourceDir, this.cache.mappings[barkName]);
      if (this.validateSourceExists(barkFile)) {
        return barkFile;
      }
    }

    // Third, automatic discovery
    try {
      const barkFiles = fs.readdirSync(sourceDir).filter(file =>
        file.endsWith('.scss') && file.startsWith('_')
      );

      for (const barkFile of barkFiles) {
        const fullPath = path.join(sourceDir, barkFile);
        const content = fs.readFileSync(fullPath, 'utf8');

        // Look for foundation component in file
        if (content.includes(`.${barkName}`) ||
            content.includes(`&--${barkName.split('-').pop()}`) ||
            barkFile.includes(barkName)) {
          this.updateCacheMapping(barkName, fullPath);
          return barkFile;
        }
      }
    } catch (error) {
      console.warn('⚠️  Error in automatic discovery:', error.message);
    }

    return null;
  }

  async extractComponent(barkName, options = {}) {
    const barkFile = await this.findComponent(barkName);
    if (!barkFile) {
      console.log(`❌ Bark file not found for: ${barkName}`);
      console.log(`💡 Available foundations: ${Object.keys(this.getStaticMappings()).join(', ')}`);
      return null;
    }

    // Read bark content
    const barkContent = fs.readFileSync(barkFile, 'utf8');

    // Extract specific foundation component
    const componentCode = extractScssComponent(barkContent, barkName);
    if (!componentCode) {
      console.log(`❌ Foundation component not found: ${barkName}`);
      return null;
    }

    return {
      code: componentCode,
      source: barkFile,
      type: 'scss'
    };
  }

  async searchComponents(searchTerm) {
    const results = [];
    const sourceDir = this.getSourceDirectory();

    try {
      const barkFiles = fs.readdirSync(sourceDir).filter(file =>
        file.endsWith('.scss') && file.startsWith('_')
      );

      for (const barkFile of barkFiles) {
        const fullPath = path.join(sourceDir, barkFile);
        const content = fs.readFileSync(fullPath, 'utf8');

        // Look for foundation classes containing search term
        const classRegex = /\.([a-zA-Z][a-zA-Z0-9-]*)/g;
        let match;

        while ((match = classRegex.exec(content)) !== null) {
          const barkComponent = match[1];
          if (barkComponent.includes(searchTerm) || searchTerm.includes(barkComponent.split('-')[0])) {
            results.push({
              component: barkComponent,
              file: barkFile,
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