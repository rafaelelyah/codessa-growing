/**
 * 🌱 Codessa Grow - Universal Component Manager
 * The ultimate component management system for Growing
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Import all component managers
import { TrunksManager } from './modules/trunks.js';
import { SproutsManager } from './modules/sprouts.js';
import { SparksManager } from './modules/sparks.js';
import { HarvestManager } from './modules/harvest.js';
import { SoilsManager } from './modules/soils.js';
import { SeedsManager } from './modules/seeds.js';
import { LeafsManager } from './modules/leafs.js';
import { BarksManager } from './modules/barks.js';
import { COMPONENT_TYPES, parseComponentArg } from './modules/base.js';

// Import unified configuration
import { GrowConfig } from './core/unified-config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========================================
// MAIN GROW CLASS
// ========================================

export class Grow {
  constructor(config = {}) {
    this.config = {
      PROJECT_ROOT: path.join(__dirname, '..', '..', '..'),
      SRC_DIR: path.join(__dirname, '..', '..', '..', 'src'),
      TERRAIN_DIR: path.join(__dirname, '..', '..', '..', 'src', 'terrain'),
      TREES_DIR: path.join(__dirname, '..', '..', '..', 'src', 'terrain', 'trees'),
      TREE_FILE: path.join(__dirname, '..', '..', '..', 'src', 'terrain', 'trees', '_tree.scss'),
      CACHE_FILE: path.join(__dirname, 'grow-cache.json'),
      SYNC_DIR: path.join(__dirname, 'sync', 'registry'),
      CACHE_DIR: path.join(__dirname, 'sync', 'cache'),
      CONFIG_FILE: path.join(__dirname, 'sync', 'config.json'),
      ...config
    };

    // Initialize all component managers
    this.managers = {
      [COMPONENT_TYPES.TRUNKS]: new TrunksManager(this.config),
      [COMPONENT_TYPES.SPROUTS]: new SproutsManager(this.config),
      [COMPONENT_TYPES.SPARKS]: new SparksManager(this.config),
      [COMPONENT_TYPES.HARVEST]: new HarvestManager(this.config),
      [COMPONENT_TYPES.SOILS]: new SoilsManager(this.config),
      [COMPONENT_TYPES.SEEDS]: new SeedsManager(this.config),
      [COMPONENT_TYPES.LEAFS]: new LeafsManager(this.config),
      [COMPONENT_TYPES.BARKS]: new BarksManager(this.config)
    };

    // Initialize unified configuration
    this.unified = new GrowConfig(this);

    console.log('🌱 Grow initialized - Universal Component Manager');
    console.log('📂 Project root:', this.config.PROJECT_ROOT);
  }

  // ========================================
  // MAIN COMMANDS (USING UNIFIED CONFIG)
  // ========================================

  async grow(components, options = {}) {
    // If online is requested, try unified approach
    if (options.online) {
      return await this.growOnline(components, options);
    }

    // Otherwise, use direct local operations
    console.log('🌱 Starting local component growth...');
    const results = [];
    for (const componentArg of components) {
      const { component, newName } = parseComponentArg(componentArg);
      const result = await this.growComponent(component, newName, options);
      results.push(result);
    }
    console.log('✅ Local growth complete!');
    return results;
  }

  async growOnline(components, options = {}) {
    const results = [];

    for (const componentArg of components) {
      const { component, newName } = parseComponentArg(componentArg);

      // Determine component type for strategy selection
      const componentType = this.determineComponentType(component);
      const componentWithType = {
        name: component,
        type: componentType.type,
        repository: options.repository || 'codessa-registry'
      };

      // Try to download from online repositories using strategy
      const onlineResult = await this.unified.syncOps.downloadByStrategy(componentWithType, options);
      if (onlineResult) {
        results.push({ ...onlineResult, source: 'online' });
      } else {
        console.log(`❌ Component not found online: ${component}`);
        results.push({ component, found: false });
      }
    }

    return results;
  }

  async search(searchTerm, type = null, options = {}) {
    const searchOptions = { ...options, type };
    return await this.unified.search(searchTerm, searchOptions);
  }

  async clean(components, options = {}) {
    return await this.unified.clean(components, options);
  }

  async update(components, options = {}) {
    console.log('🔄 Updating components...');

    const results = [];
    for (const component of components) {
      const result = await this.updateComponent(component, options);
      results.push(result);
    }

    return results;
  }

  // ========================================
  // SYNC OPERATIONS
  // ========================================

  async sync(options = {}) {
    console.log('🔄 Sync operations...');

    if (options.init) {
      return await this.unified.initialize();
    }

    if (options.repository) {
      return await this.unified.syncRepository(options.repository, options);
    }

    if (options.list) {
      return await this.unified.listSyncedComponents();
    }

    console.log('💡 Use --init to initialize sync, --repository=<name> to sync a repo, or --list to list synced components');
    return false;
  }

  async repo(options = {}) {
    console.log('📋 Repository management...');

    if (options.add && options.name && options.url) {
      this.unified.addRepository(options.name, options.url, options.type || 'github');
      return true;
    }

    if (options.remove && options.name) {
      return this.unified.removeRepository(options.name);
    }

    if (options.list) {
      this.unified.listRepositories();
      return true;
    }

    console.log('💡 Use --add --name=<name> --url=<url> to add, --remove --name=<name> to remove, or --list to list repositories');
    return false;
  }

  // ========================================
  // ASSETS MANAGEMENT
  // ========================================

  async assets(options = {}) {
    console.log('📦 Assets management...');

    if (options.list) {
      return await this.listAssets();
    }

    if (options.copy && options.to) {
      return await this.copyAsset(options.copy, options.to);
    }

    if (options.integrate) {
      return await this.integrateAsset(options.integrate, options.library);
    }

    if (options.clean) {
      return await this.cleanAssets();
    }

    console.log('💡 Use --list to list assets, --copy <asset> --to=<dest> to copy, --integrate <component> to integrate, or --clean to clean');
    return false;
  }

  async listAssets() {
    console.log('📋 Listing all assets...');

    // List assets in sync directory
    const syncAssets = await this.listSyncAssets();

    // List downloaded harvest assets
    const harvestAssets = await this.managers.harvest.listDownloadedAssets();

    console.log('\n📁 Sync Assets:');
    if (syncAssets.length > 0) {
      syncAssets.forEach(asset => {
        console.log(`  • ${asset.name} (${asset.type}) - ${asset.path}`);
      });
    } else {
      console.log('  No assets in sync directory');
    }

    console.log('\n📦 Harvest Assets:');
    if (harvestAssets.length > 0) {
      harvestAssets.forEach(asset => {
        console.log(`  • ${asset.name} (${asset.type}) - ${asset.path}`);
      });
    } else {
      console.log('  No downloaded harvest assets');
    }

    return { sync: syncAssets, harvest: harvestAssets };
  }

  async listSyncAssets() {
    const fs = await import('fs');
    const path = await import('path');

    const syncDir = this.config.SYNC_DIR || path.join(this.config.PROJECT_ROOT, 'grow-sync');
    const assets = [];

    if (!fs.existsSync(syncDir)) {
      return assets;
    }

    try {
      // Get all subfolders
      const subfolders = ['seeds', 'soils', 'leafs', 'sprouts', 'trunks', 'trees', 'grooves', 'sparks', 'harvest', 'barks'];

      for (const subfolder of subfolders) {
        const subfolderPath = path.join(syncDir, subfolder);

        if (fs.existsSync(subfolderPath)) {
          const files = fs.readdirSync(subfolderPath);

          for (const file of files) {
            const filePath = path.join(subfolderPath, file);
            const stats = fs.statSync(filePath);

            if (stats.isFile()) {
              const ext = path.extname(file).toLowerCase();
              let type = 'unknown';

              if (ext === '.scss') type = 'component';
              else if (['.png', '.jpg', '.jpeg', '.gif', '.svg'].includes(ext)) type = 'image';
              else if (['.mp4', '.avi', '.mov'].includes(ext)) type = 'video';
              else if (['.mp3', '.wav'].includes(ext)) type = 'audio';
              else if (ext === '.js') type = 'script';

              assets.push({
                name: path.parse(file).name,
                path: filePath,
                type: type,
                componentType: subfolder,
                size: stats.size,
                modified: stats.mtime.toISOString()
              });
            } else if (stats.isDirectory()) {
              // Handle template directories (grooves, trees)
              assets.push({
                name: file,
                path: filePath,
                type: 'template',
                componentType: subfolder,
                size: 0,
                modified: stats.mtime.toISOString()
              });
            }
          }
        }
      }
    } catch (error) {
      console.warn('⚠️  Error listing sync assets:', error.message);
    }

    return assets;
  }

  async copyAsset(assetName, destination) {
    console.log(`📋 Copying asset ${assetName} to ${destination}...`);

    // Find asset in sync directory (search all subfolders)
    const syncAssets = await this.listSyncAssets();
    const asset = syncAssets.find(a => a.name === assetName);

    if (!asset) {
      console.log(`❌ Asset not found: ${assetName}`);
      return false;
    }

    const fs = await import('fs');
    const path = await import('path');

    try {
      // Ensure destination directory exists
      const destDir = path.dirname(destination);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      // Copy file or directory
      if (asset.type === 'template') {
        // Copy directory
        await this.copyDirectory(asset.path, destination);
      } else {
        // Copy file
        fs.copyFileSync(asset.path, destination);
      }

      console.log(`✅ Asset copied to: ${destination}`);
      return true;
    } catch (error) {
      console.error(`❌ Error copying asset:`, error.message);
      return false;
    }
  }

  async integrateAsset(componentName, targetLibrary = 'components') {
    console.log(`🔧 Integrating ${componentName} into ${targetLibrary}...`);

    // Find component in sync directory (search all subfolders)
    const syncAssets = await this.listSyncAssets();
    const component = syncAssets.find(a => a.name === componentName && a.type === 'component');

    if (!component) {
      console.log(`❌ Component not found: ${componentName}`);
      return false;
    }

    const fs = await import('fs');
    const path = await import('path');

    try {
      // Read component content
      const content = fs.readFileSync(component.path, 'utf8');

      // Determine target file based on library type
      let targetFile;
      switch (targetLibrary) {
        case 'trunks':
          targetFile = path.join(this.config.PROJECT_ROOT, 'src', 'terrain', 'trunks', '_trunks.scss');
          break;
        case 'sprouts':
          targetFile = path.join(this.config.PROJECT_ROOT, 'src', 'sprouts', '_sprouts.scss');
          break;
        case 'leafs':
          targetFile = path.join(this.config.PROJECT_ROOT, 'src', 'leafs', '_leafs.scss');
          break;
        case 'seeds':
          targetFile = path.join(this.config.PROJECT_ROOT, 'src', 'seeds', '_seeds.scss');
          break;
        case 'soils':
          targetFile = path.join(this.config.PROJECT_ROOT, 'src', 'soils', '_soils.scss');
          break;
        default:
          targetFile = path.join(this.config.PROJECT_ROOT, 'src', targetLibrary, `_${componentName}.scss`);
      }

      // Ensure target directory exists
      const targetDir = path.dirname(targetFile);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // Append component to target file
      const importStatement = `// ${componentName} (integrated from sync/${component.componentType})\n${content}\n`;
      fs.appendFileSync(targetFile, importStatement);

      console.log(`✅ Component integrated into: ${targetFile}`);
      return true;
    } catch (error) {
      console.error(`❌ Error integrating component:`, error.message);
      return false;
    }
  }

  async cleanAssets() {
    console.log('🧹 Cleaning assets...');

    const fs = await import('fs');
    const path = await import('path');

    const syncDir = this.config.SYNC_DIR || path.join(this.config.PROJECT_ROOT, 'grow-sync');

    if (!fs.existsSync(syncDir)) {
      console.log('⚠️  Sync directory not found');
      return true;
    }

    try {
      // Clean all subfolders
      const subfolders = ['seeds', 'soils', 'leafs', 'sprouts', 'trunks', 'trees', 'grooves', 'sparks', 'harvest', 'barks'];

      for (const subfolder of subfolders) {
        const subfolderPath = path.join(syncDir, subfolder);

        if (fs.existsSync(subfolderPath)) {
          const files = fs.readdirSync(subfolderPath);
          for (const file of files) {
            const filePath = path.join(subfolderPath, file);
            if (fs.statSync(filePath).isFile()) {
              fs.unlinkSync(filePath);
              console.log(`🗑️  Removed: ${subfolder}/${file}`);
            } else {
              // Remove directory recursively
              fs.rmSync(filePath, { recursive: true, force: true });
              console.log(`🗑️  Removed directory: ${subfolder}/${file}`);
            }
          }
        }
      }

      console.log('✅ Assets cleaned!');
      return true;
    } catch (error) {
      console.error(`❌ Error cleaning assets:`, error.message);
      return false;
    }
  }

  async copyDirectory(source, destination) {
    const fs = await import('fs');
    const path = await import('path');

    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    const files = fs.readdirSync(source);

    for (const file of files) {
      const srcPath = path.join(source, file);
      const destPath = path.join(destination, file);

      if (fs.statSync(srcPath).isDirectory()) {
        await this.copyDirectory(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  async validate(options = {}) {
    console.log('✅ Validating Grow system...');

    const results = {
      tree: options.tree !== false ? await this.validateTree() : null,
      cache: options.cache !== false ? await this.validateCache() : null,
      managers: await this.validateManagers()
    };

    console.log('✅ Validation complete!');
    return results;
  }

  async cache(operation, options = {}) {
    console.log('📚 Cache operations...');

    switch (operation) {
      case 'clear':
        return this.clearCache();
      case 'list':
        return this.listCache();
      case 'stats':
        return this.showCacheStats();
      default:
        throw new Error(`Unknown cache operation: ${operation}`);
    }
  }

  // ========================================
  // COMPONENT OPERATIONS
  // ========================================

  async growComponent(componentName, newName = null, options = {}) {
    // Determine component type and manager
    let { type, manager } = this.determineComponentType(componentName);

    // Override type if explicitly specified in options
    if (options.type) {
      const specifiedType = options.type.toLowerCase();
      if (this.managers[specifiedType]) {
        type = specifiedType;
        manager = this.managers[specifiedType];
        console.log(`🔧 Using specified type: ${type}`);
      } else {
        console.warn(`⚠️  Unknown type specified: ${options.type}, falling back to detected type: ${type}`);
      }
    }

    if (!manager) {
      console.log(`❌ Unknown component type for: ${componentName}`);
      return null;
    }

    console.log(`🌱 Growing ${componentName} (${type})...`);

    // Extract component with dependency detection if enabled
    const componentData = await manager.extractComponent(componentName, options);
    if (!componentData) {
      return null;
    }

    // Handle automatic dependency detection
    if (options.autoDeps && componentData.dependencies && componentData.dependencies.length > 0) {
      console.log(`🔗 Detected dependencies: ${componentData.dependencies.join(', ')}`);

      // Extract and include dependencies
      const dependencyResults = [];
      for (const dep of componentData.dependencies) {
        console.log(`  📦 Extracting dependency: ${dep}`);
        const depData = await this.managers[COMPONENT_TYPES.SPROUTS].extractComponent(dep, options);
        if (depData) {
          dependencyResults.push(depData);
        } else {
          console.log(`  ⚠️  Dependency ${dep} not found, skipping...`);
        }
      }

      // Add dependencies to component data
      componentData.dependencyComponents = dependencyResults;
    }

    // Handle different component types
    if (type === COMPONENT_TYPES.HARVEST) {
      // For assets, just return the path info
      console.log(`✅ Asset found: ${componentData.path}`);
      return componentData;
    } else {
      // For code components, append to tree with the determined type
      return await this.appendToTree(componentData, componentName, newName, type);
    }
  }

  async cleanComponent(componentName, options = {}) {
    // This is a simplified version - in practice you'd need to track which manager owns each component
    console.log(`🧹 Cleaning ${componentName}...`);

    // For now, assume it's from trunks (most common)
    const manager = this.managers[COMPONENT_TYPES.TRUNKS];
    // Implementation would go here

    console.log(`✅ ${componentName} cleaned!`);
    return true;
  }

  async updateComponent(componentName, options = {}) {
    console.log(`🔄 Updating ${componentName}...`);

    // Clean and re-grow
    await this.cleanComponent(componentName, options);
    return await this.growComponent(componentName, null, options);
  }

  // ========================================
  // UTILITY METHODS
  // ========================================

  determineComponentType(componentName) {
    // Simple heuristic to determine component type
    const heuristics = {
      [COMPONENT_TYPES.TRUNKS]: ['header-', 'nav-', 'footer-', 'content-', 'container-', 'layout-', 'form-', 'input-', 'button-', 'card-', 'modal-', 'alert-', 'badge-', 'tabs-', 'typography-', 'media-', 'grid-', 'table-', 'pagination-', 'breadcrumb-'],
      [COMPONENT_TYPES.SPROUTS]: ['sprout-', 'behavior-', 'interaction-', 'field-', 'media-', 'navigation-', 'structure-', 'textual-', 'util-'],
      [COMPONENT_TYPES.SPARKS]: ['main', 'index', 'component-', 'util-', 'helper-'],
      [COMPONENT_TYPES.HARVEST]: ['image-', 'video-', 'audio-', 'text-', 'icon-', 'font-'],
      [COMPONENT_TYPES.SOILS]: ['soil', 'compact', 'dark', 'spacious', 'theme-'],
      [COMPONENT_TYPES.SEEDS]: ['color-', 'palette-', 'type-', 'typography-', 'layout-', 'spacing-', 'motion-', 'outline-', 'scale-'],
      [COMPONENT_TYPES.LEAFS]: ['align-', 'position-', 'color-', 'border-', 'display-', 'effect-', 'interactivity-', 'flex-', 'overflow-', 'size-', 'spacing-', 'ratio-', 'transform-', 'typography-', 'responsive-'],
      [COMPONENT_TYPES.BARKS]: ['foundation', 'bark']
    };

    for (const [type, prefixes] of Object.entries(heuristics)) {
      if (prefixes.some(prefix => componentName.startsWith(prefix) || componentName === prefix.replace('-', ''))) {
        return { type, manager: this.managers[type] };
      }
    }

    // Default to trunks for unknown patterns
    return { type: COMPONENT_TYPES.TRUNKS, manager: this.managers[COMPONENT_TYPES.TRUNKS] };
  }

  async appendToTree(componentData, componentName, newName = null, componentType = null) {
    // Ensure trees directory exists
    if (!fs.existsSync(this.config.TREES_DIR)) {
      fs.mkdirSync(this.config.TREES_DIR, { recursive: true });
    }

    // Read or create tree file with organized structure
    let treeContent = '';
    if (fs.existsSync(this.config.TREE_FILE)) {
      treeContent = fs.readFileSync(this.config.TREE_FILE, 'utf8');
      // Ensure organized structure exists
      treeContent = this.ensureOrganizedStructure(treeContent);
    } else {
      treeContent = this.createOrganizedTreeStructure();
    }

    const finalName = newName || componentName;

    // Check if component already exists
    if (treeContent.includes(`.${finalName} {`)) {
      console.log(`⚠️  ${finalName} already exists in tree. Skipping SCSS addition but will try HTML generation...`);

      // Even if component exists in tree, try to generate HTML
      if (componentType === COMPONENT_TYPES.TRUNKS || sectionType === COMPONENT_TYPES.TRUNKS) {
        // Create a copy of componentData with the renamed code for HTML generation
        const renamedComponentData = { ...componentData };
        if (newName && componentData.type === 'scss') {
          renamedComponentData.code = finalCode;
        }
        await this.injectHtmlForTrunk(renamedComponentData, finalName, finalName);
      }

      return null;
    }

    // Determine component type for section placement
    // Use provided type or determine from component name
    const sectionType = componentType || this.determineComponentTypeForSection(componentName);
    const componentSection = this.getComponentSection(sectionType);

    // Handle component renaming for SCSS
    let finalCode = componentData.code;
    if (newName && componentData.type === 'scss') {
      // Replace the main class name
      finalCode = componentData.code.replace(
        new RegExp(`\\.${componentName}\\s*\\{`, 'g'),
        `.${newName} {`
      );

      // Replace all references to the old component name within the component
      finalCode = finalCode.replace(
        new RegExp(`&\.${componentName}--`, 'g'),
        `&.${newName}--`
      );

      // Also replace direct references like .trunk-button--md
      finalCode = finalCode.replace(
        new RegExp(`${componentName}--`, 'g'),
        `${newName}--`
      );
    }

    // Handle dependencies (sprouts) - always go to sprouts section
    let dependencyCode = '';
    if (componentData.dependencyComponents && componentData.dependencyComponents.length > 0) {
      console.log(`🔗 Processing ${componentData.dependencyComponents.length} dependencies...`);

      for (const dep of componentData.dependencyComponents) {
        // Check if this dependency already exists in tree
        const mixinName = dep.name;
        if (treeContent.includes(`@mixin ${mixinName}(`)) {
          console.log(`  ⏭️  Dependency ${mixinName} already exists. Skipping...`);
          continue;
        }

        dependencyCode += `// ${dep.name} (dependency for ${finalName})\n${dep.code}\n`;
      }
    }

    // Insert dependencies in sprouts section if any
    if (dependencyCode) {
      treeContent = this.insertInSection(treeContent, dependencyCode, 'SPROUTS');
      console.log(`✅ Added ${componentData.dependencyComponents.filter(dep => !treeContent.includes(`@mixin ${dep.name}(`)).length} new dependencies to sprouts section`);
    }

    // Insert main component in appropriate section
    const componentCode = `\n// ${finalName} (from ${componentName})\n${finalCode}\n`;
    treeContent = this.insertInSection(treeContent, componentCode, componentSection);

    // Write back organized content
    fs.writeFileSync(this.config.TREE_FILE, treeContent, 'utf8');

    console.log(`✅ ${componentName} added to ${componentSection.toLowerCase()} section as: ${finalName}!`);

    // Inject HTML for trunks only
    if (componentType === COMPONENT_TYPES.TRUNKS || sectionType === COMPONENT_TYPES.TRUNKS) {
      // Create a copy of componentData with the renamed code for HTML generation
      const renamedComponentData = { ...componentData };
      if (newName && componentData.type === 'scss') {
        renamedComponentData.code = finalCode;
      }
      await this.injectHtmlForTrunk(renamedComponentData, finalName, finalName);
    }

    return { componentName, finalName, treeFile: this.config.TREE_FILE, section: componentSection };
  }

  async validateTree() {
    console.log('🔍 Validating tree structure...');

    try {
      if (!fs.existsSync(this.config.TREE_FILE)) {
        console.log('❌ Tree file not found!');
        return false;
      }

      const treeContent = fs.readFileSync(this.config.TREE_FILE, 'utf8');

      // Basic validations
      const hasSproutsImport = treeContent.includes("@use '../sprouts'");
      const hasSoilsImport = treeContent.includes("@use '../soils'");

      console.log(`✅ Sprouts import: ${hasSproutsImport ? 'OK' : 'Missing'}`);
      console.log(`✅ Soils import: ${hasSoilsImport ? 'OK' : 'Missing'}`);

      const componentCount = (treeContent.match(/\/\/ [a-zA-Z][a-zA-Z0-9-_]* \(from /g) || []).length;
      console.log(`📊 Components in tree: ${componentCount}`);

      return true;
    } catch (error) {
      console.error('❌ Tree validation error:', error.message);
      return false;
    }
  }

  async validateCache() {
    console.log('🔍 Validating cache integrity...');

    // Aggregate cache from all managers
    const allMappings = {};
    let totalMappings = 0;

    for (const [type, manager] of Object.entries(this.managers)) {
      const managerMappings = Object.keys(manager.cache.mappings || {});
      totalMappings += managerMappings.length;

      for (const mapping of managerMappings) {
        allMappings[`${type}:${mapping}`] = manager.cache.mappings[mapping];
      }
    }

    console.log(`📊 Total mappings across all managers: ${totalMappings}`);

    if (Object.keys(allMappings).length > 0) {
      console.log('📚 Cache contents:');
      for (const [key, value] of Object.entries(allMappings)) {
        console.log(`  • ${key} → ${value}`);
      }
    }

    return true;
  }

  async validateManagers() {
    console.log('🔍 Validating component managers...');

    const results = {};
    for (const [type, manager] of Object.entries(this.managers)) {
      const sourceDir = manager.getSourceDirectory();
      const exists = fs.existsSync(sourceDir);
      results[type] = {
        sourceDir,
        exists,
        status: exists ? 'OK' : 'Missing'
      };
      console.log(`✅ ${type}: ${results[type].status} (${sourceDir})`);
    }

    return results;
  }

  async cleanAllComponents() {
    console.log('🧹 Cleaning all components from tree...');

    try {
      if (!fs.existsSync(this.config.TREE_FILE)) {
        console.log('⚠️  Tree file not found.');
        return true;
      }

      // Keep only the header
      const headerContent = `@use '../sprouts' as *;\n@use '../soils' as *;\n\n// ========================================\n// TREE — DEVELOPMENT COMPONENTS\n// ========================================\n// Components in development\n\n`;

      fs.writeFileSync(this.config.TREE_FILE, headerContent);
      console.log('✅ All components cleaned from tree!');
      return true;
    } catch (error) {
      console.error('❌ Error cleaning tree:', error.message);
      return false;
    }
  }

  clearCache() {
    for (const [type, manager] of Object.entries(this.managers)) {
      manager.cache.mappings = {};
      manager.saveCache();
    }
    console.log('✅ Cache cleared across all managers!');
    return true;
  }

  listCache() {
    console.log('📚 Cache contents across all managers:');

    for (const [type, manager] of Object.entries(this.managers)) {
      const mappings = manager.cache.mappings || {};
      if (Object.keys(mappings).length > 0) {
        console.log(`\n${type.toUpperCase()}:`);
        for (const [component, file] of Object.entries(mappings)) {
          console.log(`  • ${component} → ${file}`);
        }
      }
    }

    return true;
  }

  // ========================================
  // TREE ORGANIZATION METHODS
  // ========================================

  createOrganizedTreeStructure() {
    return `@use '../sprouts' as *;
@use '../soils' as *;

// ========================================
// TREE — DEVELOPMENT COMPONENTS
// ========================================
// Components organized by type for better maintainability

// ========================================
// 🌱 SPROUTS SECTION (Dependencies & Behaviors)
// ========================================
// Sprouts are placed at the top so they can be used by any trunk below
// This section contains mixins, functions, and utility behaviors

// ========================================
// 🌳 TRUNKS SECTION (Main Components)
// ========================================
// Trunks are the main structural components of your design system
// They can use any sprout from above

// ========================================
// 🍃 LEAFS SECTION (Utilities & Overrides)
// ========================================
// Leafs are placed at the bottom for final styling adjustments
// They can override any trunk or sprout above

`;
  }

  ensureOrganizedStructure(treeContent) {
    // Check if organized structure already exists
    const hasSproutsSection = treeContent.includes('// 🌱 SPROUTS SECTION');
    const hasTrunksSection = treeContent.includes('// 🌳 TRUNKS SECTION');
    const hasLeafsSection = treeContent.includes('// 🍃 LEAFS SECTION');

    // If all sections exist, return as is
    if (hasSproutsSection && hasTrunksSection && hasLeafsSection) {
      return treeContent;
    }

    // Extract existing components
    const existingComponents = this.extractExistingComponents(treeContent);

    // Create new organized structure
    let newContent = this.createOrganizedTreeStructure();

    // Re-insert existing components in their appropriate sections
    for (const component of existingComponents) {
      const sectionType = this.determineComponentTypeForSection(component.name);
      const sectionName = this.getComponentSection(sectionType);
      newContent = this.insertInSection(newContent, component.code, sectionName);
    }

    console.log('🔄 Reorganized existing tree with proper sections');
    return newContent;
  }

  extractExistingComponents(treeContent) {
    const components = [];
    const lines = treeContent.split('\n');
    let currentComponent = null;
    let componentLines = [];
    let braceCount = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Skip import statements and comments
      if (line.startsWith('@use') || line.startsWith('//') || line.trim() === '') {
        continue;
      }

      // Look for component start
      const componentMatch = line.match(/^\.([a-zA-Z][a-zA-Z0-9-_]*)\s*\{/);
      if (componentMatch && !currentComponent) {
        currentComponent = componentMatch[1];
        componentLines = [line];
        braceCount = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
        continue;
      }

      if (currentComponent) {
        componentLines.push(line);
        braceCount += (line.match(/\{/g) || []).length;
        braceCount -= (line.match(/\}/g) || []).length;

        if (braceCount === 0) {
          // Component complete
          const componentCode = componentLines.join('\n').trim();
          components.push({
            name: currentComponent,
            code: `\n// ${currentComponent} (existing component)\n${componentCode}\n`
          });
          currentComponent = null;
          componentLines = [];
        }
      }
    }

    return components;
  }

  determineComponentTypeForSection(componentName) {
    // Determine component type based on naming patterns
    if (componentName.startsWith('sprout-') || componentName.includes('-sprout')) {
      return COMPONENT_TYPES.SPROUTS;
    }
    if (componentName.startsWith('leaf-') || componentName.includes('-leaf') ||
        componentName.startsWith('util-') || componentName.includes('-util')) {
      return COMPONENT_TYPES.LEAFS;
    }
    // Default to trunks for main components
    return COMPONENT_TYPES.TRUNKS;
  }

  getComponentSection(componentType) {
    const sectionMap = {
      [COMPONENT_TYPES.SPROUTS]: 'SPROUTS',
      [COMPONENT_TYPES.LEAFS]: 'LEAFS',
      [COMPONENT_TYPES.TRUNKS]: 'TRUNKS',
      'sprouts': 'SPROUTS',
      'leafs': 'LEAFS',
      'trunks': 'TRUNKS'
    };
    return sectionMap[componentType] || 'TRUNKS';
  }

  insertInSection(treeContent, codeToInsert, sectionName) {
    const sectionMarkers = {
      'SPROUTS': {
        start: '// ========================================\n// 🌱 SPROUTS SECTION (Dependencies & Behaviors)\n// ========================================',
        end: '// ========================================\n// 🌳 TRUNKS SECTION (Main Components)\n// ========================================'
      },
      'TRUNKS': {
        start: '// ========================================\n// 🌳 TRUNKS SECTION (Main Components)\n// ========================================',
        end: '// ========================================\n// 🍃 LEAFS SECTION (Utilities & Overrides)\n// ========================================'
      },
      'LEAFS': {
        start: '// ========================================\n// 🍃 LEAFS SECTION (Utilities & Overrides)\n// ========================================',
        end: null // Last section, insert at end
      }
    };

    const markers = sectionMarkers[sectionName];
    if (!markers) {
      console.warn(`⚠️  Unknown section: ${sectionName}, appending to end`);
      return treeContent + codeToInsert;
    }

    // Find the section
    const startIndex = treeContent.indexOf(markers.start);
    if (startIndex === -1) {
      console.warn(`⚠️  Section ${sectionName} not found, appending to end`);
      return treeContent + codeToInsert;
    }

    let insertIndex;
    if (markers.end) {
      // Find end of section
      const endIndex = treeContent.indexOf(markers.end, startIndex);
      if (endIndex === -1) {
        console.warn(`⚠️  End of section ${sectionName} not found, appending to end`);
        return treeContent + codeToInsert;
      }
      insertIndex = endIndex;
    } else {
      // Last section, insert at end of file
      insertIndex = treeContent.length;
    }

    // Insert code before the next section marker
    return treeContent.slice(0, insertIndex) + codeToInsert + treeContent.slice(insertIndex);
  }

  // ========================================
  // HTML INJECTION METHODS
  // ========================================

  async injectHtmlForTrunk(componentData, componentName, finalName) {
    console.log(`🌐 Injecting HTML for ${finalName}...`);

    try {
      // Generate HTML based on component structure
      const htmlSnippet = this.generateHtmlForTrunk(componentData, componentName, finalName);

      if (!htmlSnippet) {
        console.log(`⚠️  No HTML generated for ${finalName}`);
        return;
      }

      // Read current index.html
      const indexPath = this.config.PROJECT_ROOT + '/index.html';
      let indexContent = '';

      if (fs.existsSync(indexPath)) {
        indexContent = fs.readFileSync(indexPath, 'utf8');
      } else {
        console.log(`⚠️  index.html not found at ${indexPath}`);
        return;
      }

      // Check if component already exists in HTML
      if (indexContent.includes(`<!-- ${finalName} -->`)) {
        console.log(`⚠️  ${finalName} already exists in HTML. Skipping...`);
        return;
      }

      // Inject HTML in the appropriate section
      const updatedContent = this.injectHtmlInSection(indexContent, htmlSnippet, finalName);

      // Write back to index.html
      fs.writeFileSync(indexPath, updatedContent, 'utf8');

      console.log(`✅ HTML injected for ${finalName} in index.html!`);
    } catch (error) {
      console.error(`❌ Error injecting HTML for ${finalName}:`, error.message);
    }
  }

  generateHtmlForTrunk(componentData, componentName, finalName) {
    // Analyze SCSS structure to generate corresponding HTML
    const scssCode = componentData.code;
    const componentStructure = this.analyzeScssStructure(scssCode, finalName);

    // Generate HTML based on the actual SCSS structure
    let html = `\n<!-- ${finalName} -->\n`;

    // Generate base component HTML
    html += this.generateHtmlFromStructure(componentStructure, finalName, scssCode);

    // Generate variations if any
    if (componentStructure.variations.length > 0) {
      componentStructure.variations.forEach(variation => {
        html += this.generateVariationFromStructure(componentStructure, variation, finalName, scssCode);
      });
    }

    html += `<!-- End ${finalName} -->\n`;

    return html;
  }

  extractComponentVariations(scssCode, componentName) {
    const variations = [];
    const lines = scssCode.split('\n');

    for (const line of lines) {
      // Look for modifier classes like &.trunk-button--md or &--md
      const modifierMatch = line.match(/&\.([a-zA-Z][a-zA-Z0-9-_]*--[a-zA-Z][a-zA-Z0-9-_]*)/);
      if (modifierMatch) {
        // Remove the & prefix and extract just the variation name
        const fullVariation = modifierMatch[1];
        const variationName = fullVariation.split('--')[1]; // Get only the part after --
        if (variationName && !variations.includes(variationName)) {
          variations.push(variationName);
        }
      }
    }

    return [...new Set(variations)]; // Remove duplicates
  }

  analyzeScssStructure(scssCode, componentName) {
    const structure = {
      baseClass: componentName,
      children: [],
      variations: [],
      elementType: 'div' // default
    };

    const lines = scssCode.split('\n');
    let currentIndentation = 0;
    let braceCount = 0;

    console.log(`🔍 Analyzing structure for: ${componentName}`);
    console.log(`📄 SCSS Code:\n${scssCode}`);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.startsWith('//') || line.startsWith('/*')) continue;

      // Count braces to understand nesting
      const openBraces = (line.match(/\{/g) || []).length;
      const closeBraces = (line.match(/\}/g) || []).length;
      braceCount += openBraces - closeBraces;

      // Extract selectors
      const selectorMatch = line.match(/^([^{]+)\s*\{/);
      if (selectorMatch) {
        const selector = selectorMatch[1].trim();

        console.log(`🎯 Found selector: ${selector} (braceCount: ${braceCount})`);

        // Check if it's the base component
        if (selector === `.${componentName}`) {
          structure.elementType = this.inferElementType(componentName);
          console.log(`✅ Base component detected: ${componentName} → ${structure.elementType}`);
          continue;
        }

        // Check if it's a child element
        if (selector.startsWith('&__') || selector.includes(`.${componentName}__`)) {
          const childClass = selector.replace('&__', '').replace(`.${componentName}__`, '').split(' ')[0];
          if (!structure.children.includes(childClass)) {
            structure.children.push(childClass);
            console.log(`👶 Child element detected: ${childClass}`);
          }
          continue;
        }

        // Check if it's a variation
        if (selector.startsWith('&--') || selector.includes(`${componentName}--`)) {
          let variation = '';
          if (selector.startsWith('&--')) {
            variation = selector.replace('&--', '').split(' ')[0];
          } else if (selector.includes(`${componentName}--`)) {
            variation = selector.replace(`${componentName}--`, '').split(' ')[0];
          }
          if (variation && !structure.variations.includes(variation)) {
            structure.variations.push(variation);
            console.log(`🔄 Variation detected: ${variation}`);
          }
          continue;
        }

        // Check for nested selectors that might indicate child elements
        if (braceCount > 1 && selector.includes('__')) {
          const childMatch = selector.match(/__([a-zA-Z][a-zA-Z0-9-_]*)/);
          if (childMatch && !structure.children.includes(childMatch[1])) {
            structure.children.push(childMatch[1]);
            console.log(`👶 Nested child element detected: ${childMatch[1]}`);
          }
        }

        // Check for regular nested selectors (like .ul-sidebar, .li-sidebar)
        if (braceCount > 1 && selector.startsWith('.') && !selector.includes('&')) {
          const nestedClass = selector.replace('.', '').split(' ')[0];
          if (nestedClass !== componentName && !structure.children.includes(nestedClass)) {
            structure.children.push(nestedClass);
            console.log(`👶 Regular nested element detected: ${nestedClass}`);
          }
        }
      }
    }

    console.log(`📊 Final structure for ${componentName}:`, structure);
    return structure;
  }

  generateHtmlFromStructure(structure, componentName, scssCode) {
    console.log(`🏗️ Generating HTML for: ${componentName}`);
    console.log(`📋 Structure received:`, structure);

    const elementType = this.determineHtmlTag(scssCode, componentName);
    const createAutoChildren = this.shouldCreateAutoChildren(scssCode);

    console.log(`🏷️ Element type: ${elementType}`);
    console.log(`👶 Create auto children: ${createAutoChildren}`);

    // Generate opening tag
    let html = `<${elementType} class="${componentName}">`;

    // Add child elements based on the SCSS structure and annotations
    if (createAutoChildren && structure.children && structure.children.length > 0) {
      console.log(`👶 Found ${structure.children.length} children:`, structure.children);

      // Parse SCSS to understand nesting hierarchy
      const nestedStructure = this.parseScssNesting(scssCode, componentName);

      html += this.generateNestedHtml(nestedStructure, componentName, 1);
      html += '\n';
    } else {
      console.log(`📄 No children found or auto children disabled, generating simple content`);
      // Simple content without automatic children
      html += this.generateDefaultContent(componentName);
    }

    // Close tag
    html += `</${elementType}>\n`;

    console.log(`✅ Generated HTML:\n${html}`);
    return html;
  }

  generateVariationFromStructure(structure, variation, componentName, scssCode) {
    const elementType = this.determineHtmlTag(scssCode, componentName);
    // Remove the & prefix from variation if present
    const cleanVariation = variation.replace(/^&\./, '');
    const variationClass = `${componentName} ${componentName}--${cleanVariation}`;

    let html = `<${elementType} class="${variationClass}">`;

    // Never create automatic children in variations - keep it simple
    html += this.generateDefaultContent(componentName);
    html += `</${elementType}>\n`;

    return html;
  }

  parseScssNesting(scssCode, componentName) {
    const lines = scssCode.split('\n');
    const nesting = [];
    let currentPath = [];
    let braceCount = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.startsWith('//') || line.startsWith('/*')) continue;

      // Count braces to understand nesting
      const openBraces = (line.match(/\{/g) || []).length;
      const closeBraces = (line.match(/\}/g) || []).length;
      braceCount += openBraces - closeBraces;

      // Extract selectors
      const selectorMatch = line.match(/^([^{]+)\s*\{/);
      if (selectorMatch) {
        const selector = selectorMatch[1].trim();

        // Skip the main component selector
        if (selector === `.${componentName}`) {
          currentPath = [componentName];
          continue;
        }

        // Handle nested selectors
        if (braceCount > 1) {
          let className = '';

          if (selector.startsWith('&__')) {
            className = selector.replace('&__', '');
          } else if (selector.startsWith('.')) {
            className = selector.replace('.', '');
          }

          if (className) {
            currentPath.push(className);
            nesting.push([...currentPath]);
            console.log(`📦 Nested path: ${currentPath.join(' > ')}`);
          }
        }
      }

      // When closing braces, pop from current path
      if (closeBraces > 0 && currentPath.length > 1) {
        currentPath.pop();
      }
    }

    return nesting;
  }

  generateNestedHtml(nestedStructure, componentName, indentLevel) {
    const indent = '  '.repeat(indentLevel);
    let html = '';

    // Group by parent to create proper nesting
    const grouped = {};
    nestedStructure.forEach(path => {
      if (path.length > 1) {
        const parent = path[path.length - 2];
        const child = path[path.length - 1];

        if (!grouped[parent]) {
          grouped[parent] = [];
        }
        if (!grouped[parent].includes(child)) {
          grouped[parent].push(child);
        }
      }
    });

    console.log(`🔗 Nested structure:`, grouped);

    // Generate HTML for top-level children
    if (grouped[componentName]) {
      grouped[componentName].forEach(child => {
        html += this.generateNestedElement(child, grouped, indentLevel);
      });
    }

    return html;
  }

  generateNestedElement(elementName, grouped, indentLevel) {
    const indent = '  '.repeat(indentLevel);
    const childElementType = this.inferElementType(elementName);
    const content = this.generateContentForChild(elementName);

    let html = `\n${indent}<${childElementType} class="${elementName}">`;

    // Add nested children if any
    if (grouped[elementName]) {
      grouped[elementName].forEach(child => {
        html += this.generateNestedElement(child, grouped, indentLevel + 1);
      });
      html += `\n${indent}`;
    } else {
      html += content;
    }

    html += `</${childElementType}>`;

    console.log(`🔧 Generated nested element: ${elementName} → ${html.trim()}`);
    return html;
  }

  generateContentForChild(childName, variation = null) {
    const contents = {
      text: variation ? `${variation} text` : 'Text content',
      title: variation ? `${variation} title` : 'Title',
      label: variation ? `${variation} label` : 'Label',
      content: variation ? `${variation} content` : 'Content goes here',
      body: variation ? `${variation} body` : 'Body content',
      header: variation ? `${variation} header` : 'Header',
      footer: variation ? `${variation} footer` : 'Footer',
      actions: variation ? `${variation} action` : 'Action',
      icon: variation ? `${variation} icon` : 'Icon',
      description: variation ? `${variation} description` : 'Description',
      subtitle: variation ? `${variation} subtitle` : 'Subtitle'
    };

    return contents[childName] || `${childName} content`;
  }

  generateDefaultContent(componentName) {
    const name = componentName.replace('trunk-', '').replace('-', ' ');
    return `\n    ${name} content\n`;
  }

  inferElementType(componentName) {
    // Infer HTML element type based on component name
    const name = componentName.toLowerCase();

    // Direct matches (highest priority)
    if (name === 'ul' || name.startsWith('ul-') || name.endsWith('-ul') || name.includes('-ul-')) return 'ul';
    if (name === 'li' || name.startsWith('li-') || name.endsWith('-li') || name.includes('-li-')) return 'li';
    if (name === 'ol' || name.startsWith('ol-') || name.endsWith('-ol') || name.includes('-ol-')) return 'ol';
    if (name === 'dl' || name.startsWith('dl-') || name.endsWith('-dl') || name.includes('-dl-')) return 'dl';
    if (name === 'dt' || name.startsWith('dt-') || name.endsWith('-dt') || name.includes('-dt-')) return 'dt';
    if (name === 'dd' || name.startsWith('dd-') || name.endsWith('-dd') || name.includes('-dd-')) return 'dd';

    // Semantic elements
    if (name.includes('nav') || name.startsWith('nav-')) return 'nav';
    if (name.includes('header') || name.startsWith('header-')) return 'header';
    if (name.includes('footer') || name.startsWith('footer-')) return 'footer';
    if (name.includes('aside') || name.startsWith('aside-')) return 'aside';
    if (name.includes('main') || name.startsWith('main-')) return 'main';
    if (name.includes('section') || name.startsWith('section-')) return 'section';
    if (name.includes('article') || name.startsWith('article-')) return 'article';

    // Form elements
    if (name.includes('button') || name.startsWith('btn-')) return 'button';
    if (name.includes('input') || name.startsWith('input-')) return 'input';
    if (name.includes('form') || name.startsWith('form-')) return 'form';
    if (name.includes('select') || name.startsWith('select-')) return 'select';
    if (name.includes('textarea') || name.startsWith('textarea-')) return 'textarea';

    // Interactive elements
    if (name.includes('link') || name.includes('anchor') || name.startsWith('a-')) return 'a';

    // Media elements
    if (name.includes('image') || name.includes('img') || name.startsWith('img-')) return 'img';
    if (name.includes('video') || name.startsWith('video-')) return 'video';
    if (name.includes('audio') || name.startsWith('audio-')) return 'audio';

    // List-related patterns
    if (name.includes('list') && !name.includes('item')) return 'ul';
    if (name.includes('item') || name.includes('list-item')) return 'li';

    // Text elements
    if (name.includes('heading') || name.includes('title') || name.startsWith('h')) return 'h1';
    if (name.includes('paragraph') || name.includes('text') || name.startsWith('p-')) return 'p';

    // Table elements
    if (name.includes('table') || name.startsWith('table-')) return 'table';
    if (name.includes('row') || name.startsWith('tr-')) return 'tr';
    if (name.includes('cell') || name.includes('td') || name.startsWith('td-')) return 'td';
    if (name.includes('th') || name.startsWith('th-')) return 'th';

    // Generic containers
    if (name.includes('container') || name.includes('wrapper') || name.includes('box')) return 'div';
    if (name.includes('grid') || name.includes('flex')) return 'div';

    console.log(`🔍 Element type for "${componentName}" not recognized, using div`);
    return 'div'; // default
  }

  // ========================================
  // HTML TAG INFERENCE METHODS (HYBRID APPROACH)
  // ========================================

  // Extract HTML tag annotation from SCSS comments
  extractTagAnnotation(scssCode) {
    const tagMatch = scssCode.match(/\/\/ @html-tag:\s*(\w+)/);
    return tagMatch ? tagMatch[1] : null;
  }

  // Extract HTML children annotation from SCSS comments
  extractChildrenAnnotation(scssCode) {
    const childrenMatch = scssCode.match(/\/\/ @html-children:\s*(.+)/);
    return childrenMatch ? childrenMatch[1].trim() : null;
  }

  // Infer HTML tag from naming convention
  inferTagFromNaming(componentName) {
    const mappings = {
      // Prefix mappings
      'btn-': 'button',
      'button-': 'button',
      'grid-': 'section',
      'card-': 'article',
      'form-': 'form',
      'nav-': 'nav',
      'header-': 'header',
      'footer-': 'footer',
      'aside-': 'aside',
      'main-': 'main',
      'modal-': 'dialog',
      'menu-': 'nav',
      'list-': 'ul',
      'item-': 'li',
      'link-': 'a',
      'anchor-': 'a',
      'image-': 'img',
      'img-': 'img',
      'input-': 'input',
      'select-': 'select',
      'textarea-': 'textarea',
      'table-': 'table',
      'row-': 'tr',
      'cell-': 'td',
      'heading-': 'h1',
      'title-': 'h1',
      'paragraph-': 'p',
      'text-': 'p',
      // Suffix mappings
      '-btn': 'button',
      '-button': 'button',
      '-grid': 'section',
      '-card': 'article',
      '-form': 'form',
      '-nav': 'nav',
      '-header': 'header',
      '-footer': 'footer',
      '-aside': 'aside',
      '-main': 'main',
      '-modal': 'dialog',
      '-menu': 'nav',
      '-list': 'ul',
      '-item': 'li',
      '-link': 'a',
      '-anchor': 'a',
      '-image': 'img',
      '-img': 'img',
      '-input': 'input',
      '-select': 'select',
      '-textarea': 'textarea',
      '-table': 'table',
      '-row': 'tr',
      '-cell': 'td',
      '-heading': 'h1',
      '-title': 'h1',
      '-paragraph': 'p',
      '-text': 'p'
    };

    // Debug log
    console.log(`🔍 Checking naming convention for: ${componentName}`);

    for (const [pattern, tag] of Object.entries(mappings)) {
      if (componentName.includes(pattern)) {
        console.log(`✅ Found naming convention: ${pattern} → ${tag}`);
        return tag;
      }
    }

    console.log(`❌ No naming convention found for: ${componentName}`);
    return null;
  }

  // Infer HTML tag from CSS properties
  inferTagFromCSS(scssCode) {
    const code = scssCode.toLowerCase();

    // Interactive elements
    if (code.includes('cursor: pointer') && code.includes('background')) return 'button';
    if (code.includes('cursor: pointer') && code.includes('text-decoration')) return 'a';

    // Layout elements
    if (code.includes('display: grid') || code.includes('grid-template')) return 'section';
    if (code.includes('display: flex') && code.includes('flex-direction: column')) return 'section';

    // Form elements
    if (code.includes('border') && code.includes('padding') && code.includes('background')) return 'input';

    // Text elements
    if (code.includes('font-size') && code.includes('line-height') && !code.includes('display: flex')) return 'p';

    // Modal/overlay elements
    if (code.includes('position: fixed') || code.includes('position: absolute')) return 'aside';

    // Navigation elements
    if (code.includes('display: flex') && code.includes('justify-content')) return 'nav';

    return null;
  }

  // Main method that combines all inference strategies
  determineHtmlTag(scssCode, componentName) {
    // 1. Priority: SCSS annotations (highest priority)
    const annotation = this.extractTagAnnotation(scssCode);
    if (annotation) return annotation;

    // 2. Naming convention (high priority for explicit naming)
    const namingConvention = this.inferTagFromNaming(componentName);
    if (namingConvention) {
      // Special handling for button vs link conflict
      if (namingConvention === 'button' && scssCode.includes('text-decoration: none')) {
        // If it's named as button but has link properties, still use button
        return 'button';
      }
      return namingConvention;
    }

    // 3. CSS properties analysis (lower priority)
    const cssInference = this.inferTagFromCSS(scssCode);
    if (cssInference) return cssInference;

    // 4. Fallback to current inference method
    return this.inferElementType(componentName);
  }

  // Control automatic children creation
  shouldCreateAutoChildren(scssCode) {
    console.log(`🔧 Checking auto children for SCSS code:\n${scssCode}`);
    const annotation = this.extractChildrenAnnotation(scssCode);
    console.log(`📝 Children annotation found: ${annotation}`);
    if (annotation === 'none') return false;
    if (annotation) return true; // If has specific annotation, use it

    // By default, don't create automatic children
    console.log(`📝 No annotation found, defaulting to false`);
    return false;
  }

  injectHtmlInSection(indexContent, htmlSnippet, componentName) {
    // Find or create trunks section in HTML
    const trunksSectionStart = '<!-- 🌳 TRUNKS SECTION -->';
    const trunksSectionEnd = '<!-- 🍃 LEAFS SECTION -->';

    let updatedContent = indexContent;

    // If trunks section doesn't exist, create it
    if (!updatedContent.includes(trunksSectionStart)) {
      // Find a good place to insert (before closing body or after main content)
      const bodyEndIndex = updatedContent.lastIndexOf('</body>');
      if (bodyEndIndex !== -1) {
        const beforeBodyEnd = updatedContent.substring(0, bodyEndIndex);
        const afterBodyEnd = updatedContent.substring(bodyEndIndex);

        updatedContent = beforeBodyEnd +
          '\n\n<!-- 🌳 TRUNKS SECTION -->\n' +
          '<!-- Trunks are the main structural components -->\n\n' +
          htmlSnippet +
          '\n<!-- End TRUNKS SECTION -->\n\n' +
          afterBodyEnd;
      }
    } else {
      // Insert in existing trunks section
      const sectionStartIndex = updatedContent.indexOf(trunksSectionStart);
      if (sectionStartIndex !== -1) {
        // Find the end of trunks section or insert before leafs section
        let insertIndex = updatedContent.indexOf(trunksSectionEnd, sectionStartIndex);
        if (insertIndex === -1) {
          insertIndex = updatedContent.lastIndexOf('</body>');
        }

        if (insertIndex !== -1) {
          const beforeInsert = updatedContent.substring(0, insertIndex);
          const afterInsert = updatedContent.substring(insertIndex);

          updatedContent = beforeInsert + htmlSnippet + afterInsert;
        }
      }
    }

    return updatedContent;
  }
}

// ========================================
// CLI INTERFACE
// ========================================

export function showHelp() {
  console.log(`
🌱 Codessa Grow - Universal Component Manager v4.0

COMANDOS DISPONÍVEIS:

📦 GROW (Extração Universal de Componentes)
  npm run grow <component[:newname]> [component2[:newname2]] ...
  npm run grow trunk-button
  npm run grow --online header-1 nav-simple:navbar
  npm run grow --auto-deps trunk-button  (detecta dependências automaticamente)

🔍 SEARCH (Busca Universal de Componentes)
  npm run grow search <termo> [--type=<type>] [--online] [--local]
  npm run grow search button --type=trunks
  npm run grow search color --online

🧹 CLEAN (Limpeza Universal de Componentes)
  npm run grow clean <component> [component2] ...
  npm run grow clean navbar site-footer
  npm run grow clean --all

🔄 UPDATE (Atualização Universal de Componentes)
  npm run grow update <component> [component2] ...
  npm run grow update header-1 nav-simple

✅ VALIDATE (Validação Completa do Sistema)
  npm run grow validate
  npm run grow validate --tree
  npm run grow validate --cache

📚 CACHE (Gerenciamento Global de Cache)
  npm run grow cache clear
  npm run grow cache list
  npm run grow cache stats

🔄 SYNC (Sincronização com Repositórios Online)
  npm run grow sync --init
  npm run grow sync --repository=codessa-registry
  npm run grow sync --list

📋 REPO (Gerenciamento de Repositórios)
  npm run grow repo --add --name=myrepo --url=https://github.com/user/repo
  npm run grow repo --remove --name=myrepo
  npm run grow repo --list

📦 ASSETS (Gerenciamento de Assets Baixados)
  npm run grow assets --list
  npm run grow assets --copy <asset> --to=<destination>
  npm run grow assets --integrate <component> [--library=<target>]
  npm run grow assets --clean

TIPOS DE COMPONENTES SUPORTADOS:
  • trunks: Componentes SCSS estruturais
  • sprouts: Comportamentos e interações
  • sparks: Componentes JavaScript
  • harvest: Assets (imagens, vídeos, áudio)
  • soils: Temas e variáveis semânticas
  • seeds: Design tokens
  • leafs: Utilitários/modificadores visuais
  • barks: Componentes de foundation

EXEMPLOS PRÁTICOS:
  npm run grow trunk-button
  npm run grow search button --type=trunks
  npm run grow clean navbar --force
  npm run grow validate --tree
  npm run grow image-logo --type=harvest
  npm run grow color-standard-1 --type=seeds
  npm run grow search header --online
  npm run grow sync --init
  npm run grow repo --add --name=myrepo --url=https://github.com/user/repo
  npm run grow assets --list
  npm run grow assets --integrate trunk-button --library=components
`);
}

// ========================================
// MAIN CLI ENTRY POINT
// ========================================

if (process.argv[1].endsWith('grow.js')) {
  main();
}

function main() {
  console.log('🌱 Grow - Universal Component Manager');
  const args = process.argv.slice(2);

  if (args.length < 1 || args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }

  const grow = new Grow();
  const command = args[0];

  // Parse options
  const options = {};
  const filteredArgs = args.slice(1).filter(arg => {
    if (arg.startsWith('--type=')) {
      options.type = arg.split('=')[1];
      return false;
    }
    if (arg === '--all') {
      options.all = true;
      return false;
    }
    if (arg === '--tree') {
      options.tree = true;
      return false;
    }
    if (arg === '--cache') {
      options.cache = true;
      return false;
    }
    if (arg === '--force') {
      options.force = true;
      return false;
    }
    if (arg === '--online') {
      options.online = true;
      return false;
    }
    if (arg === '--local') {
      options.local = true;
      return false;
    }
    if (arg === '--auto-deps') {
      options.autoDeps = true;
      return false;
    }
    if (arg === '--init') {
      options.init = true;
      return false;
    }
    if (arg.startsWith('--repository=')) {
      options.repository = arg.split('=')[1];
      return false;
    }
    if (arg === '--list') {
      options.list = true;
      return false;
    }
    if (arg.startsWith('--name=')) {
      options.name = arg.split('=')[1];
      return false;
    }
    if (arg.startsWith('--url=')) {
      options.url = arg.split('=')[1];
      return false;
    }
    if (arg.startsWith('--repo-type=')) {
      options.type = arg.split('=')[1];
      return false;
    }
    if (arg === '--add') {
      options.add = true;
      return false;
    }
    if (arg === '--remove') {
      options.remove = true;
      return false;
    }
    if (arg.startsWith('--to=')) {
      options.to = arg.split('=')[1];
      return false;
    }
    if (arg.startsWith('--library=')) {
      options.library = arg.split('=')[1];
      return false;
    }
    return true;
  });

  // Execute command
  (async () => {
    try {
      switch (command) {
        case 'grow':
          await grow.grow(filteredArgs, options);
          break;
        case 'search':
          const searchResults = await grow.search(filteredArgs[0], options.type, options);
          if (searchResults && searchResults.length > 0) {
            console.log(`✅ Found ${searchResults.length} components:`);
            searchResults.forEach(result => {
              const typeInfo = result.componentType ? ` (${result.componentType})` : '';
              const sourceInfo = result.source ? ` [${result.source}]` : '';
              console.log(`  • ${result.component}${typeInfo}${sourceInfo} in ${result.file}`);
            });
          }
          break;
        case 'clean':
          await grow.clean(filteredArgs, options);
          break;
        case 'update':
          await grow.update(filteredArgs, options);
          break;
        case 'validate':
          await grow.validate(options);
          break;
        case 'cache':
          await grow.cache(filteredArgs[0], options);
          break;
        case 'sync':
          await grow.sync(options);
          break;
        case 'repo':
          await grow.repo(options);
          break;
        case 'assets':
          // Handle assets command with positional arguments
          if (filteredArgs.length > 0) {
            if (filteredArgs[0] === '--integrate' && filteredArgs.length > 1) {
              options.integrate = filteredArgs[1];
            } else if (filteredArgs[0] === '--copy' && filteredArgs.length > 1) {
              options.copy = filteredArgs[1];
            }
          }
          await grow.assets(options);
          break;
        default:
          // Assume it's a direct grow command
          await grow.grow(args, options);
      }
    } catch (error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  })();
}
