import fs from 'fs-extra';
import path from 'path';

/**
 * Foundation Generator
 * Converte arquivos JSON de wood/foundation/ para arquivos SCSS separados
 */

export class FoundationGenerator {
  constructor(woodPath, projectPath) {
    this.woodPath = woodPath;
    this.projectPath = projectPath;
    this.foundationPath = path.join(woodPath, 'foundation');
    this.outputPath = path.join(projectPath, 'foundation');
  }

  /**
   * Converte todos os arquivos JSON da foundation para SCSS
   */
  async generateAll() {
    console.log('🏗️  Generating foundation files...');

    const files = [
      { name: 'bark', method: 'convertBark' },
      { name: 'roots', method: 'convertRoots' },
      { name: 'soil', method: 'convertSoil' }
    ];

    for (const file of files) {
      const filePath = path.join(this.foundationPath, `${file.name}.json`);

      if (!await fs.pathExists(filePath)) {
        console.warn(`⚠️  ${file.name}.json not found, skipping...`);
        continue;
      }

      console.log(`📄 Processing ${file.name}.json...`);
      const data = await fs.readJson(filePath);

      // Call specific method for each file
      if (this[file.method]) {
        await this[file.method](data);
      } else {
        console.warn(`⚠️  Method ${file.method} not found for ${file.name}`);
      }
    }

    console.log('✅ Foundation files generated successfully!');
    return true;
  }

  /**
   * Converte bark.json para SCSS
   */
  async convertBark(barkData) {
    let scss = `// ========================================\n`;
    scss += `// 🌳 BARK - Global default configurations\n`;
    scss += `// Generated automatically from bark.json\n`;
    scss += `// ========================================\n\n`;

    // Import soil for access to CSS custom properties
    scss += `// Import soil for access to CSS custom properties\n`;
    scss += `@use 'soil';\n\n`;

    const bark = barkData.bark;

    // Global font settings
    if (bark['global-font-settings']) {
      scss += `// ========================================\n`;
      scss += `// GLOBAL FONT SETTINGS\n`;
      scss += `// ========================================\n\n`;

      const globalFont = bark['global-font-settings'];

      if (globalFont.html) {
        scss += `html {\n`;
        Object.entries(globalFont.html).forEach(([prop, value]) => {
          scss += `  ${this.cssPropertyToKebab(prop)}: ${value};\n`;
        });
        scss += `}\n\n`;
      }

      if (globalFont.body) {
        scss += `body {\n`;
        Object.entries(globalFont.body).forEach(([prop, value]) => {
          scss += `  ${this.cssPropertyToKebab(prop)}: ${value};\n`;
        });
        scss += `}\n\n`;
      }
    }

    // Typography headings
    if (bark['typography-headings']) {
      scss += `// ========================================\n`;
      scss += `// TYPOGRAPHY - HEADINGS\n`;
      scss += `// ========================================\n\n`;

      const headings = bark['typography-headings'];

      if (headings['base-heading-styles']) {
        const baseStyles = headings['base-heading-styles'];
        scss += `${baseStyles.selectors} {\n`;
        Object.entries(baseStyles).forEach(([prop, value]) => {
          if (prop !== 'selectors') {
            scss += `  ${this.cssPropertyToKebab(prop)}: ${value};\n`;
          }
        });
        scss += `}\n\n`;
      }

      // Individual headings
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(heading => {
        if (headings[heading]) {
          scss += `${heading} {\n`;
          Object.entries(headings[heading]).forEach(([prop, value]) => {
            scss += `  ${this.cssPropertyToKebab(prop)}: ${value};\n`;
          });
          scss += `}\n\n`;
        }
      });
    }

    // Typography text
    if (bark['typography-text']) {
      scss += `// ========================================\n`;
      scss += `// TYPOGRAPHY - TEXT\n`;
      scss += `// ========================================\n\n`;

      const text = bark['typography-text'];

      Object.entries(text).forEach(([element, styles]) => {
        if (styles.selectors) {
          scss += `${styles.selectors} {\n`;
          Object.entries(styles).forEach(([prop, value]) => {
            if (prop !== 'selectors') {
              scss += `  ${this.cssPropertyToKebab(prop)}: ${value};\n`;
            }
          });
          scss += `}\n\n`;
        } else {
          const selector = element === 'paragraph' ? 'p' : element;
          scss += `${selector} {\n`;
          Object.entries(styles).forEach(([prop, value]) => {
            scss += `  ${this.cssPropertyToKebab(prop)}: ${value};\n`;
          });
          scss += `}\n\n`;
        }
      });
    }

    // Typography links
    if (bark['typography-links']) {
      scss += `// ========================================\n`;
      scss += `// TYPOGRAPHY - LINKS\n`;
      scss += `// ========================================\n\n`;

      const links = bark['typography-links'];

      if (links['base-link']) {
        scss += `a {\n`;
        Object.entries(links['base-link']).forEach(([prop, value]) => {
          scss += `  ${this.cssPropertyToKebab(prop)}: ${value};\n`;
        });
        scss += `}\n\n`;
      }

      if (links['link-hover']) {
        scss += `a:hover {\n`;
        Object.entries(links['link-hover']).forEach(([prop, value]) => {
          scss += `  ${this.cssPropertyToKebab(prop)}: ${value};\n`;
        });
        scss += `}\n\n`;
      }

      if (links['link-focus']) {
        scss += `a:focus {\n`;
        Object.entries(links['link-focus']).forEach(([prop, value]) => {
          scss += `  ${this.cssPropertyToKebab(prop)}: ${value};\n`;
        });
        scss += `}\n\n`;
      }
    }

    // Layout containers
    if (bark['layout-containers']) {
      scss += `// ========================================\n`;
      scss += `// LAYOUT - CONTAINERS\n`;
      scss += `// ========================================\n\n`;

      const containers = bark['layout-containers'];

      Object.entries(containers).forEach(([element, styles]) => {
        scss += `${element} {\n`;
        Object.entries(styles).forEach(([prop, value]) => {
          if (prop !== 'not-last-child') {
            scss += `  ${this.cssPropertyToKebab(prop)}: ${value};\n`;
          }
        });
        scss += `}\n\n`;

        if (styles['not-last-child']) {
          scss += `${element}:not(:last-child) {\n`;
          Object.entries(styles['not-last-child']).forEach(([prop, value]) => {
            scss += `  ${this.cssPropertyToKebab(prop)}: ${value};\n`;
          });
          scss += `}\n\n`;
        }
      });
    }

    // Interactivity buttons
    if (bark['interactivity-buttons']) {
      scss += `// ========================================\n`;
      scss += `// INTERACTIVITY - BUTTONS\n`;
      scss += `// ========================================\n\n`;

      const buttons = bark['interactivity-buttons'];

      if (buttons['base-button']) {
        const baseButton = buttons['base-button'];
        scss += `${baseButton.selectors} {\n`;
        Object.entries(baseButton).forEach(([prop, value]) => {
          if (prop !== 'selectors') {
            scss += `  ${this.cssPropertyToKebab(prop)}: ${value};\n`;
          }
        });
        scss += `}\n\n`;
      }
    }

    const outputPath = path.join(this.outputPath, 'bark.scss');
    await fs.writeFile(outputPath, scss);
    console.log(`✅ bark.scss generated`);
  }

