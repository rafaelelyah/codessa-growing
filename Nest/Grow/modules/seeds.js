/**
 * Grow - Seeds Component Manager
 * Handles design token extraction from seeds
 */

import fs from 'fs';
import path from 'path';
import { BaseComponentManager, extractScssComponent } from './base.js';

export class SeedsManager extends BaseComponentManager {
  constructor(config = {}) {
    super('seeds', config);
  }

  // Static mappings for seeds
  getStaticMappings() {
    return {
      // Layout and spacing
      'layout': '_layout.scss',
      'spacing': '_spacing.scss',

      // Colors and typography
      'color': '_palette.scss',
      'palette': '_palette.scss',
      'type': '_type.scss',
      'typography': '_type.scss',

      // Motion and effects
      'motion': '_motion.scss',

      // Outlines and borders
      'outline': '_outline.scss',

      // Scale and sizing
      'scale': '_scale.scss'
    };
  }

  async findComponent(tokenName) {
    const sourceDir = this.getSourceDirectory();

    // First, try static mapping
    const staticMappings = this.getStaticMappings();
    for (const [prefix, filename] of Object.entries(staticMappings)) {
      if (tokenName.startsWith(`${prefix}-`) || tokenName === prefix) {
        const seedFile = path.join(sourceDir, filename);
        if (this.validateSourceExists(seedFile)) {
          this.updateCacheMapping(tokenName, seedFile);
          return seedFile;
        }
      }
    }

    // Second, check persistent cache
    if (this.cache.mappings[tokenName]) {
      const seedFile = path.join(sourceDir, this.cache.mappings[tokenName]);
      if (this.validateSourceExists(seedFile)) {
        return seedFile;
      }
    }

    // Third, automatic discovery
    try {
      const seedFiles = fs.readdirSync(sourceDir).filter(file =>
        file.endsWith('.scss') && file.startsWith('_')
      );

      for (const seedFile of seedFiles) {
        const fullPath = path.join(sourceDir, seedFile);
        const content = fs.readFileSync(fullPath, 'utf8');

        // Look for design token in file
        if (content.includes(`$${tokenName}`) ||
            content.includes(`--${tokenName}`) ||
            content.includes(tokenName)) {
          this.updateCacheMapping(tokenName, fullPath);
          return fullPath;
        }
      }
    } catch (error) {
      console.warn('⚠️  Error in automatic discovery:', error.message);
    }

    return null;
  }

  async extractComponent(tokenName, options = {}) {
    const seedFile = await this.findComponent(tokenName);
    if (!seedFile) {
      console.log(`❌ Seed file not found for: ${tokenName}`);
      console.log(`💡 Available tokens: ${Object.keys(this.getStaticMappings()).join(', ')}`);
      return null;
    }

    // Read seed content
    const seedContent = fs.readFileSync(seedFile, 'utf8');

    // Extract specific token or related tokens
    if (options.extractToken) {
      const tokenCode = this.extractDesignToken(seedContent, tokenName);
      return {
        code: tokenCode,
        source: seedFile,
        type: 'scss-token'
      };
    }

    return {
      code: seedContent,
      source: seedFile,
      type: 'scss'
    };
  }

  async searchComponents(searchTerm) {
    const results = [];
    const sourceDir = this.getSourceDirectory();

    try {
      const seedFiles = fs.readdirSync(sourceDir).filter(file =>
        file.endsWith('.scss') && file.startsWith('_')
      );

      for (const seedFile of seedFiles) {
        const fullPath = path.join(sourceDir, seedFile);
        const content = fs.readFileSync(fullPath, 'utf8');

        // Look for SCSS variables and CSS custom properties
        const tokenRegex = /(\$[a-zA-Z][a-zA-Z0-9-_]*|--[a-zA-Z][a-zA-Z0-9-_]*)/g;
        let match;

        while ((match = tokenRegex.exec(content)) !== null) {
          const tokenName = match[1];
          if (tokenName.includes(searchTerm) || searchTerm.includes(tokenName.replace(/^[\$--]/, ''))) {
            results.push({
              component: tokenName,
              file: seedFile,
              type: 'scss-token'
            });
          }
        }
      }
    } catch (error) {
      console.warn('⚠️  Error in search:', error.message);
    }

    return results;
  }

  extractDesignToken(content, tokenName) {
    const lines = content.split('\n');
    const tokens = [];

    for (const line of lines) {
      const trimmed = line.trim();
      // Look for the specific token
      if (trimmed.includes(`$${tokenName}`) || trimmed.includes(`--${tokenName}`)) {
        tokens.push(trimmed);
      }
    }

    return tokens.join('\n');
  }
}