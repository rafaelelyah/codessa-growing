/**
 * Component Updater
 * Updates component registries by scanning source files
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ComponentUpdater {
  constructor(configManager) {
    this.config = configManager;
    this.woodPath = path.join(__dirname, '../../wood');
  }

  /**
   * Update leafs components registry
   */
  async updateLeafs() {
    const results = {
      success: true,
      processed: [],
      created: [],
      updated: [],
      errors: []
    };

    try {
      const leafsPath = path.join(this.woodPath, 'leafs');

      // Get all .scss files in leafs directory
      const entries = await fs.readdir(leafsPath, { withFileTypes: true });
      const scssFiles = entries
        .filter(entry => entry.isFile() && path.extname(entry.name) === '.scss')
        .map(entry => entry.name);

      for (const scssFile of scssFiles) {
        try {
          const filePath = path.join(leafsPath, scssFile);
          const content = await fs.readFile(filePath, 'utf-8');

          // Parse leafs from SCSS content
          const leafs = this.parseLeafsFromScss(content);

          // Create/update JSON file
          const jsonFileName = scssFile.replace('.scss', '.json');
          const jsonFilePath = path.join(leafsPath, jsonFileName);

          const jsonData = {
            file: scssFile,
            lastUpdated: new Date().toISOString(),
            leafs: leafs
          };

          // Check if JSON file exists
          const jsonExists = await this.fileExists(jsonFilePath);

          await fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2));

          results.processed.push(scssFile);
          if (jsonExists) {
            results.updated.push(jsonFileName);
          } else {
            results.created.push(jsonFileName);
          }

        } catch (error) {
          results.errors.push(`Failed to process ${scssFile}: ${error.message}`);
        }
      }

    } catch (error) {
      results.success = false;
      results.errors.push(`Failed to update leafs: ${error.message}`);
    }

    return results;
  }

  /**
   * Update sprouts components registry
   */
  async updateSprouts() {
    const results = {
      success: true,
      processed: [],
      created: [],
      updated: [],
      errors: []
    };

    try {
      const sproutsPath = path.join(this.woodPath, 'sprouts');

      // Get all .meta.json files in sprouts directory
      const entries = await fs.readdir(sproutsPath, { withFileTypes: true });
      const metaFiles = entries
        .filter(entry => entry.isFile() && entry.name.endsWith('.meta.json'))
        .map(entry => entry.name);

      for (const metaFile of metaFiles) {
        try {
          console.log(`Processing metadata: ${metaFile}`); // Debug
          const filePath = path.join(sproutsPath, metaFile);
          const content = await fs.readFile(filePath, 'utf-8');

          // Parse metadata
          const metadata = JSON.parse(content);

          // Create/update JSON file for sprouts
          const jsonFileName = metaFile.replace('.meta.json', '.json');
          const jsonFilePath = path.join(sproutsPath, jsonFileName);

          const jsonData = {
            file: metaFile.replace('.meta.json', '.scss'),
            lastUpdated: new Date().toISOString(),
            sprouts: metadata.sprouts || [],
            keyframes: metadata.keyframes || []
          };

          // Check if JSON file exists
          const jsonExists = await this.fileExists(jsonFilePath);

          await fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2));

          results.processed.push(metaFile);
          if (jsonExists) {
            results.updated.push(jsonFileName);
          } else {
            results.created.push(jsonFileName);
          }

        } catch (error) {
          results.errors.push(`Failed to process ${metaFile}: ${error.message}`);
        }
      }

    } catch (error) {
      results.success = false;
      results.errors.push(`Failed to update sprouts: ${error.message}`);
    }

    return results;
  }

  /**
   * Parse sprouts from SCSS content
   */
  parseSproutsFromScss(content, fileName = 'unknown') {
    console.log(`\n=== Processing ${fileName} ===`); // Debug
    const sprouts = [];
    const keyframes = [];

    // Split content into lines for easier processing
    const lines = content.split('\n');
    console.log(`Total lines: ${lines.length}`); // Debug

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Look for @mixin definitions
      const mixinMatch = line.match(/^@mixin\s+([a-zA-Z][a-zA-Z0-9-]*)\s*\(/);
      if (mixinMatch) {
        const mixinName = mixinMatch[1];
        console.log(`Found mixin: ${mixinName} at line ${i}`); // Debug
        const dependencies = new Set();

        // Find opening brace and parse the mixin
        let braceCount = 0;
        let foundOpeningBrace = false;

        // Find the opening brace
        for (let j = i + 1; j < lines.length && !foundOpeningBrace; j++) {
          const currentLine = lines[j].trim();
          if (currentLine.includes('{')) {
            braceCount = 1;
            foundOpeningBrace = true;
            i = j; // Move to the opening brace line
          }
        }

        // Parse from opening brace until closing brace
        let startLine = i;
        while (i < lines.length && braceCount > 0) {
          const currentLine = lines[i].trim();

          // Count braces
          const openCount = (currentLine.match(/{/g) || []).length;
          const closeCount = (currentLine.match(/}/g) || []).length;
          braceCount += openCount - closeCount;

          // Look for @include statements (but not inside nested braces)
          if (braceCount === 1) { // Only at the top level of the mixin
            const includeMatch = currentLine.match(/^@include\s+([a-zA-Z][a-zA-Z0-9-]*)\s*\(/);
            if (includeMatch) {
              dependencies.add(includeMatch[1]);
            }
          }

          i++;
        }

        // After processing the mixin, continue from where we left off
        // i is already at the right position due to the while loop
      }

      // Look for @keyframes definitions
      const keyframeMatch = line.match(/^@keyframes\s+([a-zA-Z][a-zA-Z0-9-_]*)/);
      if (keyframeMatch) {
        console.log(`Found keyframe: ${keyframeMatch[1]} at line ${i}`); // Debug
        keyframes.push(keyframeMatch[1]);

        // Skip the keyframe block
        let braceCount = 0;
        while (i < lines.length) {
          const currentLine = lines[i].trim();
          braceCount += (currentLine.match(/{/g) || []).length;
          braceCount -= (currentLine.match(/}/g) || []).length;

          if (braceCount <= 0 && currentLine.includes('}')) {
            break;
          }
          i++;
        }
      }
    }

    return {
      sprouts: sprouts.sort((a, b) => a.name.localeCompare(b.name)),
      keyframes: keyframes.sort()
    };
  }

  /**
   * Parse leafs from SCSS content
   */
  parseLeafsFromScss(content) {
    const leafs = [];

    // Split content into lines for easier processing
    const lines = content.split('\n');
    let i = 0;

    while (i < lines.length) {
      const line = lines[i].trim();

      // Look for .leaf-* class definitions
      const classMatch = line.match(/^\.leaf-([a-zA-Z][a-zA-Z0-9-]*)\s*{/);
      if (classMatch) {
        const baseClass = classMatch[1]; // e.g., "display", "overflow"
        const fullClassName = `leaf-${baseClass}`;

        // Find the closing brace of this class
        let braceCount = 1;
        let j = i + 1;
        const modifiers = [];

        while (j < lines.length && braceCount > 0) {
          const currentLine = lines[j].trim();

          // Count braces
          const openBraces = (currentLine.match(/{/g) || []).length;
          const closeBraces = (currentLine.match(/}/g) || []).length;
          braceCount += openBraces - closeBraces;

          // Look for &-- modifiers
          const modifierMatch = currentLine.match(/^&--([a-zA-Z][a-zA-Z0-9-]*)\s*{/);
          if (modifierMatch) {
            const modifier = modifierMatch[1];
            modifiers.push(`&--${modifier}`);
          }

          j++;
        }

        // Add the leaf with its modifiers
        leafs.push({
          name: fullClassName,
          modifiers: modifiers.sort()
        });

        // Skip to after this class block
        i = j;
      } else {
        i++;
      }
    }

    return leafs.sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Update trunks components registry
   */
  async updateTrunks() {
    const results = {
      success: true,
      processed: [],
      created: [],
      updated: [],
      errors: []
    };

    try {
      const trunksPath = path.join(this.woodPath, 'trunks');

      // Get all .meta.json files in trunks directory
      const entries = await fs.readdir(trunksPath, { withFileTypes: true });
      const metaFiles = entries
        .filter(entry => entry.isFile() && entry.name.endsWith('.meta.json'))
        .map(entry => entry.name);

      for (const metaFile of metaFiles) {
        try {
          console.log(`Processing trunk metadata: ${metaFile}`);
          const filePath = path.join(trunksPath, metaFile);
          const content = await fs.readFile(filePath, 'utf-8');

          // Parse metadata
          const metadata = JSON.parse(content);

          // Create/update JSON file for trunks
          const jsonFileName = metaFile.replace('.meta.json', '.json');
          const jsonFilePath = path.join(trunksPath, jsonFileName);

          const jsonData = {
            file: metaFile.replace('.meta.json', '.scss'),
            lastUpdated: new Date().toISOString(),
            trunks: metadata.trunks || []
          };

          // Check if JSON file exists
          const jsonExists = await this.fileExists(jsonFilePath);

          await fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2));

          results.processed.push(metaFile);
          if (jsonExists) {
            results.updated.push(jsonFileName);
          } else {
            results.created.push(jsonFileName);
          }

        } catch (error) {
          results.errors.push(`Failed to process ${metaFile}: ${error.message}`);
        }
      }

    } catch (error) {
      results.success = false;
      results.errors.push(`Failed to update trunks: ${error.message}`);
    }

    return results;
  }

  /**
   * Update sparks components registry
   */
  async updateSparks() {
    const results = {
      success: true,
      processed: [],
      created: [],
      updated: [],
      errors: []
    };

    try {
      const sparksPath = path.join(this.woodPath, 'sparks');
      const metaFile = path.join(sparksPath, 'sparks.meta.json');

      // Check if meta file exists
      if (!(await this.fileExists(metaFile))) {
        results.errors.push('sparks.meta.json not found');
        results.success = false;
        return results;
      }

      // Read and parse metadata
      const content = await fs.readFile(metaFile, 'utf-8');
      const metadata = JSON.parse(content);

      // Create/update JSON file for sparks
      const jsonFilePath = path.join(sparksPath, 'sparks.json');

      const jsonData = {
        file: 'sparks.meta.json',
        lastUpdated: new Date().toISOString(),
        sparks: metadata.sparks
      };

      // Check if JSON file exists
      const jsonExists = await this.fileExists(jsonFilePath);

      await fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2));

      results.processed.push('sparks.meta.json');
      if (jsonExists) {
        results.updated.push('sparks.json');
      } else {
        results.created.push('sparks.json');
      }

    } catch (error) {
      results.success = false;
      results.errors.push(`Failed to update sparks: ${error.message}`);
    }

    return results;
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