/**
 * 🌱 SASS Project Initializer
 * Creates SCSS-only projects with Growing terrain
 */

import fs from 'fs-extra';
import path from 'path';
import { FoundationGenerator } from '../generators/FoundationGenerator.js';
import { SeedsGenerator } from '../generators/SeedsGenerator.js';

export class SassProjectInit {
  constructor(configManager) {
    this.config = configManager;
  }

  async create(projectName, options = {}) {
    const { verbose = false } = options;
    const projectPath = this.config.getProjectPath(projectName);

    try {
      if (verbose) console.log(`🏗️  Creating SASS project structure...`);

      // Create main directories
      await this.createDirectories(projectPath, verbose);

      // Generate foundation and seeds files from wood
      await this.generateFoundationFiles(projectPath, verbose);

      // Create SCSS files
      await this.createScssFiles(projectPath, verbose);

      // Create sparks.js
      await this.createSparksJs(projectPath, projectName, verbose);

      // Create documentation
      await this.createDocumentation(projectPath, projectName, verbose);

      if (verbose) console.log(`✅ SASS project structure created`);

      return {
        success: true,
        structure: {
          foundation: 'foundation/',
          harvest: 'harvest/',
          sparks: 'sparks/',
          growth: 'growth/',
          styles: 'tree.scss',
          js: 'sparks.js',
          docs: 'README.md'
        }
      };

    } catch (error) {
      return {
        success: false,
        error: `Failed to create SASS project: ${error.message}`
      };
    }
  }

  async createDirectories(projectPath, verbose) {
    const dirs = [
      'foundation',
      'harvest',
      'harvest/img',
      'harvest/audio',
      'harvest/video',
      'harvest/text',
      'harvest/docs',
      'sparks',
      'growth'
    ];

    for (const dir of dirs) {
      const fullPath = path.join(projectPath, dir);
      await fs.ensureDir(fullPath);
      if (verbose) console.log(`📁 Created: ${dir}`);
    }
  }

  async createScssFiles(projectPath, verbose) {
    // Main SCSS entry point (tree.scss na raiz)
    const treeScss = `// ========================================
// ${path.basename(projectPath).toUpperCase()} - TREE STYLES
// ========================================
// Main entry point for SCSS compilation

// Import Growing terrain system
@use "foundation" as foundation;
@use 'growth' as *;

// ========================================
// CUSTOM STYLES
// ========================================
// Add your custom styles below

`;

    await fs.writeFile(path.join(projectPath, 'tree.scss'), treeScss);
    if (verbose) console.log(`📄 Created: tree.scss`);

    // Foundation index.scss
    const foundationIndexScss = `@forward 'roots';
@forward 'seeds';
@forward 'soil';
@forward 'bark';
@forward 'sprouts';
@forward 'leafs';
`;

    await fs.writeFile(path.join(projectPath, 'foundation', 'index.scss'), foundationIndexScss);
    if (verbose) console.log(`📄 Created: foundation/index.scss`);

    // Growth index.scss
    const growthIndexScss = `@use '../foundation' as *;

@forward 'layout';
@forward 'grid';
@forward 'typography';
@forward 'forms';
@forward 'components';
@forward 'pages';
@forward 'utilities';

// ========================================
// GROWTH — MODULAR COMPONENTS
// ========================================
// Modular SCSS components for site construction

`;

    await fs.writeFile(path.join(projectPath, 'growth', 'index.scss'), growthIndexScss);
    if (verbose) console.log(`📄 Created: growth/index.scss`);

    await fs.writeFile(path.join(projectPath, 'growth', 'index.scss'), growthIndexScss);
    if (verbose) console.log(`📄 Created: growth/index.scss`);

    // Create growth module files
    await this.createGrowthModules(projectPath, verbose);

    // Sprouts file (foundation/sprouts.scss)
    const sproutsScss = `// ========================================
// SPROUTS — ATOMIC COMPONENT CONSTRUCTORS
// ========================================
// Constructors of trunks promoted via Grow from woods.
// Used in tree modules via @include for building components.

`;

    await fs.writeFile(path.join(projectPath, 'foundation', 'sprouts.scss'), sproutsScss);
    if (verbose) console.log(`📄 Created: foundation/sprouts.scss`);

    // Leafs file (foundation/leafs.scss)
    const leafsScss = `// ========================================
// LEAFS — MOLECULAR COMPONENT MODIFIERS
// ========================================
// Point modifiers promoted via Grow from woods.
// Used in tree modules via @extend for component variations.

`;

    await fs.writeFile(path.join(projectPath, 'foundation', 'leafs.scss'), leafsScss);
    if (verbose) console.log(`📄 Created: foundation/leafs.scss`);
  }