  /**
   * Converte roots.json para SCSS
   */
  async convertRoots(rootsData) {
    let scss = `// ========================================\n`;
    scss += `// 🌱 ROOTS - Foundation and reset\n`;
    scss += `// Generated automatically from roots.json\n`;
    scss += `// ========================================\n\n`;

    const roots = rootsData.foundation;

    // Box-sizing
    if (roots['box-sizing']) {
      scss += `// Box-sizing\n`;
      const boxSizing = roots['box-sizing'];

      if (boxSizing.html) {
        scss += `html {\n`;
        Object.entries(boxSizing.html).forEach(([prop, value]) => {
          scss += `  ${this.cssPropertyToKebab(prop)}: ${value};\n`;
        });
        scss += `}\n\n`;
      }

      if (boxSizing.universal) {
        scss += `${boxSizing.universal.selector} {\n`;
        Object.entries(boxSizing.universal).forEach(([prop, value]) => {
          if (prop !== 'selector') {
            scss += `  ${this.cssPropertyToKebab(prop)}: ${value};\n`;
          }
        });
        scss += `}\n\n`;
      }
    }

    // Margin reset
    if (roots['margin-reset']) {
      const marginReset = roots['margin-reset'];
      scss += `// Margin reset\n`;
      scss += `${marginReset.selectors} {\n`;
      Object.entries(marginReset).forEach(([prop, value]) => {
        if (prop !== 'selectors') {
          scss += `  ${this.cssPropertyToKebab(prop)}: ${value};\n`;
        }
      });
      scss += `}\n\n`;
    }

    // Form reset
    if (roots['form-reset']) {
      const formReset = roots['form-reset'];

      if (formReset['input-elements']) {
        scss += `// Form reset - Input elements\n`;
        scss += `${formReset['input-elements'].selectors} {\n`;
        Object.entries(formReset['input-elements']).forEach(([prop, value]) => {
          if (prop !== 'selectors') {
            scss += `  ${this.cssPropertyToKebab(prop)}: ${value};\n`;
          }
        });
        scss += `}\n\n`;
      }

      if (formReset.button) {
        scss += `// Form reset - Button\n`;
        scss += `button {\n`;
        Object.entries(formReset.button).forEach(([prop, value]) => {
          scss += `  ${this.cssPropertyToKebab(prop)}: ${value};\n`;
        });
        scss += `}\n\n`;
      }
    }

    // Accessibility
    if (roots.accessibility) {
      const accessibility = roots.accessibility;

      if (accessibility['focus-visible']) {
        scss += `// Accessibility - Focus visible\n`;
        scss += `:focus-visible {\n`;
        Object.entries(accessibility['focus-visible']).forEach(([prop, value]) => {
          scss += `  ${this.cssPropertyToKebab(prop)}: ${value};\n`;
        });
        scss += `}\n\n`;
      }

      if (accessibility['visually-hidden']) {
        scss += `// Accessibility - Visually hidden\n`;
        scss += `.visually-hidden {\n`;
        Object.entries(accessibility['visually-hidden']).forEach(([prop, value]) => {
          scss += `  ${this.cssPropertyToKebab(prop)}: ${value};\n`;
        });
        scss += `}\n\n`;
      }
    }

    const outputPath = path.join(this.outputPath, 'roots.scss');
    await fs.writeFile(outputPath, scss);
    console.log(`✅ roots.scss generated`);
  }

