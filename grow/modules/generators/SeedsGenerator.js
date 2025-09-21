import fs from 'fs-extra';
import path from 'path';

/**
 * Seeds Generator
 * Converte arquivos JSON de wood/seeds/ para um único arquivo seeds.scss
 */

export class SeedsGenerator {
  constructor(woodPath, projectPath) {
    this.woodPath = woodPath;
    this.projectPath = projectPath;
    this.seedsPath = path.join(woodPath, 'seeds');
    this.outputPath = path.join(projectPath, 'foundation', 'seeds.scss');
    this.tokens = {};
  }

  /**
   * Converte todos os arquivos JSON das seeds para SCSS
   */
  async generateAll() {
    console.log('🌱 Generating seeds.scss...');

    // Ordem de processamento: Scale, Palette, Type, Spacing, Layout, Motion, Outline
    const files = [
      { name: 'scale', method: 'convertScale' },
      { name: 'palette', method: 'convertPalette' },
      { name: 'type', method: 'convertType' },
      { name: 'spacing', method: 'convertSpacing' },
      { name: 'layout', method: 'convertLayout' },
      { name: 'motion', method: 'convertMotion' },
      { name: 'outline', method: 'convertOutline' }
    ];

    for (const file of files) {
      const filePath = path.join(this.seedsPath, `${file.name}.json`);

      if (!await fs.pathExists(filePath)) {
        console.warn(`⚠️  ${file.name}.json not found, skipping...`);
        continue;
      }

      console.log(`📄 Processing ${file.name}.json...`);
      const data = await fs.readJson(filePath);

      // Call specific method for each file
      if (this[file.method]) {
        this[file.method](data);
      } else {
        console.warn(`⚠️  Method ${file.method} not found for ${file.name}`);
      }
    }

    // Generate final SCSS file
    await this.generateScss();
    console.log('✅ seeds.scss generated successfully!');
    return true;
  }

  /**
   * Converte scale.json para variáveis SCSS
   */
  convertScale(scaleData) {
    // Process base values first (no dependencies)
    this.processBaseValues(scaleData.base);

    // Then process values that depend on base
    this.processSizes(scaleData.sizes);
    this.processDurations(scaleData.durations);
    this.processLetterSpacing(scaleData.letter);
    this.processZIndex(scaleData['z-index']);
    this.processColumns(scaleData.columns);
  }

  /**
   * Processa valores base (não têm dependências)
   */
  processBaseValues(base) {
    this.addVariable('scale-base-granular', base.granular);
    this.addVariable('scale-base-micro', base.micro);
    this.addVariable('scale-base-medium', base.medium);
    this.addVariable('scale-base-macro', base.macro);
    this.addVariable('scale-base-duration', base.duration);
  }

  /**
   * Processa tamanhos (dependem dos valores base)
   */
  processSizes(sizes) {
    // Micro sizes
    Object.entries(sizes.micro).forEach(([key, value]) => {
      const resolvedValue = this.resolveReference(value, 'sizes');
      this.addVariable(`scale-size-micro-${key}`, resolvedValue);
    });

    // Medium sizes
    Object.entries(sizes.medium).forEach(([key, value]) => {
      const resolvedValue = this.resolveReference(value, 'sizes');
      this.addVariable(`scale-size-medium-${key}`, resolvedValue);
    });

    // Macro sizes
    Object.entries(sizes.macro).forEach(([key, value]) => {
      const resolvedValue = this.resolveReference(value, 'sizes');
      this.addVariable(`scale-size-macro-${key}`, resolvedValue);
    });
  }

  /**
   * Processa durações (dependem do valor base duration)
   */
  processDurations(durations) {
    Object.entries(durations).forEach(([key, value]) => {
      const resolvedValue = this.resolveReference(value, 'durations');
      this.addVariable(`scale-duration-${key}`, resolvedValue);
    });
  }

  /**
   * Processa espaçamento de letras
   */
  processLetterSpacing(letter) {
    Object.entries(letter).forEach(([key, value]) => {
      this.addVariable(`scale-letter-${key}`, value);
    });
  }

  /**
   * Processa z-index
   */
  processZIndex(zIndex) {
    Object.entries(zIndex).forEach(([key, value]) => {
      this.addVariable(`scale-z-${key}`, value);
    });
  }

  /**
   * Processa colunas
   */
  processColumns(columns) {
    Object.entries(columns).forEach(([key, value]) => {
      this.addVariable(`scale-col-${key}`, value);
    });
  }