  async createGrowthModules(projectPath, verbose) {
    const growthModules = {
      'layout.scss': `@use '../foundation' as *;

// ========================================
// LAYOUT — MAIN LAYOUT COMPONENTS
// ========================================
// Header, footer, sidebar, main content areas

`,
      'grid.scss': `@use '../foundation' as *;

// ========================================
// GRID — RESPONSIVE GRID SYSTEM
// ========================================
// Grid utilities and responsive layout helpers

`,
      'typography.scss': `@use '../foundation' as *;

// ========================================
// TYPOGRAPHY — TEXT STYLES
// ========================================
// Headings, paragraphs, links, text utilities

`,
      'forms.scss': `@use '../foundation' as *;

// ========================================
// FORMS — FORM COMPONENTS
// ========================================
// Form layouts, inputs, buttons, validation styles

`,
      'components.scss': `@use '../foundation' as *;

// ========================================
// COMPONENTS — PROJECT COMPONENTS
// ========================================
// Cards, modals, tooltips, project-specific components

`,
      'pages.scss': `@use '../foundation' as *;

// ========================================
// PAGES — PAGE SPECIFIC STYLES
// ========================================
// Styles specific to individual pages

`,
      'utilities.scss': `@use '../foundation' as *;

// ========================================
// UTILITIES — PROJECT UTILITIES
// ========================================
// Project-specific utility classes and helpers

`
    };

    for (const [fileName, content] of Object.entries(growthModules)) {
      await fs.writeFile(path.join(projectPath, 'growth', fileName), content);
      if (verbose) console.log(`📄 Created: growth/${fileName}`);
    }
  }

  async createSparksJs(projectPath, projectName, verbose) {
    const sparksJs = `// ========================================
// ${projectName.toUpperCase()} - SPARKS
// ========================================
// JavaScript utilities and interactions

console.log('🌱 ${projectName} - Sparks loaded');

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Simple DOM ready function
 */
function domReady(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    fn();
  }
}

/**
 * Example spark function
 */
export function exampleSpark() {
  console.log('Spark activated!');
}

// ========================================
// INITIALIZATION
// ========================================

domReady(() => {
  console.log('Sparks ready!');
});

`;

    await fs.writeFile(path.join(projectPath, 'sparks.js'), sparksJs);
    if (verbose) console.log(`📄 Created: sparks.js`);
  }

  async createDocumentation(projectPath, projectName, verbose) {
    const readme = `# ${projectName}

SCSS project created with Codessa Grow.

## Structure

- \`foundation/\` - Foundation styles and variables
  - \`index.scss\` - Forward all foundation files
  - \`sprouts.scss\` - Atomic component constructors
  - \`leafs.scss\` - Molecular component modifiers
- \`harvest/\` - Assets and resources
  - \`img/\` - Images
  - \`audio/\` - Audio files
  - \`video/\` - Video files
  - \`text/\` - Text content
  - \`docs/\` - Documentation files
- \`sparks/\` - JavaScript utilities
- \`tree/\` - Modular components
  - \`index.scss\` - Forward all tree files
  - \`layout.scss\` - Main layout components
  - \`grid.scss\` - Responsive grid system
  - \`typography.scss\` - Text styles
  - \`forms.scss\` - Form components
  - \`components.scss\` - Project components
  - \`pages.scss\` - Page specific styles
  - \`utilities.scss\` - Project utilities
- \`tree.scss\` - Main SCSS entry point
- \`sparks.js\` - Main JavaScript file

## Usage

Import this project into your build system:

\`\`\`scss
@import '${projectName}/tree.scss';
\`\`\`

\`\`\`javascript
import { exampleSpark } from '${projectName}/sparks.js';
\`\`\`

## Development

This project uses the Growing terrain system for scalable SCSS architecture.

---

Created with [Codessa Grow](https://github.com/codessa/growing)
`;

    await fs.writeFile(path.join(projectPath, 'README.md'), readme);
    if (verbose) console.log(`📄 Created: README.md`);
  }

  async generateFoundationFiles(projectPath, verbose) {
    const woodPath = path.join(this.config.get('ROOT_DIR'), 'wood');

    // Generate foundation files (bark.scss, roots.scss, soil.scss)
    const foundationGenerator = new FoundationGenerator(woodPath, projectPath);
    await foundationGenerator.generateAll();

    // Generate seeds.scss
    const seedsGenerator = new SeedsGenerator(woodPath, projectPath);
    await seedsGenerator.generateAll();

    if (verbose) console.log(`✅ Foundation files generated from wood`);
  }
}