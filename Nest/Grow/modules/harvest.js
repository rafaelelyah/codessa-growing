/**
 * Grow - Harvest Component Manager
 * Handles asset extraction from harvest directory
 */

import fs from 'fs';
import path from 'path';
import { BaseComponentManager } from './base.js';

export class HarvestManager extends BaseComponentManager {
  constructor(config = {}) {
    super('harvest', config);
  }

  // Asset types in harvest
  getAssetTypes() {
    return {
      'image': 'images',
      'video': 'videos',
      'audio': 'audio',
      'text': 'text',
      'icon': 'icons',
      'font': 'fonts'
    };
  }

  async findComponent(assetName) {
    const sourceDir = this.getSourceDirectory();

    // Check each asset subdirectory
    const assetTypes = this.getAssetTypes();

    for (const [type, subdir] of Object.entries(assetTypes)) {
      if (assetName.startsWith(`${type}-`)) {
        const assetDir = path.join(sourceDir, subdir);

        if (this.validateSourceExists(assetDir)) {
          try {
            const files = fs.readdirSync(assetDir);

            // Look for matching asset
            for (const file of files) {
              const baseName = path.parse(file).name;
              if (baseName === assetName || baseName.includes(assetName.split('-').slice(1).join('-'))) {
                const assetPath = path.join(assetDir, file);
                this.updateCacheMapping(assetName, assetPath);
                return assetPath;
              }
            }
          } catch (error) {
            console.warn(`⚠️  Error scanning ${subdir}:`, error.message);
          }
        }
      }
    }

    // Check persistent cache
    if (this.cache.mappings[assetName]) {
      if (this.validateSourceExists(this.cache.mappings[assetName])) {
        return this.cache.mappings[assetName];
      }
    }

    // Automatic discovery across all subdirectories
    try {
      const subdirs = Object.values(this.getAssetTypes());

      for (const subdir of subdirs) {
        const assetDir = path.join(sourceDir, subdir);

        if (this.validateSourceExists(assetDir)) {
          const files = fs.readdirSync(assetDir);

          for (const file of files) {
            const baseName = path.parse(file).name;
            if (baseName.includes(assetName) || assetName.includes(baseName)) {
              const assetPath = path.join(assetDir, file);
              this.updateCacheMapping(assetName, assetPath);
              return assetPath;
            }
          }
        }
      }
    } catch (error) {
      console.warn('⚠️  Error in automatic discovery:', error.message);
    }

    return null;
  }

  async extractComponent(assetName, options = {}) {
    // First try to find locally
    const assetPath = await this.findComponent(assetName);
    if (assetPath) {
      // For local assets, return path info
      const stats = fs.statSync(assetPath);
      const ext = path.extname(assetPath).toLowerCase();

      return {
        path: assetPath,
        source: assetPath,
        type: this.getAssetTypeFromExtension(ext),
        size: stats.size,
        modified: stats.mtime.toISOString(),
        code: null, // Assets don't have code, just paths
        strategy: 'local'
      };
    }

    // If not found locally and online download is requested
    if (options.online) {
      console.log(`🔄 Asset ${assetName} not found locally, attempting online download...`);

      // Use sync operations for direct download
      if (this.grow && this.grow.unified && this.grow.unified.syncOps) {
        const component = {
          name: assetName,
          type: 'harvest',
          repository: options.repository || 'codessa-registry'
        };

        const downloadResult = await this.grow.unified.syncOps.downloadDirect(component, options);
        if (downloadResult) {
          return {
            path: downloadResult.localPath,
            source: downloadResult.localPath,
            type: downloadResult.assetType,
            size: 0, // Would need to get actual size after download
            modified: new Date().toISOString(),
            code: null,
            strategy: 'direct-download'
          };
        }
      }
    }

    console.log(`❌ Asset not found: ${assetName}`);
    console.log(`💡 Available types: ${Object.keys(this.getAssetTypes()).join(', ')}`);
    return null;
  }

  async searchComponents(searchTerm) {
    const results = [];
    const sourceDir = this.getSourceDirectory();

    try {
      const subdirs = Object.values(this.getAssetTypes());

      for (const subdir of subdirs) {
        const assetDir = path.join(sourceDir, subdir);

        if (this.validateSourceExists(assetDir)) {
          const files = fs.readdirSync(assetDir);

          for (const file of files) {
            const baseName = path.parse(file).name;
            if (baseName.includes(searchTerm) || searchTerm.includes(baseName)) {
              const assetPath = path.join(assetDir, file);
              const stats = fs.statSync(assetPath);
              const ext = path.extname(assetPath).toLowerCase();

              results.push({
                component: baseName,
                file: file,
                type: this.getAssetTypeFromExtension(ext),
                path: assetPath,
                size: stats.size
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

  /**
   * Downloads asset directly to project asset folders
   * This implements the "direct" strategy for harvest assets
   */
  async downloadAssetDirect(assetName, options = {}) {
    console.log(`📥 Downloading harvest asset directly: ${assetName}`);

    if (!this.grow || !this.grow.unified || !this.grow.unified.syncOps) {
      console.error('❌ Sync operations not available');
      return null;
    }

    const component = {
      name: assetName,
      type: 'harvest',
      repository: options.repository || 'codessa-registry'
    };

    return await this.grow.unified.syncOps.downloadDirect(component, options);
  }

  /**
   * Lists downloaded assets in project asset folders
   */
  async listDownloadedAssets() {
    const results = [];
    const assetTypes = this.getAssetTypes();

    // Get project root from config or use default
    const projectRoot = this.grow ? this.grow.config.PROJECT_ROOT : process.cwd();

    for (const [type, subdir] of Object.entries(assetTypes)) {
      const assetDir = path.join(projectRoot, 'src', 'assets', subdir);

      if (this.validateSourceExists(assetDir)) {
        try {
          const files = fs.readdirSync(assetDir);
          for (const file of files) {
            const filePath = path.join(assetDir, file);
            const stats = fs.statSync(filePath);

            // Skip if it's a directory
            if (stats.isDirectory()) continue;

            results.push({
              name: path.parse(file).name,
              path: filePath,
              type: type,
              size: stats.size,
              modified: stats.mtime.toISOString()
            });
          }
        } catch (error) {
          console.warn(`⚠️  Error scanning ${subdir}:`, error.message);
        }
      }
    }

    return results;
  }

  getAssetTypeFromExtension(ext) {
    const typeMap = {
      '.jpg': 'image',
      '.jpeg': 'image',
      '.png': 'image',
      '.gif': 'image',
      '.svg': 'image',
      '.webp': 'image',
      '.mp4': 'video',
      '.avi': 'video',
      '.mov': 'video',
      '.mp3': 'audio',
      '.wav': 'audio',
      '.txt': 'text',
      '.md': 'text',
      '.json': 'text'
    };

    return typeMap[ext] || 'asset';
  }
}