  /**
   * Converte soil.json para SCSS
   */
  async convertSoil(soilData) {
    let scss = `// ========================================\n`;
    scss += `// 🌱 SOIL - CSS Variables system\n`;
    scss += `// Generated automatically from soil.json\n`;
    scss += `// ========================================\n\n`;

    // Import seeds for access to base variables
    scss += `// Import seeds for access to base variables\n`;
    scss += `@use 'seeds' as *;\n\n`;

    const soil = soilData.soil;

    // CSS Custom Properties - Direct from Seeds
    scss += `// ========================================\n`;
    scss += `// CSS CUSTOM PROPERTIES - Direct from Seeds\n`;
    scss += `// ========================================\n\n`;

    scss += `:root {\n`;

    // Process semantic variables as CSS custom properties
    if (soil['semantic-variables']) {
      scss = this.processSemanticVariablesAsCSS(soil['semantic-variables'], scss);
    }

    scss += `}\n`;

    const outputPath = path.join(this.outputPath, 'soil.scss');
    await fs.writeFile(outputPath, scss);
    console.log(`✅ soil.scss generated`);
  }

  /**
   * Processa variáveis semânticas como CSS custom properties diretas das Seeds
   */
  processSemanticVariablesAsCSS(semanticVars, scss) {
    let result = scss;

    Object.entries(semanticVars).forEach(([category, categoryData], index) => {
      // Add extra spacing between major sections
      if (index > 0) {
        result += `\n`;
      }

      result += `\n  /* ${category.charAt(0).toUpperCase() + category.slice(1)} - Direct from Seeds */\n`;

      result = this.processCategoryData(categoryData, result, category);

      result += `\n`;
    });

    return result;
  }

  /**
   * Processa recursivamente os dados de uma categoria
   */
  processCategoryData(data, result, categoryName = '') {
    if (typeof data === 'object' && data !== null) {
      const keys = Object.keys(data);
      
      keys.forEach((key, index) => {
        const value = data[key];
        
        if (key.startsWith('--') && typeof value === 'string') {
          // This is a CSS variable
          const resolvedValue = this.resolveSoilReference(value);
          result += `  ${key}: #{${resolvedValue}};\n`;
        } else if (typeof value === 'object' && value !== null) {
          // This is a nested object, process recursively
          
          // Add spacing and comments between subsections in palette-semantic
          if (categoryName === 'palette-semantic' && index > 0) {
            result += `\n\n`;
          }
          
          result = this.processCategoryData(value, result, categoryName);
        }
      });
    }
    return result;
  }