  /**
   * Converte palette.json para variáveis SCSS
   */
  convertPalette(paletteData) {
    // Brand colors
    this.processPaletteSection(paletteData.brand, 'brand');

    // Gradients
    this.processPaletteSection(paletteData.gradients, 'gradient');

    // Neutral colors
    this.processPaletteSection(paletteData.neutral, 'neutral');

    // Context colors
    this.processPaletteSection(paletteData.context, 'context');

    // Elevation
    this.processPaletteSection(paletteData.elevation, 'elevation');

    // Opacity
    this.processPaletteSection(paletteData.opacity, 'opacity');
  }

  /**
   * Processa uma seção da palette
   */
  processPaletteSection(section, prefix) {
    Object.entries(section).forEach(([category, values]) => {
      if (typeof values === 'object') {
        Object.entries(values).forEach(([key, value]) => {
          this.addVariable(`palette-${prefix}-${category}-${key}`, value);
        });
      } else {
        this.addVariable(`palette-${prefix}-${category}`, values);
      }
    });
  }

  /**
   * Converte type.json para variáveis SCSS
   */
  convertType(typeData) {
    // Font families
    Object.entries(typeData.families).forEach(([key, value]) => {
      const fontStack = Array.isArray(value) ? value.join(', ') : value;
      this.addVariable(`type-family-${key}`, fontStack);
    });

    // Font sizes (com resolução de referências)
    Object.entries(typeData.sizes).forEach(([key, value]) => {
      const resolvedValue = this.resolveMapGet(value);
      this.addVariable(`type-size-${key}`, resolvedValue);
    });

    // Line heights
    Object.entries(typeData['line-heights']).forEach(([key, value]) => {
      this.addVariable(`type-line-height-${key}`, value);
    });

    // Font weights
    Object.entries(typeData.weights).forEach(([key, value]) => {
      this.addVariable(`type-weight-${key}`, value);
    });
  }

  /**
   * Converte spacing.json para variáveis SCSS
   */
  convertSpacing(spacingData) {
    Object.entries(spacingData.spacing).forEach(([category, values]) => {
      Object.entries(values).forEach(([key, value]) => {
        const resolvedValue = this.resolveMapGet(value);
        this.addVariable(`spacing-${category}-${key}`, resolvedValue);
      });
    });
  }

  /**
   * Converte layout.json para variáveis SCSS
   */
  convertLayout(layoutData) {
    Object.entries(layoutData.layout).forEach(([category, values]) => {
      Object.entries(values).forEach(([key, value]) => {
        const resolvedValue = this.resolveMapGet(value);
        this.addVariable(`layout-${category}-${key}`, resolvedValue);
      });
    });
  }

  /**
   * Converte motion.json para variáveis SCSS
   */
  convertMotion(motionData) {
    // Durations
    Object.entries(motionData.durations).forEach(([key, value]) => {
      const resolvedValue = this.resolveMapGet(value);
      this.addVariable(`motion-duration-${key}`, resolvedValue);
    });

    // Delays
    Object.entries(motionData.delays).forEach(([key, value]) => {
      const resolvedValue = this.resolveMapGet(value);
      this.addVariable(`motion-delay-${key}`, resolvedValue);
    });

    // Timings
    Object.entries(motionData.timings).forEach(([key, value]) => {
      this.addVariable(`motion-timing-${key}`, value);
    });

    // Distances
    Object.entries(motionData.distances).forEach(([key, value]) => {
      const resolvedValue = this.resolveMapGet(value);
      this.addVariable(`motion-distance-${key}`, resolvedValue);
    });
  }

  /**
   * Converte outline.json para variáveis SCSS
   */
  convertOutline(outlineData) {
    // Widths
    Object.entries(outlineData.widths).forEach(([key, value]) => {
      const resolvedValue = this.resolveMapGet(value);
      this.addVariable(`outline-width-${key}`, resolvedValue);
    });

    // Styles
    Object.entries(outlineData.styles).forEach(([key, value]) => {
      this.addVariable(`outline-style-${key}`, value);
    });

    // Radii
    Object.entries(outlineData.radii).forEach(([key, value]) => {
      const resolvedValue = this.resolveMapGet(value);
      this.addVariable(`outline-radius-${key}`, resolvedValue);
    });
  }

