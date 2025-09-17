/**
 * Grow - Component Manager for Codessa
 * Base module for component management
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base configuration
export const CONFIG = {
  PROJECT_ROOT: path.join(__dirname, '..', '..'),
  SRC_DIR: path.join(__dirname, '..', '..', 'src'),
  TERRAIN_DIR: path.join(__dirname, '..', '..', 'src', 'terrain'),
  CACHE_FILE: path.join(__dirname, '..', 'grow-cache.json')
};

// Base component types
export const COMPONENT_TYPES = {
  TRUNKS: 'trunks',
  SPROUTS: 'sprouts',
  LEAFS: 'leafs',
  SPARKS: 'sparks',
  SOILS: 'soils',
  SEEDS: 'seeds',
  BARKS: 'barks',
  HARVEST: 'harvest'
};

// Base class for component managers
export class BaseComponentManager {
  constructor(type, config = {}) {
    this.type = type;
    this.config = { ...CONFIG, ...config };
    this.cache = this.loadCache();
  }

  // Load persistent cache
  loadCache() {
    try {
      if (fs.existsSync(this.config.CACHE_FILE)) {
        const cacheData = fs.readFileSync(this.config.CACHE_FILE, 'utf8');
        return JSON.parse(cacheData);
      }
    } catch (error) {
      console.warn(`⚠️  Error loading cache for ${this.type}:`, error.message);
    }
    return { mappings: {}, lastUpdated: null };
  }

  // Save cache
  saveCache() {
    try {
      this.cache.lastUpdated = new Date().toISOString();
      fs.writeFileSync(this.config.CACHE_FILE, JSON.stringify(this.cache, null, 2));
    } catch (error) {
      console.warn(`⚠️  Error saving cache for ${this.type}:`, error.message);
    }
  }

  // Abstract methods to be implemented by subclasses
  async findComponent(componentName) {
    throw new Error('findComponent must be implemented by subclass');
  }

  async extractComponent(componentName, options = {}) {
    throw new Error('extractComponent must be implemented by subclass');
  }

  async searchComponents(searchTerm) {
    throw new Error('searchComponents must be implemented by subclass');
  }

  // Common utility methods
  updateCacheMapping(componentName, sourceFile) {
    const sourceFilename = path.basename(sourceFile);

    if (!this.cache.mappings[componentName]) {
      this.cache.mappings[componentName] = sourceFilename;
      this.saveCache();
      console.log(`📚 Learned mapping: ${componentName} → ${sourceFilename}`);
    }
  }

  getSourceDirectory() {
    switch (this.type) {
      case COMPONENT_TYPES.TRUNKS:
        return path.join(this.config.TERRAIN_DIR, 'trunks', 'SASS');
      case COMPONENT_TYPES.SPROUTS:
        return path.join(this.config.TERRAIN_DIR, 'sprouts');
      case COMPONENT_TYPES.LEAFS:
        return path.join(this.config.TERRAIN_DIR, 'leafs');
      case COMPONENT_TYPES.SPARKS:
        return path.join(this.config.SRC_DIR, 'sparks');
      case COMPONENT_TYPES.SOILS:
        return path.join(this.config.TERRAIN_DIR, 'soils');
      case COMPONENT_TYPES.SEEDS:
        return path.join(this.config.TERRAIN_DIR, 'seeds');
      case COMPONENT_TYPES.BARKS:
        return path.join(this.config.TERRAIN_DIR, 'foundation');
      case COMPONENT_TYPES.HARVEST:
        return path.join(this.config.SRC_DIR, 'harvest');
      default:
        return this.config.SRC_DIR;
    }
  }

  validateSourceExists(sourcePath) {
    return fs.existsSync(sourcePath);
  }
}

// Utility functions
export function parseComponentArg(arg) {
  // Check for renaming (format: component:newname)
  const parts = arg.split(':');
  if (parts.length === 2) {
    return {
      component: parts[0],
      newName: parts[1]
    };
  } else {
    return {
      component: arg,
      newName: null
    };
  }
}

export function extractScssComponent(content, componentName) {
  // Preserve HTML annotations in comments
  const lines = content.split('\n');
  let componentLines = [];
  let inComponent = false;
  let braceCount = 0;
  let componentStartLine = -1;

  // First pass: find component and collect all relevant lines including annotations
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if this line starts a component
    if (!inComponent && line.trim().match(new RegExp(`^\\.${componentName}\\s*\\{`))) {
      inComponent = true;
      componentStartLine = i;
      braceCount = 0;
      componentLines = [];

      // Include any HTML annotation comments that come before the component
      for (let j = Math.max(0, i - 5); j < i; j++) {
        if (lines[j].trim().startsWith('// @html-')) {
          componentLines.push(lines[j]);
        }
      }

      componentLines.push(line);
      // Count opening braces in this line
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;
      continue;
    }

    if (inComponent) {
      // Add the line to component
      componentLines.push(line);
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;

      // If brace count reaches 0, we've found the end of the component
      if (braceCount === 0) {
        break;
      }
    }
  }

  if (componentLines.length > 0) {
    return componentLines.join('\n').trim();
  }

  return null;
}

export function extractJsComponent(content, componentName) {
  // Look for function/class definitions
  const functionRegex = new RegExp(`(?:function|class|const)\\s+${componentName}\\s*[=\\(]([^}]*)}`, 'g');
  const match = functionRegex.exec(content);

  if (match) {
    return match[0];
  }

  return null;
}

export function extractScssMixin(content, mixinName) {
  // Remove comments for easier extraction
  const cleanContent = content.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');

  // Look for mixin definition with proper brace matching
  const lines = cleanContent.split('\n');
  let inMixin = false;
  let braceCount = 0;
  let mixinLines = [];
  let mixinStartLine = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check if this line starts a mixin
    if (!inMixin && line.match(new RegExp(`@mixin\\s+${mixinName}\\s*\\(`))) {
      inMixin = true;
      mixinStartLine = i;
      braceCount = 0;
      mixinLines = [line];
      // Count opening braces in this line
      braceCount += (line.match(/\{/g) || []).length;
      continue;
    }

    if (inMixin) {
      mixinLines.push(line);
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;

      // If brace count reaches 0, we've found the end of the mixin
      if (braceCount === 0) {
        break;
      }
    }
  }

  if (mixinLines.length > 0) {
    return mixinLines.join('\n').trim();
  }

  return null;
}