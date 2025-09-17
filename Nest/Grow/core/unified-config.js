/**
 * 🌱 Codessa Grow - Unified Configuration
 * Integrates local and sync operations
 */

import { LocalOperations } from './local-operations.js';
import { SyncOperations } from './sync-operations.js';
import { parseComponentArg } from '../modules/base.js';

export class GrowConfig {
  constructor(growInstance) {
    this.grow = growInstance;
    this.localOps = new LocalOperations(growInstance);
    this.syncOps = new SyncOperations(growInstance);
  }

  // ========================================
  // UNIFIED SEARCH
  // ========================================

  async search(searchTerm, options = {}) {
    const { online = false, local = true } = options;

    let allResults = [];

    // Search locally
    if (local) {
      const localResults = await this.localOps.searchLocal(searchTerm, options.type);
      allResults.push(...localResults.map(r => ({ ...r, source: 'local' })));
    }

    // Search online if requested
    if (online) {
      const onlineResults = await this.syncOps.searchOnline(searchTerm, options);
      allResults.push(...onlineResults.map(r => ({ ...r, source: 'online' })));
    }

    // Sort results by relevance
    allResults.sort((a, b) => {
      // Prioritize local results
      if (a.source === 'local' && b.source !== 'local') return -1;
      if (a.source !== 'local' && b.source === 'local') return 1;

      // Then by component type match
      if (options.type && a.componentType === options.type && b.componentType !== options.type) return -1;
      if (options.type && a.componentType !== options.type && b.componentType === options.type) return 1;

      return 0;
    });

    return allResults;
  }

  // ========================================
  // UNIFIED GROWTH
  // ========================================

  async grow(components, options = {}) {
    const { online = false, local = true } = options;

    const results = [];

    for (const componentArg of components) {
      const { component, newName } = parseComponentArg(componentArg);

      // Try local first
      if (local) {
        const localResult = await this.localOps.growComponentLocal(component, newName, options);
        if (localResult) {
          results.push({ ...localResult, source: 'local' });
          continue;
        }
      }

      // If not found locally and online is enabled, try online
      if (online && !local) {
        const onlineResult = await this.syncOps.downloadOnline(component, options);
        if (onlineResult) {
          results.push({ ...onlineResult, source: 'online' });
          continue;
        }
      }

      // Component not found
      console.log(`❌ Component not found: ${component}`);
      results.push({ component, found: false });
    }

    return results;
  }

  // ========================================
  // UNIFIED CLEANUP
  // ========================================

  async clean(components, options = {}) {
    const { online = false, local = true } = options;

    if (options.all) {
      return await this.cleanAll(options);
    }

    const results = [];

    for (const component of components) {
      // Clean locally
      if (local) {
        const localResult = await this.localOps.cleanComponentLocal(component, options);
        results.push({ component, local: localResult });
      }

      // Clean online cache if requested
      if (online) {
        // Implementation for cleaning online cache
        results.push({ component, online: true });
      }
    }

    return results;
  }

  async cleanAll(options = {}) {
    const { online = false, local = true } = options;

    const results = {};

    if (local) {
      results.local = await this.localOps.cleanAllLocal();
    }

    if (online) {
      // Clean online cache
      results.online = true;
    }

    return results;
  }

  // ========================================
  // SYNC MANAGEMENT
  // ========================================

  async initialize() {
    await this.syncOps.initializeSync();
  }

  async syncRepository(repoName, options = {}) {
    return await this.syncOps.syncRepository(repoName, options);
  }

  async listSyncedComponents() {
    return await this.syncOps.listSyncedComponents();
  }

  // ========================================
  // REPOSITORY MANAGEMENT
  // ========================================

  addRepository(name, url, type = 'github') {
    this.syncOps.addRepository(name, url, type);
  }

  removeRepository(name) {
    return this.syncOps.removeRepository(name);
  }

  listRepositories() {
    this.syncOps.listRepositories();
  }

  // ========================================
  // UTILITY METHODS
  // ========================================

  getStats() {
    return {
      local: {
        // Local stats would go here
      },
      sync: {
        repositories: this.syncOps.syncConfig.repositories.length,
        // Sync stats would go here
      }
    };
  }
}