  /**
   * Resolve referências map.get() para SCSS variable references
   */
  resolveMapGet(value) {
    if (typeof value === 'string' && value.includes('map.get')) {
      let resolved = value;

      // Resolver referências para sizes
      resolved = resolved.replace(
        /map\.get\(seeds\.\$sizes-seeds, 'sizes', 'micro', '(\d+)'\)/g,
        '$scale-size-micro-$1'
      );
      resolved = resolved.replace(
        /map\.get\(seeds\.\$sizes-seeds, 'sizes', 'medium', '(\d+)'\)/g,
        '$scale-size-medium-$1'
      );
      resolved = resolved.replace(
        /map\.get\(seeds\.\$sizes-seeds, 'sizes', 'macro', '(\d+)'\)/g,
        '$scale-size-macro-$1'
      );

      // Resolver referências para durations
      resolved = resolved.replace(
        /map\.get\(seeds\.\$sizes-seeds, 'durations', '(\d+)'\)/g,
        '$scale-duration-$1'
      );

      // Resolver referências para scale base
      resolved = resolved.replace(
        /map\.get\(seeds\.\$scale-seeds, 'base', 'granular'\)/g,
        '$scale-base-granular'
      );

      return resolved;
    }

    return value;
  }

  /**
   * Resolve referências como {base.micro} para valores reais
   */
  resolveReference(value, context = 'default') {
    if (typeof value === 'string' && value.includes('{')) {
      let resolved = value;

      // Para tamanhos e durações, usar referências SCSS diretas
      if (context === 'sizes' || context === 'durations') {
        resolved = resolved.replace(/\{base\.granular\}/g, '$scale-base-granular');
        resolved = resolved.replace(/\{base\.micro\}/g, '$scale-base-micro');
        resolved = resolved.replace(/\{base\.medium\}/g, '$scale-base-medium');
        resolved = resolved.replace(/\{base\.macro\}/g, '$scale-base-macro');
        resolved = resolved.replace(/\{base\.duration\}/g, '$scale-base-duration');
      }

      return resolved;
    }

    return value;
  }

  /**
   * Adiciona uma variável SCSS
   */
  addVariable(name, value) {
    this.tokens[name] = value;
  }

