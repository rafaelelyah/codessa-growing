/**
 * 🌱 Codessa Grow - Sync Operations Core
 * Handles synchronization with online repositories
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { execSync } from 'child_process';

export class SyncOperations {
  constructor(growInstance) {
    this.grow = growInstance;
    this.syncConfig = {
      repositories: [
        {
          name: 'codessa-registry',
          url: 'https://api.github.com/repos/codessa/growing-registry',
          type: 'github'
        }
      ],
      localSyncDir: path.join(this.grow.config.PROJECT_ROOT, 'grow-sync'),
      cacheDir: path.join(this.grow.config.PROJECT_ROOT, 'sync-cache')
    };
  }

  // ========================================
  // SYNC INITIALIZATION
  // ========================================

  async initializeSync() {
    console.log('🔄 Initializing sync operations...');

    // Ensure sync directories exist
    this.ensureSyncDirectories();

    // Load sync configuration
    await this.loadSyncConfig();

    console.log('✅ Sync operations initialized!');
  }

  ensureSyncDirectories() {
    const dirs = [this.syncConfig.localSyncDir, this.syncConfig.cacheDir];

    for (const dir of dirs) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Created sync directory: ${dir}`);
      }
    }
  }

  async loadSyncConfig() {
    const configFile = path.join(this.grow.config.PROJECT_ROOT, 'grow-sync.json');

    if (fs.existsSync(configFile)) {
      try {
        const configData = fs.readFileSync(configFile, 'utf8');
        this.syncConfig = { ...this.syncConfig, ...JSON.parse(configData) };
        console.log('📋 Loaded sync configuration');
      } catch (error) {
        console.warn('⚠️  Error loading sync config:', error.message);
      }
    } else {
      // Create default config
      this.saveSyncConfig();
    }
  }

  saveSyncConfig() {
    const configFile = path.join(this.grow.config.PROJECT_ROOT, 'grow-sync.json');

    try {
      fs.writeFileSync(configFile, JSON.stringify(this.syncConfig, null, 2));
      console.log('💾 Saved sync configuration');
    } catch (error) {
      console.warn('⚠️  Error saving sync config:', error.message);
    }
  }

  // ========================================
  // ONLINE SEARCH OPERATIONS
  // ========================================

  async searchOnline(searchTerm, options = {}) {
    console.log(`🔍 Searching online for "${searchTerm}"...`);

    const results = [];

    for (const repo of this.syncConfig.repositories) {
      try {
        const repoResults = await this.searchRepository(repo, searchTerm, options);
        results.push(...repoResults);
      } catch (error) {
        console.warn(`⚠️  Error searching ${repo.name}:`, error.message);
      }
    }

    return results;
  }

  async searchRepository(repo, searchTerm, options = {}) {
    const results = [];

    switch (repo.type) {
      case 'github':
        return await this.searchGitHubRepository(repo, searchTerm, options);
      case 'gitlab':
        return await this.searchGitLabRepository(repo, searchTerm, options);
      case 'npm':
        return await this.searchNPMPackage(repo, searchTerm, options);
      default:
        console.warn(`⚠️  Unknown repository type: ${repo.type}`);
        return results;
    }
  }

  async searchGitHubRepository(repo, searchTerm, options = {}) {
    // This would integrate with GitHub API
    // For now, return mock results
    console.log(`🔍 Searching GitHub repo: ${repo.name}`);

    return [
      {
        name: `online-${searchTerm}-component`,
        type: 'trunk',
        repository: repo.name,
        url: `${repo.url}/components/${searchTerm}`,
        description: `Online component for ${searchTerm} from ${repo.name}`,
        file: `${repo.url}/components/${searchTerm}`,
        component: `online-${searchTerm}-component`
      }
    ];
  }

  async searchGitLabRepository(repo, searchTerm, options = {}) {
    // GitLab API integration would go here
    console.log(`🔍 Searching GitLab repo: ${repo.name}`);
    return [];
  }

  async searchNPMPackage(repo, searchTerm, options = {}) {
    // NPM registry integration would go here
    console.log(`🔍 Searching NPM package: ${repo.name}`);
    return [];
  }

  // ========================================
  // SYNC STRATEGIES BY ASSET TYPE
  // ========================================

  /**
   * Determines sync strategy based on component type
   * @param {string} componentType - Type of component (seeds, soils, trunks, etc.)
   * @returns {string} - Strategy: 'complete', 'expand', 'template', 'direct'
   */
  getSyncStrategy(componentType) {
    const strategies = {
      // Complete downloads - full libraries
      'seeds': 'complete',
      'soils': 'complete',

      // Library expansion - individual components
      'leafs': 'expand',
      'sprouts': 'expand',
      'trunks': 'expand',

      // Templates - complete folder structures
      'trees': 'template',
      'grooves': 'template',

      // Direct placement - assets go to final destination
      'harvest': 'direct',

      // Functional scripts
      'sparks': 'expand',
      'barks': 'complete'
    };

    return strategies[componentType] || 'expand'; // Default to expand
  }

  // ========================================
  // SYNC STRATEGY IMPLEMENTATIONS
  // ========================================

  /**
   * Strategy: Complete Download
   * Downloads entire libraries (seeds, soils, barks)
   * Places in sync/ for user to decide integration
   */
  async downloadComplete(component, options = {}) {
    console.log(`📥 Downloading complete library: ${component.name}`);

    try {
      // Use organized subfolder based on component type
      const typeFolder = this.getTypeSubfolder(component.type);
      const syncPath = path.join(this.syncConfig.localSyncDir, typeFolder, component.name);

      // For complete downloads, we expect a full repository or library
      const repo = this.syncConfig.repositories.find(r => r.name === component.repository);
      const repoType = repo ? repo.type : 'github';

      switch (repoType) {
        case 'github':
          return await this.downloadGitHubComplete(component, syncPath, options);
        default:
          throw new Error(`Complete download not supported for ${repoType}`);
      }
    } catch (error) {
      console.error(`❌ Error in complete download:`, error.message);
      return null;
    }
  }

  /**
   * Strategy: Library Expansion
   * Downloads individual components for library integration
   * Places in sync/ for user to integrate into existing libraries
   */
  async downloadExpand(component, options = {}) {
    console.log(`📥 Downloading component for expansion: ${component.name}`);

    try {
      // Use organized subfolder based on component type
      const typeFolder = this.getTypeSubfolder(component.type);
      const syncPath = path.join(this.syncConfig.localSyncDir, typeFolder, `${component.name}.scss`);

      const repo = this.syncConfig.repositories.find(r => r.name === component.repository);
      const repoType = repo ? repo.type : 'github';

      switch (repoType) {
        case 'github':
          return await this.downloadGitHubComponent(component, syncPath, options);
        default:
          return await this.downloadGitHubComponent(component, syncPath, options);
      }
    } catch (error) {
      console.error(`❌ Error in expansion download:`, error.message);
      return null;
    }
  }

  /**
   * Strategy: Template Download
   * Downloads complete folder structures (trees, grooves)
   * Places in sync/ as complete templates
   */
  async downloadTemplate(component, options = {}) {
    console.log(`📥 Downloading template: ${component.name}`);

    try {
      // Use organized subfolder based on component type
      const typeFolder = this.getTypeSubfolder(component.type);
      const syncPath = path.join(this.syncConfig.localSyncDir, typeFolder, component.name);

      const repo = this.syncConfig.repositories.find(r => r.name === component.repository);
      const repoType = repo ? repo.type : 'github';

      switch (repoType) {
        case 'github':
          return await this.downloadGitHubTemplate(component, syncPath, options);
        default:
          throw new Error(`Template download not supported for ${repoType}`);
      }
    } catch (error) {
      console.error(`❌ Error in template download:`, error.message);
      return null;
    }
  }

  /**
   * Strategy: Direct Download
   * Downloads assets directly to final destination (harvest)
   * Places multimedia assets in project's asset folders
   */
  async downloadDirect(component, options = {}) {
    console.log(`📥 Downloading asset directly: ${component.name}`);

    try {
      // For harvest assets, determine target directory based on asset type
      const targetDir = this.getHarvestTargetDirectory(component);
      const targetPath = path.join(targetDir, this.getAssetFilename(component));

      const repo = this.syncConfig.repositories.find(r => r.name === component.repository);
      const repoType = repo ? repo.type : 'github';

      switch (repoType) {
        case 'github':
          return await this.downloadGitHubAsset(component, targetPath, options);
          default:
          return await this.downloadGitHubAsset(component, targetPath, options);
      }
    } catch (error) {
      console.error(`❌ Error in direct download:`, error.message);
      return null;
    }
  }

  // ========================================
  // HARVEST UTILITY METHODS
  // ========================================

  /**
   * Gets the organized subfolder for a component type
   * @param {string} componentType - Type of component
   * @returns {string} - Subfolder name
   */
  getTypeSubfolder(componentType) {
    const subfolders = {
      'seeds': 'seeds',
      'soils': 'soils',
      'leafs': 'leafs',
      'sprouts': 'sprouts',
      'trunks': 'trunks',
      'trees': 'trees',
      'grooves': 'grooves',
      'sparks': 'sparks',
      'harvest': 'harvest',
      'barks': 'barks'
    };

    return subfolders[componentType] || 'misc';
  }

  /**
   * Determines target directory for harvest assets
   */
  getHarvestTargetDirectory(component) {
    const projectRoot = this.grow.config.PROJECT_ROOT;
    const assetType = this.getAssetTypeFromName(component.name);

    const targetDirs = {
      'image': path.join(projectRoot, 'src', 'assets', 'images'),
      'video': path.join(projectRoot, 'src', 'assets', 'videos'),
      'audio': path.join(projectRoot, 'src', 'assets', 'audio'),
      'icon': path.join(projectRoot, 'src', 'assets', 'icons'),
      'text': path.join(projectRoot, 'src', 'assets', 'text'),
      'font': path.join(projectRoot, 'src', 'assets', 'fonts')
    };

    const targetDir = targetDirs[assetType] || path.join(projectRoot, 'src', 'assets', 'misc');

    // Ensure directory exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    return targetDir;
  }

  /**
   * Gets asset type from component name
   */
  getAssetTypeFromName(componentName) {
    const typeMap = {
      'image-': 'image',
      'video-': 'video',
      'audio-': 'audio',
      'icon-': 'icon',
      'text-': 'text',
      'font-': 'font'
    };

    for (const [prefix, type] of Object.entries(typeMap)) {
      if (componentName.startsWith(prefix)) {
        return type;
      }
    }

    return 'misc';
  }

  /**
   * Generates appropriate filename for asset
   */
  getAssetFilename(component) {
    // Extract base name without type prefix
    let baseName = component.name;
    const prefixes = ['image-', 'video-', 'audio-', 'icon-', 'text-', 'font-'];

    for (const prefix of prefixes) {
      if (baseName.startsWith(prefix)) {
        baseName = baseName.substring(prefix.length);
        break;
      }
    }

    // Add appropriate extension based on asset type
    const extensions = {
      'image': '.png',
      'video': '.mp4',
      'audio': '.mp3',
      'icon': '.svg',
      'text': '.txt',
      'font': '.woff2'
    };

    const assetType = this.getAssetTypeFromName(component.name);
    const extension = extensions[assetType] || '.asset';

    return baseName + extension;
  }

  // ========================================
  // GITHUB DOWNLOAD IMPLEMENTATIONS
  // ========================================

  async downloadGitHubComplete(component, syncPath, options = {}) {
    // Implementation for downloading complete libraries
    console.log(`📥 GitHub complete download: ${component.url} → ${syncPath}`);

    // Placeholder implementation - would download entire repo or library
    const componentContent = `// Complete library: ${component.name}
// Downloaded from: ${component.url}
// Strategy: Complete Download
// Date: ${new Date().toISOString()}

// This would contain the complete library structure
// For now, this is a placeholder

.library-${component.name} {
  // Complete library styles would go here
}`;

    // Create directory if it doesn't exist
    const dir = path.dirname(syncPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(syncPath + '.scss', componentContent);
    console.log(`✅ Complete library downloaded to: ${syncPath}.scss`);

    return {
      name: component.name,
      localPath: syncPath + '.scss',
      type: component.type,
      source: 'github',
      strategy: 'complete'
    };
  }

  async downloadGitHubComponent(component, syncPath, options = {}) {
    // Implementation for downloading individual components
    console.log(`📥 GitHub component download: ${component.url} → ${syncPath}`);

    const componentContent = `// Component: ${component.name}
// Downloaded from: ${component.url}
// Strategy: Library Expansion
// Date: ${new Date().toISOString()}

// Individual component for library integration
.${component.name} {
  // Component styles would go here
}`;

    // Create directory if it doesn't exist
    const dir = path.dirname(syncPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(syncPath, componentContent);
    console.log(`✅ Component downloaded to: ${syncPath}`);

    return {
      name: component.name,
      localPath: syncPath,
      type: component.type,
      source: 'github',
      strategy: 'expand'
    };
  }

  async downloadGitHubTemplate(component, syncPath, options = {}) {
    // Implementation for downloading complete templates
    console.log(`📥 GitHub template download: ${component.url} → ${syncPath}`);

    // Create template directory structure
    if (!fs.existsSync(syncPath)) {
      fs.mkdirSync(syncPath, { recursive: true });
    }

    // Create multiple files for template (like grooves with multiple trees)
    const files = [
      { name: 'index.html', content: `<!-- Template: ${component.name} -->\n<!-- Downloaded from: ${component.url} -->\n<div class="${component.name}">\n  <!-- Template structure -->\n</div>` },
      { name: '_template.scss', content: `// Template: ${component.name}\n// Downloaded from: ${component.url}\n// Strategy: Template Download\n\n.${component.name} {\n  // Template styles\n}` },
      { name: 'component.js', content: `// Template: ${component.name}\n// Downloaded from: ${component.url}\n\nconsole.log('${component.name} template loaded');` }
    ];

    for (const file of files) {
      const filePath = path.join(syncPath, file.name);
      fs.writeFileSync(filePath, file.content);
    }

    console.log(`✅ Template downloaded to: ${syncPath}`);

    return {
      name: component.name,
      localPath: syncPath,
      type: component.type,
      source: 'github',
      strategy: 'template',
      files: files.map(f => f.name)
    };
  }

  async downloadGitHubAsset(component, targetPath, options = {}) {
    // Implementation for downloading assets directly
    console.log(`📥 GitHub asset download: ${component.url} → ${targetPath}`);

    // Create asset content based on type
    let assetContent = '';
    const assetType = this.getAssetTypeFromName(component.name);

    switch (assetType) {
      case 'image':
        assetContent = `// Placeholder for image: ${component.name}\n// Would be actual image binary data`;
        break;
      case 'video':
        assetContent = `// Placeholder for video: ${component.name}\n// Would be actual video binary data`;
        break;
      case 'audio':
        assetContent = `// Placeholder for audio: ${component.name}\n// Would be actual audio binary data`;
        break;
      case 'icon':
        assetContent = `<svg><!-- Placeholder SVG for ${component.name} --></svg>`;
        break;
      default:
        assetContent = `// Asset: ${component.name}\n// Downloaded from: ${component.url}\n// Strategy: Direct Download`;
    }

    // Create directory if it doesn't exist
    const dir = path.dirname(targetPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(targetPath, assetContent);
    console.log(`✅ Asset downloaded directly to: ${targetPath}`);

    return {
      name: component.name,
      localPath: targetPath,
      type: component.type,
      source: 'github',
      strategy: 'direct',
      assetType: assetType
    };
  }

  /**
   * Downloads component based on its sync strategy
   * @param {Object} component - Component metadata
   * @param {Object} options - Download options
   * @returns {Object|null} - Download result
   */
  async downloadByStrategy(component, options = {}) {
    const strategy = this.getSyncStrategy(component.type || 'trunks');

    console.log(`📥 Using ${strategy} strategy for ${component.name} (${component.type})`);

    switch (strategy) {
      case 'complete':
        return await this.downloadComplete(component, options);
      case 'expand':
        return await this.downloadExpand(component, options);
      case 'template':
        return await this.downloadTemplate(component, options);
      case 'direct':
        return await this.downloadDirect(component, options);
      default:
        return await this.downloadExpand(component, options);
    }
  }

  async downloadOnline(componentName, options = {}) {
    console.log(`📥 Downloading "${componentName}" from online repositories...`);

    // First search for the component
    const searchResults = await this.searchOnline(componentName, options);

    if (searchResults.length === 0) {
      console.log('❌ Component not found in any online repository');
      return null;
    }

    // Use the first match (or let user choose)
    const component = searchResults[0];

    // Add component type if not present (determine from name)
    if (!component.type) {
      component.type = this.determineComponentType(componentName);
    }

    // Download using appropriate strategy
    return await this.downloadByStrategy(component, options);
  }

  /**
   * Determines component type from component name
   */
  determineComponentType(componentName) {
    const heuristics = {
      'seeds': ['color-', 'palette-', 'type-', 'typography-', 'layout-', 'spacing-', 'motion-', 'outline-', 'scale-'],
      'soils': ['soil', 'compact', 'dark', 'spacious', 'theme-'],
      'leafs': ['align-', 'position-', 'color-', 'border-', 'display-', 'effect-', 'interactivity-', 'flex-', 'overflow-', 'size-', 'spacing-', 'ratio-', 'transform-', 'typography-', 'responsive-'],
      'sprouts': ['behavior-', 'interaction-', 'field-', 'media-', 'navigation-', 'structure-', 'textual-', 'util-'],
      'harvest': ['image-', 'video-', 'audio-', 'text-', 'icon-', 'font-'],
      'trunks': ['header-', 'nav-', 'footer-', 'content-', 'container-', 'layout-', 'form-', 'input-', 'button-', 'card-', 'modal-', 'alert-', 'badge-', 'tabs-', 'typography-', 'media-', 'grid-', 'table-', 'pagination-', 'breadcrumb-'],
      'trees': ['tree-', 'page-', 'section-', 'flow-'],
      'grooves': ['grove-', 'site-', 'app-', 'dashboard-'],
      'sparks': ['main', 'index', 'component-', 'util-', 'helper-'],
      'barks': ['foundation', 'bark']
    };

    for (const [type, prefixes] of Object.entries(heuristics)) {
      if (prefixes.some(prefix => componentName.startsWith(prefix) || componentName === prefix.replace('-', ''))) {
        return type;
      }
    }

    return 'trunks'; // Default fallback
  }

  async downloadComponent(component, options = {}) {
    console.log(`📥 Downloading component: ${component.name}`);

    // Determine component type if not provided
    if (!component.type) {
      component.type = this.determineComponentType(component.name);
    }

    // Use strategy-based download
    return await this.downloadByStrategy(component, options);
  }

  async downloadFromGitHub(component, localPath, options = {}) {
    // GitHub download implementation
    console.log(`📥 Downloading from GitHub: ${component.url}`);

    // This would use GitHub API or direct file download
    // For now, create a placeholder
    const componentContent = `// Downloaded component: ${component.name}
// From: ${component.url}
// Type: ${component.type}

// Placeholder implementation
.${component.name} {
  // Component styles would go here
}`;

    fs.writeFileSync(localPath + '.scss', componentContent);
    console.log(`✅ Downloaded to: ${localPath}.scss`);

    return {
      name: component.name,
      localPath: localPath + '.scss',
      type: component.type,
      source: 'github'
    };
  }

  async downloadFromGitLab(component, localPath, options = {}) {
    // GitLab download implementation
    console.log(`📥 Downloading from GitLab: ${component.url}`);
    return null;
  }

  async downloadFromNPM(component, localPath, options = {}) {
    // NPM download implementation
    console.log(`📥 Downloading from NPM: ${component.url}`);
    return null;
  }

  // ========================================
  // SYNC MANAGEMENT
  // ========================================

  async syncRepository(repoName, options = {}) {
    console.log(`🔄 Syncing repository: ${repoName}`);

    const repo = this.syncConfig.repositories.find(r => r.name === repoName);
    if (!repo) {
      console.log(`❌ Repository not found: ${repoName}`);
      return false;
    }

    try {
      // Clone or update repository
      const repoPath = path.join(this.syncConfig.cacheDir, repoName);

      if (fs.existsSync(repoPath)) {
        // Update existing repo
        console.log(`🔄 Updating repository: ${repoName}`);
        execSync(`git pull`, { cwd: repoPath });
      } else {
        // Clone new repo
        console.log(`📥 Cloning repository: ${repoName}`);
        execSync(`git clone ${repo.url}.git ${repoPath}`);
      }

      console.log(`✅ Repository synced: ${repoName}`);
      return true;
    } catch (error) {
      console.error(`❌ Error syncing repository:`, error.message);
      return false;
    }
  }

  async listSyncedComponents() {
    console.log('📋 Listing synced components...');

    try {
      const components = [];

      // Get all subfolders
      const subfolders = ['seeds', 'soils', 'leafs', 'sprouts', 'trunks', 'trees', 'grooves', 'sparks', 'harvest', 'barks'];

      for (const subfolder of subfolders) {
        const subfolderPath = path.join(this.syncConfig.localSyncDir, subfolder);

        if (fs.existsSync(subfolderPath)) {
          const files = fs.readdirSync(subfolderPath);

          for (const file of files) {
            const filePath = path.join(subfolderPath, file);
            const stats = fs.statSync(filePath);

            if (stats.isFile() && file.endsWith('.scss')) {
              components.push({
                name: file.replace('.scss', ''),
                path: filePath,
                type: subfolder,
                synced: true
              });
            } else if (stats.isDirectory()) {
              // Handle template directories
              components.push({
                name: file,
                path: filePath,
                type: subfolder,
                synced: true,
                isTemplate: true
              });
            }
          }
        }
      }

      console.log(`📊 Found ${components.length} synced components:`);
      components.forEach(comp => {
        const typeInfo = comp.isTemplate ? ' (template)' : '';
        console.log(`  • ${comp.name} (${comp.type})${typeInfo} - ${comp.path}`);
      });

      return components;
    } catch (error) {
      console.log('❌ Error listing synced components:', error.message);
      return [];
    }
  }

  // ========================================
  // CONFIGURATION MANAGEMENT
  // ========================================

  addRepository(name, url, type = 'github') {
    const newRepo = { name, url, type };

    // Check if repository already exists
    const existingIndex = this.syncConfig.repositories.findIndex(r => r.name === name);
    if (existingIndex >= 0) {
      this.syncConfig.repositories[existingIndex] = newRepo;
      console.log(`🔄 Updated repository: ${name}`);
    } else {
      this.syncConfig.repositories.push(newRepo);
      console.log(`➕ Added repository: ${name}`);
    }

    this.saveSyncConfig();
  }

  removeRepository(name) {
    const initialLength = this.syncConfig.repositories.length;
    this.syncConfig.repositories = this.syncConfig.repositories.filter(r => r.name !== name);

    if (this.syncConfig.repositories.length < initialLength) {
      console.log(`➖ Removed repository: ${name}`);
      this.saveSyncConfig();
      return true;
    } else {
      console.log(`❌ Repository not found: ${name}`);
      return false;
    }
  }

  listRepositories() {
    console.log('📋 Configured repositories:');
    this.syncConfig.repositories.forEach(repo => {
      console.log(`  • ${repo.name} (${repo.type}): ${repo.url}`);
    });
  }
}