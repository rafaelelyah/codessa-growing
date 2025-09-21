/**
 * 🌱 JSON Project Initializer
 * Creates data-only projects with JSON configurations
 */

import fs from 'fs-extra';
import path from 'path';
import { JsonCopier } from '../generators/JsonCopier.js';

export class JsonProjectInit {
  constructor(configManager) {
    this.config = configManager;
  }

  async create(projectName, options = {}) {
    const { verbose = false } = options;
    const projectPath = this.config.getProjectPath(projectName);

    try {
      if (verbose) console.log(`🏗️  Creating JSON project structure...`);

      // Create main directories
      await this.createDirectories(projectPath, verbose);

      // Copy JSON files from wood
      await this.copyJsonFiles(projectPath, verbose);

      // Create JSON configuration files
      await this.createJsonFiles(projectPath, projectName, verbose);

      // Create documentation
      await this.createDocumentation(projectPath, projectName, verbose);

      if (verbose) console.log(`✅ JSON project structure created`);

      return {
        success: true,
        structure: {
          foundation: 'foundation/',
          harvest: 'harvest/',
          sparks: 'sparks/',
          tree: 'tree/',
          docs: 'README.md'
        }
      };

    } catch (error) {
      return {
        success: false,
        error: `Failed to create JSON project: ${error.message}`
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
      'tree'
    ];

    for (const dir of dirs) {
      const fullPath = path.join(projectPath, dir);
      await fs.ensureDir(fullPath);
      if (verbose) console.log(`📁 Created: ${dir}`);
    }
  }

  async createJsonFiles(projectPath, projectName, verbose) {
    // Main project configuration (foundation/project.json)
    const projectConfig = {
      name: projectName,
      version: "1.0.0",
      description: `Data project created with Codessa Grow - ${projectName}`,
      type: "data",
      created: new Date().toISOString(),
      growing: {
        version: "1.0.0",
        terrain: "json"
      },
      structure: {
        foundation: "Foundation configurations and variables",
        harvest: "Assets and resources",
        sparks: "JavaScript utilities and configurations",
        tree: "Component architecture definitions"
      }
    };

    await fs.writeJson(path.join(projectPath, 'foundation', 'project.json'), projectConfig, { spaces: 2 });
    if (verbose) console.log(`📄 Created: foundation/project.json`);

    // Design tokens configuration (tree/design-tokens.json)
    const designTokens = {
      name: "design-tokens",
      description: "Design tokens for the project",
      version: "1.0.0",
      tokens: {
        colors: {
          primary: {
            value: "#007bff",
            type: "color",
            description: "Primary brand color"
          },
          secondary: {
            value: "#6c757d",
            type: "color",
            description: "Secondary color"
          }
        },
        spacing: {
          small: {
            value: "8px",
            type: "spacing",
            description: "Small spacing unit"
          },
          medium: {
            value: "16px",
            type: "spacing",
            description: "Medium spacing unit"
          }
        },
        typography: {
          fontSize: {
            base: {
              value: "16px",
              type: "fontSize",
              description: "Base font size"
            }
          }
        }
      }
    };

    await fs.writeJson(path.join(projectPath, 'tree', 'design-tokens.json'), designTokens, { spaces: 2 });
    if (verbose) console.log(`📄 Created: tree/design-tokens.json`);

    // Component configuration (tree/components.json)
    const components = {
      name: "components",
      description: "Component definitions and configurations",
      version: "1.0.0",
      components: {
        button: {
          name: "Button",
          description: "Primary button component",
          variants: ["primary", "secondary", "outline"],
          sizes: ["small", "medium", "large"],
          properties: {
            variant: "primary",
            size: "medium",
            disabled: false
          }
        },
        input: {
          name: "Input",
          description: "Text input component",
          types: ["text", "email", "password"],
          states: ["default", "error", "success"],
          properties: {
            type: "text",
            placeholder: "",
            required: false
          }
        }
      }
    };

    await fs.writeJson(path.join(projectPath, 'tree', 'components.json'), components, { spaces: 2 });
    if (verbose) console.log(`📄 Created: tree/components.json`);

    // Sparks configuration (sparks/config.json)
    const sparksConfig = {
      name: "sparks-config",
      description: "JavaScript utilities configuration",
      version: "1.0.0",
      utilities: {
        domReady: {
          description: "DOM ready utility function",
          enabled: true
        },
        exampleSpark: {
          description: "Example spark function",
          enabled: true
        }
      }
    };

    await fs.writeJson(path.join(projectPath, 'sparks', 'config.json'), sparksConfig, { spaces: 2 });
    if (verbose) console.log(`📄 Created: sparks/config.json`);

    // Schema for design tokens (harvest/docs/design-tokens.schema.json)
    const tokenSchema = {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Design Tokens Schema",
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "description": { "type": "string" },
        "version": { "type": "string" },
        "tokens": {
          "type": "object",
          "patternProperties": {
            ".*": {
              "type": "object",
              "properties": {
                "value": { "type": "string" },
                "type": { "type": "string" },
                "description": { "type": "string" }
              },
              "required": ["value", "type"]
            }
          }
        }
      },
      "required": ["name", "tokens"]
    };

    await fs.writeJson(path.join(projectPath, 'harvest', 'docs', 'design-tokens.schema.json'), tokenSchema, { spaces: 2 });
    if (verbose) console.log(`📄 Created: harvest/docs/design-tokens.schema.json`);
  }

  async createDocumentation(projectPath, projectName, verbose) {
    const readme = `# ${projectName}

Data project created with Codessa Grow.

## Structure

- \`foundation/\` - Foundation configurations and variables
  - \`project.json\` - Main project configuration
- \`harvest/\` - Assets and resources
  - \`img/\` - Images
  - \`audio/\` - Audio files
  - \`video/\` - Video files
  - \`text/\` - Text content
  - \`docs/\` - Documentation and schemas
    - \`design-tokens.schema.json\` - Schema for tokens
- \`sparks/\` - JavaScript utilities configurations
  - \`config.json\` - Sparks configuration
- \`tree/\` - Component architecture definitions
  - \`design-tokens.json\` - Design tokens
  - \`components.json\` - Component definitions

## Usage

This project contains data configurations that can be used by:

- **SCSS projects**: Import tokens for styling
- **JavaScript projects**: Use component configurations
- **Design systems**: Consume design tokens
- **Documentation**: Generate docs from schemas

## Data Flow

\`\`\`
JSON Data → Validation → Consumption → Output
\`\`\`

## Validation

Use the provided schemas to validate your JSON files:

\`\`\`bash
# Validate design tokens
npx ajv validate -s harvest/docs/design-tokens.schema.json -d tree/design-tokens.json
\`\`\`

---

Created with [Codessa Grow](https://github.com/codessa/growing)
`;

    await fs.writeFile(path.join(projectPath, 'README.md'), readme);
    if (verbose) console.log(`📄 Created: README.md`);
  }

  async copyJsonFiles(projectPath, verbose) {
    const woodPath = path.join(this.config.get('ROOT_DIR'), 'wood');

    if (verbose) console.log(`📄 Copying JSON files from: ${woodPath}`);

    // Copy JSON files from wood foundation and seeds
    const jsonCopier = new JsonCopier(woodPath, projectPath);
    await jsonCopier.copyAll();

    if (verbose) console.log(`✅ JSON files copied from wood`);
  }
}