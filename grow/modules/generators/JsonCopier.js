import fs from 'fs-extra';
import path from 'path';

/**
 * JSON Copier
 * Copia arquivos JSON de wood/foundation/ e wood/seeds/ para foundation/ do projeto
 */

export class JsonCopier {
  constructor(woodPath, projectPath) {
    this.woodPath = woodPath;
    this.projectPath = projectPath;
    this.foundationPath = path.join(woodPath, 'foundation');
    this.seedsPath = path.join(woodPath, 'seeds');
    this.outputPath = path.join(projectPath, 'foundation');
  }

  /**
   * Copia todos os arquivos JSON da foundation e seeds
   */
  async copyAll() {
    console.log('📄 Copying JSON files...');

    // Copy foundation files
    await this.copyFoundationFiles();

    // Copy seeds files
    await this.copySeedsFiles();

    console.log('✅ JSON files copied successfully!');
    return true;
  }

  /**
   * Copia arquivos JSON da foundation
   */
  async copyFoundationFiles() {
    const files = ['bark.json', 'roots.json', 'soil.json'];

    for (const file of files) {
      const sourcePath = path.join(this.foundationPath, file);
      const destPath = path.join(this.outputPath, file);

      if (await fs.pathExists(sourcePath)) {
        await fs.copy(sourcePath, destPath);
        console.log(`✅ ${file} copied`);
      } else {
        console.warn(`⚠️  ${file} not found, skipping...`);
      }
    }
  }

  /**
   * Copia arquivos JSON das seeds
   */
  async copySeedsFiles() {
    const files = [
      'scale.json',
      'palette.json',
      'type.json',
      'spacing.json',
      'layout.json',
      'motion.json',
      'outline.json'
    ];

    for (const file of files) {
      const sourcePath = path.join(this.seedsPath, file);
      const destPath = path.join(this.outputPath, file);

      if (await fs.pathExists(sourcePath)) {
        await fs.copy(sourcePath, destPath);
        console.log(`✅ ${file} copied`);
      } else {
        console.warn(`⚠️  ${file} not found, skipping...`);
      }
    }
  }
}