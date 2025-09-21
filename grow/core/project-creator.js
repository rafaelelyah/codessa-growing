/**
 * Grow Project Creator
 * Handles creation of new projects
 */

import fs from 'fs-extra';
import path from 'path';
import { SassProjectInit } from '../modules/project-init/sass-project-init.js';
import { ViteProjectInit } from '../modules/project-init/vite-project-init.js';
import { JsonProjectInit } from '../modules/project-init/json-project-init.js';

export class ProjectCreator {
  constructor(configManager) {
    this.config = configManager;

    // Initialize project type handlers
    this.initializers = {
      [this.config.get('PROJECT_TYPES').SASS]: new SassProjectInit(configManager),
      [this.config.get('PROJECT_TYPES').VITE]: new ViteProjectInit(configManager),
      [this.config.get('PROJECT_TYPES').JSON]: new JsonProjectInit(configManager)
    };
  }

  async create(projectName, options = {}) {
    try {
      const { type = this.config.getDefaultProjectType(), force = false, verbose = false } = options;

      // Validate project type
      if (!this.config.isValidProjectType(type)) {
        return {
          success: false,
          error: `Invalid project type: ${type}. Valid types: ${this.config.getProjectTypes().join(', ')}`
        };
      }

      // Check if project already exists
      const projectPath = this.config.getProjectPath(projectName);
      const exists = await fs.pathExists(projectPath);

      if (exists && !force) {
        return {
          success: false,
          error: `Project "${projectName}" already exists. Use --force to overwrite.`
        };
      }

      if (exists && force) {
        if (verbose) console.log(`🗑️  Removing existing project: ${projectName}`);
        await fs.remove(projectPath);
      }

      // Ensure mygroves directory exists
      await fs.ensureDir(this.config.get('MYGROVES_DIR'));

      if (verbose) console.log(`📁 Creating project: ${projectName} (${type})`);

      // Get the appropriate initializer
      const initializer = this.initializers[type];
      if (!initializer) {
        return {
          success: false,
          error: `No initializer found for project type: ${type}`
        };
      }

      // Create the project
      const result = await initializer.create(projectName, options);

      if (result.success) {
        return {
          success: true,
          path: projectPath,
          type: type,
          ...result
        };
      } else {
        return {
          success: false,
          error: result.error || 'Unknown error during project creation'
        };
      }

    } catch (error) {
      return {
        success: false,
        error: `Project creation failed: ${error.message}`
      };
    }
  }

  // Get available project types
  getAvailableTypes() {
    return this.config.getProjectTypes();
  }

  // Validate project name
  validateProjectName(name) {
    // Basic validation: no special characters, not empty, reasonable length
    const validName = /^[a-zA-Z][a-zA-Z0-9-_]*$/;
    return validName.test(name) && name.length >= 2 && name.length <= 50;
  }
}