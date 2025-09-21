/**
 * 🌱 Grow Config Manager
 * Manages configuration and paths for Grow
 */

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ConfigManager {
  constructor() {
    this.config = {
      // Base paths
      ROOT_DIR: path.join(__dirname, '..', '..'),
      GROW_DIR: __dirname,
      WOOD_DIR: path.join(__dirname, '..', '..', 'wood'),
      GROVES_DIR: path.join(__dirname, '..', '..', 'groves'),
      MYGROVES_DIR: path.join(__dirname, '..', '..', 'mygroves'),

      // Project types
      PROJECT_TYPES: {
        SASS: 'sass',
        VITE: 'vite',
        JSON: 'json'
      },

      // Component types
      COMPONENT_TYPES: {
        TRUNKS: 'trunks',
        SPROUTS: 'sprouts',
        LEAFS: 'leafs',
        SPARKS: 'sparks',
        SOILS: 'soils',
        SEEDS: 'seeds',
        BARKS: 'barks',
        HARVEST: 'harvest'
      }
    };
  }

  // Get configuration value
  get(key) {
    return this.config[key];
  }

  // Get full path for a project
  getProjectPath(projectName) {
    return path.join(this.config.MYGROVES_DIR, projectName);
  }

  // Get wood component path
  getWoodPath(componentType) {
    return path.join(this.config.WOOD_DIR, componentType);
  }

  // Validate project type
  isValidProjectType(type) {
    return Object.values(this.config.PROJECT_TYPES).includes(type);
  }

  // Get all project types
  getProjectTypes() {
    return Object.values(this.config.PROJECT_TYPES);
  }

  // Get default project type
  getDefaultProjectType() {
    return this.config.PROJECT_TYPES.VITE;
  }
}