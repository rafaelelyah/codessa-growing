/**
 * Component Promoter
 * Handles copying components from wood/ to projects with dependency resolution
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ComponentPromoter {
  constructor(configManager) {
    this.config = configManager;
    this.woodPath = path.join(__dirname, '../../wood');
    this.mygrovesPath = path.join(__dirname, '../../mygroves');
  }

  /**
   * Get available component types
   */
  async getComponentTypes() {
    // Only allow these specific component types for promotion
    const allowedTypes = ['leafs', 'sprouts', 'trunks', 'sparks'];

    // Check which of these actually exist in wood/
    const existingTypes = [];
    for (const type of allowedTypes) {
      try {
        const typePath = path.join(this.woodPath, type);
        await fs.access(typePath);
        existingTypes.push(type);
      } catch {
        // Type doesn't exist, skip it
      }
    }

    return existingTypes;
  }

  /**
   * Get available components of a specific type
   */
  async getComponents(componentType) {
    try {
      const typePath = path.join(this.woodPath, componentType);
      const entries = await fs.readdir(typePath, { withFileTypes: true });

      const components = [];
      for (const entry of entries) {
        if (entry.isDirectory()) {
          components.push(entry.name);
        } else if (entry.isFile() && path.extname(entry.name) === '.scss') {
          // For SCSS files, remove extension
          components.push(path.basename(entry.name, '.scss'));
        }
      }

      return components;
    } catch (error) {
      throw new Error(`Failed to read ${componentType} directory: ${error.message}`);
    }
  }

  /**
   * Get available target projects
   */
  async getTargetProjects() {
    try {
      const entries = await fs.readdir(this.mygrovesPath, { withFileTypes: true });
      return entries
        .filter(entry => entry.isDirectory())
        .map(entry => entry.name);
    } catch (error) {
      throw new Error(`Failed to read mygroves directory: ${error.message}`);
    }
  }

  /**
   * Analyze dependencies for a trunk component
   */
  async analyzeDependencies(componentType, componentName) {
    const dependencies = {
      leafs: new Set(),
      sprouts: new Set(),
      trunks: new Set(),
      sparks: new Set()
    };

    if (componentType !== 'trunks') {
      return dependencies;
    }

    try {
      const componentPath = path.join(this.woodPath, componentType, `${componentName}.scss`);
      const content = await fs.readFile(componentPath, 'utf-8');

      // Parse SCSS imports
      const importRegex = /@import\s+['"](.*?)['"]/g;
      let match;

      while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];

        // Check if it's a relative import from terrain
        if (importPath.startsWith('../terrain/')) {
          const parts = importPath.split('/');
          if (parts.length >= 3) {
            const category = parts[2]; // leafs, sprouts, etc.
            if (['leafs', 'sprouts', 'trunks', 'sparks'].includes(category)) {
              if (parts.length >= 4) {
                const depName = path.basename(parts[3], '.scss');
                dependencies[category].add(depName);
              }
            }
          }
        }
      }
    } catch (error) {
      // If file doesn't exist or can't be read, continue without dependencies
      console.warn(`Warning: Could not analyze dependencies for ${componentName}: ${error.message}`);
    }

    return dependencies;
  }

  /**
   * Promote a component to a target project
   */
  async promote(componentType, componentName, targetProject, options = {}) {
    const {
      includeDependencies = true,
      force = false,
      backup = true
    } = options;

    const results = {
      success: true,
      copied: [],
      skipped: [],
      errors: []
    };

    try {
      // Validate paths
      const sourcePath = componentType === 'trunks'
        ? path.join(this.woodPath, componentType, `${componentName}.scss`)
        : path.join(this.woodPath, componentType, componentName);

      const targetProjectPath = path.join(this.mygrovesPath, targetProject);
      const targetPath = path.join(targetProjectPath, 'src', componentType, componentName);

      // Check if source exists
      try {
        await fs.access(sourcePath);
      } catch {
        throw new Error(`Component ${componentType}/${componentName} not found in wood/`);
      }

      // Check if target project exists
      try {
        await fs.access(targetProjectPath);
      } catch {
        throw new Error(`Target project ${targetProject} not found in mygroves/`);
      }

      // Analyze dependencies if needed
      let dependencies = { leafs: new Set(), sprouts: new Set(), trunks: new Set(), sparks: new Set() };
      if (includeDependencies && componentType === 'trunks') {
        dependencies = await this.analyzeDependencies(componentType, componentName);
      }

      // Copy main component
      await this.copyComponent(componentType, componentName, sourcePath, targetPath, force, backup, results);

      // Copy dependencies
      if (includeDependencies) {
        for (const [depType, depNames] of Object.entries(dependencies)) {
          for (const depName of depNames) {
            const depSourcePath = depType === 'trunks'
              ? path.join(this.woodPath, depType, `${depName}.scss`)
              : path.join(this.woodPath, depType, depName);

            const depTargetPath = path.join(targetProjectPath, 'src', depType, depName);

            try {
              await this.copyComponent(depType, depName, depSourcePath, depTargetPath, force, backup, results);
            } catch (error) {
              results.errors.push(`Failed to copy dependency ${depType}/${depName}: ${error.message}`);
            }
          }
        }
      }

    } catch (error) {
      results.success = false;
      results.errors.push(error.message);
    }

    return results;
  }

  /**
   * Copy a single component
   */
  async copyComponent(componentType, componentName, sourcePath, targetPath, force, backup, results) {
    try {
      // Check if target exists
      const targetExists = await this.fileExists(targetPath);

      if (targetExists && !force) {
        results.skipped.push(`${componentType}/${componentName}`);
        return;
      }

      // Create backup if needed
      if (targetExists && backup) {
        const backupPath = `${targetPath}.backup`;
        await fs.copyFile(targetPath, backupPath);
      }

      // Ensure target directory exists
      await fs.mkdir(path.dirname(targetPath), { recursive: true });

      // Copy file or directory
      const stat = await fs.stat(sourcePath);
      if (stat.isDirectory()) {
        await this.copyDirectory(sourcePath, targetPath);
      } else {
        await fs.copyFile(sourcePath, targetPath);
      }

      results.copied.push(`${componentType}/${componentName}`);

    } catch (error) {
      throw new Error(`Failed to copy ${componentType}/${componentName}: ${error.message}`);
    }
  }

  /**
   * Copy directory recursively
   */
  async copyDirectory(source, target) {
    await fs.mkdir(target, { recursive: true });
    const entries = await fs.readdir(source, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(source, entry.name);
      const destPath = path.join(target, entry.name);

      if (entry.isDirectory()) {
        await this.copyDirectory(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  }

  /**
   * Check if file exists
   */
  async fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}