/**
 * Grow - Soils Component Manager
 * Handles theme/variant extraction from soils
 */

import fs from 'fs';
import path from 'path';
import { BaseComponentManager, extractScssComponent } from './base.js';

export class SoilsManager extends BaseComponentManager {
  constructor(config = {}) {
    super('soils', config);
  }

  // Static mappings for soils
  getStaticMappings() {
    return {
      // Base soil
      'soil': '_soil.scss',

      // Variants
      'compact': '_soil.compact.scss',
      'dark': '_soil.dark.scss',
      'spacious': '_soil.spacious.scss'
    };
  }

  async findComponent(themeName) {
    const sourceDir = this.getSourceDirectory();

    // First, try static mapping
    const staticMappings = this.getStaticMappings();
    for (const [prefix, filename] of Object.entries(staticMappings)) {
      if (themeName.startsWith(`${prefix}-`) || themeName === prefix) {
        const soilFile = path.join(sourceDir, filename);
        if (this.validateSourceExists(soilFile)) {
          this.updateCacheMapping(themeName, soilFile);
          return soilFile;
        }
      }
    }

    // Second, check persistent cache
    if (this.cache.mappings[themeName]) {
      const soilFile = path.join(sourceDir, this.cache.mappings[themeName]);
      if (this.validateSourceExists(soilFile)) {
        return soilFile;
      }
    }

    // Third, automatic discovery
    try {
      const soilFiles = fs.readdirSync(sourceDir).filter(file =>
        file.endsWith('.scss') && file.startsWith('_')
      );

      for (const soilFile of soilFiles) {
        const fullPath = path.join(sourceDir, soilFile);
        const content = fs.readFileSync(fullPath, 'utf8');

        // Look for theme/variant in file
        if (content.includes(`.${themeName}`) ||
            content.includes(`--${themeName}`) ||
            soilFile.includes(themeName)) {
          this.updateCacheMapping(themeName, fullPath);
          return fullPath;
        }
      }
    } catch (error) {
      console.warn('⚠️  Error in automatic discovery:', error.message);
    }

    return null;
  }

  async extractComponent(themeName, options = {}) {
    const soilFile = await this.findComponent(themeName);
    if (!soilFile) {
      console.log(`❌ Soil file not found for: ${themeName}`);
      console.log(`💡 Available themes: ${Object.keys(this.getStaticMappings()).join(', ')}`);
      return null;
    }

    // Read soil content
    const soilContent = fs.readFileSync(soilFile, 'utf8');

    // For soils, we might extract specific theme variables or the entire file
    if (options.extractVariables) {
      const variables = this.extractThemeVariables(soilContent);
      return {
        code: variables,
        source: soilFile,
        type: 'scss-variables'
      };
    }

    return {
      code: soilContent,
      source: soilFile,
      type: 'scss'
    };
  }

  async searchComponents(searchTerm) {
    const results = [];
    const sourceDir = this.getSourceDirectory();

    try {
      const soilFiles = fs.readdirSync(sourceDir).filter(file =>
        file.endsWith('.scss') && file.startsWith('_')
      );

      for (const soilFile of soilFiles) {
        const fullPath = path.join(sourceDir, soilFile);
        const content = fs.readFileSync(fullPath, 'utf8');

        // Look for CSS custom properties and SCSS variables
        const varRegex = /(\$[a-zA-Z][a-zA-Z0-9-_]*|--[a-zA-Z][a-zA-Z0-9-_]*)/g;
        let match;

        while ((match = varRegex.exec(content)) !== null) {
          const varName = match[1];
          if (varName.includes(searchTerm) || searchTerm.includes(varName.replace(/^[\$--]/, ''))) {
            results.push({
              component: varName,
              file: soilFile,
              type: 'scss-variable'
            });
          }
        }

        // Also look for class names
        const classRegex = /\.([a-zA-Z][a-zA-Z0-9-]*)/g;
        while ((match = classRegex.exec(content)) !== null) {
          const className = match[1];
          if (className.includes(searchTerm)) {
            results.push({
              component: className,
              file: soilFile,
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

  extractThemeVariables(content) {
    const variables = [];
    const lines = content.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      // Look for SCSS variables and CSS custom properties
      if (trimmed.startsWith('$') || trimmed.includes('--')) {
        variables.push(trimmed);
      }
    }

    return variables.join('\n');
  }
}