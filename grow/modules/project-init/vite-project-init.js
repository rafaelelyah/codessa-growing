/**
 * 🌱 VITE Project Initializer
 * Creates full web projects with Vite + Growing terrain
 */

import fs from 'fs-extra';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { SassProjectInit } from './sass-project-init.js';

const execAsync = promisify(exec);

export class ViteProjectInit {
  constructor(configManager) {
    this.config = configManager;
    this.sassInit = new SassProjectInit(configManager);
  }

  async create(projectName, options = {}) {
    const { verbose = false } = options;
    const projectPath = this.config.getProjectPath(projectName);

    try {
      if (verbose) console.log(`🏗️  Creating VITE project structure...`);

      // Create SASS structure first
      const sassResult = await this.sassInit.create(projectName, options);
      if (!sassResult.success) {
        return sassResult;
      }

      // Add Vite-specific files
      await this.createViteFiles(projectPath, projectName, verbose);

      // Create package.json
      await this.createPackageJson(projectPath, projectName, verbose);

      // Install dependencies automatically
      await this.installDependencies(projectPath, verbose);

      if (verbose) console.log(`✅ VITE project structure created`);

      return {
        success: true,
        structure: {
          ...sassResult.structure,
          html: 'index.html',
          vite: 'vite.config.js',
          package: 'package.json'
        }
      };

    } catch (error) {
      return {
        success: false,
        error: `Failed to create VITE project: ${error.message}`
      };
    }
  }

  async createViteFiles(projectPath, projectName, verbose) {
    // index.html
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
    <link rel="stylesheet" href="./tree.scss">
  </head>
  <body>
    <div id="app">
      <h1>${projectName}</h1>
      <p>Welcome to your new Growing project!</p>
    </div>

    <script type="module" src="./sparks.js"></script>
  </body>
</html>`;

    await fs.writeFile(path.join(projectPath, 'index.html'), indexHtml);
    if (verbose) console.log(`📄 Created: index.html`);

    // vite.config.js
    const viteConfig = `import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  resolve: {
    alias: {
      '~foundation': resolve(__dirname, 'foundation'),
      '~harvest': resolve(__dirname, 'harvest'),
      '~sparks': resolve(__dirname, 'sparks'),
      '~growth': resolve(__dirname, 'growth')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})`;

    await fs.writeFile(path.join(projectPath, 'vite.config.js'), viteConfig);
    if (verbose) console.log(`📄 Created: vite.config.js`);
  }

  async createPackageJson(projectPath, projectName, verbose) {
    const packageJson = {
      name: projectName,
      version: "1.0.0",
      description: `Project created with Codessa Grow - ${projectName}`,
      type: "module",
      scripts: {
        dev: "vite",
        build: "vite build",
        preview: "vite preview",
        grow: "node ../../grow/grow.js"
      },
      devDependencies: {
        vite: "^5.4.0",
        "sass": "^1.80.0"
      },
      keywords: ["growing", "codessa", "scss", "vite"],
      author: "Codessa Growing",
      license: "MIT"
    };

    await fs.writeJson(path.join(projectPath, 'package.json'), packageJson, { spaces: 2 });
    if (verbose) console.log(`📄 Created: package.json`);
  }

  async installDependencies(projectPath, verbose) {
    try {
      if (verbose) console.log(`📦 Installing dependencies...`);

      // Change to project directory and run npm install
      const { stdout, stderr } = await execAsync('npm install', { cwd: projectPath });

      if (verbose && stdout) console.log(stdout);
      if (stderr) console.log(stderr);

      if (verbose) console.log(`✅ Dependencies installed successfully`);
    } catch (error) {
      // Don't fail the entire project creation if npm install fails
      console.warn(`⚠️  Warning: Failed to install dependencies: ${error.message}`);
      console.warn(`   You can run 'npm install' manually in the project directory`);
    }
  }
}