  /**
   * Resolve referências do soil para var() functions
   */
  resolveSoilReference(value) {
    if (typeof value === 'string') {
      let resolved = value;

      // Palette references - Brand variations
      resolved = resolved.replace(/palette\.\$palette-seeds\.brand\.standard\[(\d+)\]/g, '$palette-brand-standard-$1');
      resolved = resolved.replace(/palette\.\$palette-seeds\.brand\.deep\[(\d+)\]/g, '$palette-brand-deep-$1');
      resolved = resolved.replace(/palette\.\$palette-seeds\.brand\.soft\[(\d+)\]/g, '$palette-brand-soft-$1');
      resolved = resolved.replace(/palette\.\$palette-seeds\.brand\.aux\[(\d+)\]/g, '$palette-brand-aux-$1');
      resolved = resolved.replace(/palette\.\$palette-seeds\.brand\.aux-deep\[(\d+)\]/g, '$palette-brand-aux-deep-$1');
      resolved = resolved.replace(/palette\.\$palette-seeds\.brand\.aux-soft\[(\d+)\]/g, '$palette-brand-aux-soft-$1');

      // Palette references - Neutral and Context
      resolved = resolved.replace(/palette\.\$palette-seeds\.neutral\[(\d+)\]/g, '$palette-neutral-$1');
      resolved = resolved.replace(/palette\.\$palette-seeds\.context\[(\d+)\]/g, '$palette-context-$1');
      resolved = resolved.replace(/palette\.\$palette-seeds\.gradients\[(\d+)\]/g, '$palette-gradient-$1');
      resolved = resolved.replace(/palette\.\$palette-seeds\.elevation\[(\d+)\]/g, '$palette-elevation-$1');
      resolved = resolved.replace(/palette\.\$palette-seeds\.opacity\[(\d+)\]/g, '$palette-opacity-$1');

      // Layout references
      resolved = resolved.replace(/layout\.\$layout-seeds\.containers\[(\d+)\]/g, '$layout-containers-$1');
      resolved = resolved.replace(/layout\.\$layout-seeds\.breakpoints\[(\d+)\]/g, '$layout-breakpoints-$1');

      // Motion references
      resolved = resolved.replace(/motion\.\$motion-seeds\.durations\[(\d+)\]/g, '$motion-duration-$1');
      resolved = resolved.replace(/motion\.\$motion-seeds\.delays\[(\d+)\]/g, '$motion-delay-$1');
      resolved = resolved.replace(/motion\.\$motion-seeds\.timings\[(\d+)\]/g, '$motion-timing-$1');
      resolved = resolved.replace(/motion\.\$motion-seeds\.distances\[(\d+)\]/g, '$motion-distance-$1');

      // Outline references
      resolved = resolved.replace(/outline\.\$outline-seeds\.widths\[(\d+)\]/g, '$outline-width-$1');
      resolved = resolved.replace(/outline\.\$outline-seeds\.styles\[(\d+)\]/g, '$outline-style-$1');
      resolved = resolved.replace(/outline\.\$outline-seeds\.radii\[(\d+)\]/g, '$outline-radius-$1');
      resolved = resolved.replace(/outline\.\$outline-seeds\.radii\.circle/g, '$outline-radius-circle');

      // Scale references
      resolved = resolved.replace(/scale\.\$scale-seeds\.z-index\[(\d+)\]/g, '$scale-z-$1');
      resolved = resolved.replace(/scale\.\$scale-seeds\.z-index\.max/g, '$scale-z-max');

      // Spacing references
      resolved = resolved.replace(/spacing\.\$spacing-seeds\.generic\[(\d+)\]/g, '$spacing-generic-$1');

      // Type references
      resolved = resolved.replace(/type\.\$type-seeds\.families\.(\w+)/g, '$type-family-$1');
      resolved = resolved.replace(/type\.\$type-seeds\.sizes\[(\d+)\]/g, '$type-size-$1');
      resolved = resolved.replace(/type\.\$type-seeds\.line-heights\[(\d+)\]/g, '$type-line-height-$1');
      resolved = resolved.replace(/type\.\$type-seeds\.weights\[(\d+)\]/g, '$type-weight-$1');

      return resolved;
    }

    return value;
  }

  /**
   * Converte propriedade CSS de camelCase para kebab-case
   */
  cssPropertyToKebab(prop) {
    if (typeof prop !== 'string') {
      return prop;
    }

    return prop.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }
}