  /**
   * Gera o arquivo SCSS final
   */
  async generateScss() {
    let scss = `// ========================================\n`;
    scss += `// 🌱 SEEDS - Design System Tokens\n`;
    scss += `// Generated automatically from all JSON files\n`;
    scss += `// ========================================\n\n`;

    // ========================================
    // SCALE SECTION
    // ========================================
    scss += `// 🔧 SCALE - Base values and scales\n`;

    // Base values
    scss += `// Base values\n`;
    Object.entries(this.tokens)
      .filter(([key]) => key.startsWith('scale-base-'))
      .forEach(([key, value]) => {
        scss += `$${key}: ${value};\n`;
      });

    scss += `\n// Sizes\n`;
    // Micro, Medium, Macro sizes
    ['micro', 'medium', 'macro'].forEach(size => {
      Object.entries(this.tokens)
        .filter(([key]) => key.startsWith(`scale-size-${size}-`))
        .forEach(([key, value]) => {
          scss += `$${key}: ${value};\n`;
        });
    });

    scss += `\n// Durations\n`;
    Object.entries(this.tokens)
      .filter(([key]) => key.startsWith('scale-duration-'))
      .forEach(([key, value]) => {
        scss += `$${key}: ${value};\n`;
      });

    scss += `\n// Letter spacing\n`;
    Object.entries(this.tokens)
      .filter(([key]) => key.startsWith('scale-letter-'))
      .forEach(([key, value]) => {
        scss += `$${key}: ${value};\n`;
      });

    scss += `\n// Z-index\n`;
    Object.entries(this.tokens)
      .filter(([key]) => key.startsWith('scale-z-'))
      .forEach(([key, value]) => {
        scss += `$${key}: ${value};\n`;
      });

    scss += `\n// Columns\n`;
    Object.entries(this.tokens)
      .filter(([key]) => key.startsWith('scale-col-'))
      .forEach(([key, value]) => {
        scss += `$${key}: ${value};\n`;
      });

    // ========================================
    // PALETTE SECTION
    // ========================================
    scss += `\n\n// 🎨 PALETTE - Colors and themes\n`;

    // Brand colors
    scss += `// Brand colors\n`;
    Object.entries(this.tokens)
      .filter(([key]) => key.startsWith('palette-brand-'))
      .forEach(([key, value]) => {
        scss += `$${key}: ${value};\n`;
      });

    scss += `\n// Gradients\n`;
    Object.entries(this.tokens)
      .filter(([key]) => key.startsWith('palette-gradient-'))
      .forEach(([key, value]) => {
        scss += `$${key}: ${value};\n`;
      });

    scss += `\n// Neutral colors\n`;
    Object.entries(this.tokens)
      .filter(([key]) => key.startsWith('palette-neutral-'))
      .forEach(([key, value]) => {
        scss += `$${key}: ${value};\n`;
      });

    scss += `\n// Context colors\n`;
    Object.entries(this.tokens)
      .filter(([key]) => key.startsWith('palette-context-'))
      .forEach(([key, value]) => {
        scss += `$${key}: ${value};\n`;
      });

    scss += `\n// Elevation\n`;
    Object.entries(this.tokens)
      .filter(([key]) => key.startsWith('palette-elevation-'))
      .forEach(([key, value]) => {
        scss += `$${key}: ${value};\n`;
      });

    scss += `\n// Opacity\n`;
    Object.entries(this.tokens)
      .filter(([key]) => key.startsWith('palette-opacity-'))
      .forEach(([key, value]) => {
        scss += `$${key}: ${value};\n`;
      });

    // ========================================
    // TYPE SECTION
    // ========================================
    scss += `\n\n// 📝 TYPE - Typography\n`;

    scss += `// Font families\n`;
    Object.entries(this.tokens)
      .filter(([key]) => key.startsWith('type-family-'))
      .forEach(([key, value]) => {
        scss += `$${key}: ${value};\n`;
      });

    scss += `\n// Font sizes\n`;
    Object.entries(this.tokens)
      .filter(([key]) => key.startsWith('type-size-'))
      .forEach(([key, value]) => {
        scss += `$${key}: ${value};\n`;
      });

    scss += `\n// Line heights\n`;
    Object.entries(this.tokens)
      .filter(([key]) => key.startsWith('type-line-height-'))
      .forEach(([key, value]) => {
        scss += `$${key}: ${value};\n`;
      });

    scss += `\n// Font weights\n`;
    Object.entries(this.tokens)
      .filter(([key]) => key.startsWith('type-weight-'))
      .forEach(([key, value]) => {
        scss += `$${key}: ${value};\n`;
      });

    // ========================================
    // SPACING SECTION
    // ========================================
    scss += `\n\n// 📏 SPACING - Spacing\n`;

    ['generic', 'padding', 'margin', 'gap', 'offset'].forEach(category => {
      scss += `// ${category.charAt(0).toUpperCase() + category.slice(1)}\n`;
      Object.entries(this.tokens)
        .filter(([key]) => key.startsWith(`spacing-${category}-`))
        .forEach(([key, value]) => {
          scss += `$${key}: ${value};\n`;
        });
      scss += `\n`;
    });

    // ========================================
    // LAYOUT SECTION
    // ========================================
    scss += `\n// 📐 LAYOUT - Layout and containers\n`;

    ['containers', 'breakpoints'].forEach(category => {
      scss += `// ${category.charAt(0).toUpperCase() + category.slice(1)}\n`;
      Object.entries(this.tokens)
        .filter(([key]) => key.startsWith(`layout-${category}-`))
        .forEach(([key, value]) => {
          scss += `$${key}: ${value};\n`;
        });
      scss += `\n`;
    });

    // ========================================
    // MOTION SECTION
    // ========================================
    scss += `\n// 🎬 MOTION - Animations\n`;

    ['duration', 'delay', 'timing', 'distance'].forEach(category => {
      scss += `// ${category.charAt(0).toUpperCase() + category.slice(1)}\n`;
      Object.entries(this.tokens)
        .filter(([key]) => key.startsWith(`motion-${category}-`))
        .forEach(([key, value]) => {
          scss += `$${key}: ${value};\n`;
        });
      scss += `\n`;
    });

    // ========================================
    // OUTLINE SECTION
    // ========================================
    scss += `\n// 🔲 OUTLINE - Borders and outlines\n`;

    ['width', 'style', 'radius'].forEach(category => {
      scss += `// ${category.charAt(0).toUpperCase() + category.slice(1)}\n`;
      Object.entries(this.tokens)
        .filter(([key]) => key.startsWith(`outline-${category}-`))
        .forEach(([key, value]) => {
          scss += `$${key}: ${value};\n`;
        });
      scss += `\n`;
    });

    await fs.writeFile(this.outputPath, scss);
  }
}