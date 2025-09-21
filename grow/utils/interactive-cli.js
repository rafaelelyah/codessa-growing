/**
 * Grow Interactive CLI
 * Professional interactive CLI for project creation
 */

import fs from 'fs/promises';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { ProjectCreator } from '../core/project-creator.js';
import { ComponentPromoter } from '../core/component-promoter.js';
import { ComponentUpdater } from '../core/component-updater.js';

export class InteractiveCLI {
  constructor(configManager) {
    this.config = configManager;
    this.projectCreator = new ProjectCreator(configManager);
    this.componentPromoter = new ComponentPromoter(configManager);
  }

  async start() {
    console.log(chalk.green('Codessa Grow - Interactive Mode'));
    console.log(chalk.gray('Let\'s create something amazing together!\n'));

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          { name: 'Create a new project', value: 'create' },
          { name: 'Promote components', value: 'promote' },
          { name: 'Update components', value: 'update' },
          { name: 'Manage components', value: 'manage', disabled: 'Coming soon' },
          { name: 'Search components', value: 'search', disabled: 'Coming soon' },
          { name: 'Show help', value: 'help' },
          { name: 'Exit', value: 'exit' }
        ]
      }
    ]);

    switch (answers.action) {
      case 'create':
        await this.createProjectFlow();
        break;
      case 'promote':
        await this.promoteComponentsFlow();
        break;
      case 'update':
        await this.updateComponentsFlow();
        break;
      case 'help':
        this.showHelp();
        break;
      case 'exit':
        console.log(chalk.blue('Goodbye!'));
        process.exit(0);
      default:
        console.log(chalk.yellow('Feature coming soon!'));
    }
  }

  async createProjectFlow() {
    console.log(chalk.blue('\nProject Creation Wizard\n'));

    const projectAnswers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project name:',
        validate: (input) => {
          if (!input.trim()) return 'Project name is required';
          if (!/^[a-zA-Z][a-zA-Z0-9-_]*$/.test(input)) {
            return 'Project name must start with a letter and contain only letters, numbers, hyphens, and underscores';
          }
          if (input.length < 2 || input.length > 50) {
            return 'Project name must be between 2 and 50 characters';
          }
          return true;
        }
      },
      {
        type: 'list',
        name: 'type',
        message: 'Project type:',
        choices: [
          {
            name: 'Web App (Vite + SCSS)',
            value: 'vite',
            short: 'Full web application with Vite'
          },
          {
            name: 'SCSS Library',
            value: 'sass',
            short: 'SCSS-only project with Growing terrain'
          },
          {
            name: 'Data Project (JSON)',
            value: 'json',
            short: 'Data-only project with JSON configs'
          }
        ]
      },
      {
        type: 'confirm',
        name: 'includeExamples',
        message: 'Include example components?',
        default: true,
        when: (answers) => answers.type === 'vite' || answers.type === 'sass'
      },
      {
        type: 'confirm',
        name: 'initializeGit',
        message: 'Initialize Git repository?',
        default: false
      },
      {
        type: 'confirm',
        name: 'installDeps',
        message: 'Install dependencies now?',
        default: true,
        when: (answers) => answers.type === 'vite'
      }
    ]);

    // Show summary
    console.log(chalk.blue('\nProject Summary:'));
    console.log(`   Name: ${chalk.cyan(projectAnswers.name)}`);
    console.log(`   Type: ${chalk.cyan(projectAnswers.type)}`);
    if (projectAnswers.includeExamples) {
      console.log(`   Examples: ${chalk.green('Yes')}`);
    }
    if (projectAnswers.initializeGit) {
      console.log(`   Git: ${chalk.green('Yes')}`);
    }
    if (projectAnswers.installDeps) {
      console.log(`   Install deps: ${chalk.green('Yes')}`);
    }

    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Create this project?',
        default: true
      }
    ]);

    if (!confirm) {
      console.log(chalk.yellow('Project creation cancelled'));
      return;
    }

    // Create the project
    const options = {
      type: projectAnswers.type,
      verbose: true,
      includeExamples: projectAnswers.includeExamples,
      initializeGit: projectAnswers.initializeGit,
      installDeps: projectAnswers.installDeps
    };

    const result = await this.projectCreator.create(projectAnswers.name, options);

    if (result.success) {
      console.log(chalk.green(`\nProject ${projectAnswers.name} created successfully!`));
      console.log(chalk.blue(`Location: ${result.path}`));

      // Show next steps
      this.showNextSteps(projectAnswers);
    } else {
      console.log(chalk.red(`\nFailed to create project: ${result.error}`));
    }

    // Ask if user wants to do something else
    const { continue: shouldContinue } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continue',
        message: 'Would you like to do something else?',
        default: false
      }
    ]);

    if (shouldContinue) {
      await this.start();
    } else {
      console.log(chalk.blue('\nThanks for using Codessa Grow!'));
    }
  }

  showNextSteps(projectAnswers) {
    console.log(chalk.yellow('\nNext steps:'));

    switch (projectAnswers.type) {
      case 'vite':
        console.log(`   cd ${projectAnswers.name}`);
        if (!projectAnswers.installDeps) {
          console.log(`   npm install`);
        }
        console.log(`   npm run dev`);
        break;

      case 'sass':
        console.log(`   cd ${projectAnswers.name}`);
        console.log(`   # Import src/main.scss in your project`);
        break;

      case 'json':
        console.log(`   cd ${projectAnswers.name}`);
        console.log(`   # Use the JSON files in your applications`);
        break;
    }

    if (projectAnswers.initializeGit) {
      console.log(`   git add .`);
      console.log(`   git commit -m "Initial commit"`);
    }
  }

  async promoteComponentsFlow() {
    console.log(chalk.blue('\nComponent Promotion Wizard\n'));
    console.log(chalk.gray('Copy components from wood/ to your projects with automatic dependency resolution\n'));

    try {
      // Get available component types
      const componentTypes = await this.componentPromoter.getComponentTypes();

      if (componentTypes.length === 0) {
        console.log(chalk.red('No component types found in wood/ directory'));
        return;
      }

      // Select component type
      const { componentType } = await inquirer.prompt([
        {
          type: 'list',
          name: 'componentType',
          message: 'Select component type:',
          choices: componentTypes.map(type => ({
            name: this.formatComponentType(type),
            value: type
          }))
        }
      ]);

      // Special handling for leafs
      if (componentType === 'leafs') {
        await this.promoteLeafsFlow();
        return;
      }

      // Special handling for sprouts
      if (componentType === 'sprouts') {
        await this.promoteSproutsFlow();
        return;
      }

      // Special handling for trunks
      if (componentType === 'trunks') {
        await this.promoteTrunksFlow();
        return;
      }

      // Get available components of selected type
      const components = await this.componentPromoter.getComponents(componentType);

      if (components.length === 0) {
        console.log(chalk.red(`No ${componentType} components found`));
        return;
      }

      // Select component
      const { componentName } = await inquirer.prompt([
        {
          type: 'list',
          name: 'componentName',
          message: `Select ${componentType} component:`,
          choices: components.map(comp => ({
            name: comp,
            value: comp
          }))
        }
      ]);

      // Get available target projects
      const targetProjects = await this.componentPromoter.getTargetProjects();

      if (targetProjects.length === 0) {
        console.log(chalk.red('No projects found in mygroves/ directory'));
        console.log(chalk.yellow('Create a project first using "Create a new project" option'));
        return;
      }

      // Select target project
      const { targetProject } = await inquirer.prompt([
        {
          type: 'list',
          name: 'targetProject',
          message: 'Select target project:',
          choices: targetProjects.map(project => ({
            name: project,
            value: project
          }))
        }
      ]);

      // Promotion options
      const promotionOptions = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'includeDependencies',
          message: componentType === 'trunks' ? 'Include dependencies (recommended)?' : 'Include dependencies?',
          default: true
        },
        {
          type: 'confirm',
          name: 'force',
          message: 'Overwrite existing files?',
          default: false
        },
        {
          type: 'confirm',
          name: 'backup',
          message: 'Create backups of existing files?',
          default: true
        }
      ]);

      // Show summary
      console.log(chalk.blue('\nPromotion Summary:'));
      console.log(`   Component: ${chalk.cyan(`${componentType}/${componentName}`)}`);
      console.log(`   Target: ${chalk.cyan(targetProject)}`);
      console.log(`   Dependencies: ${promotionOptions.includeDependencies ? chalk.green('Yes') : chalk.red('No')}`);
      console.log(`   Overwrite: ${promotionOptions.force ? chalk.yellow('Yes') : chalk.green('No')}`);
      console.log(`   Backup: ${promotionOptions.backup ? chalk.green('Yes') : chalk.red('No')}`);

      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: 'Proceed with promotion?',
          default: true
        }
      ]);

      if (!confirm) {
        console.log(chalk.yellow('Promotion cancelled'));
        return;
      }

      // Perform promotion
      const result = await this.componentPromoter.promote(
        componentType,
        componentName,
        targetProject,
        promotionOptions
      );

      // Show results
      if (result.success) {
        console.log(chalk.green('\nPromotion completed successfully!'));

        if (result.copied.length > 0) {
          console.log(chalk.blue('Copied components:'));
          result.copied.forEach(comp => console.log(`   ✓ ${comp}`));
        }

        if (result.skipped.length > 0) {
          console.log(chalk.yellow('Skipped (already exists):'));
          result.skipped.forEach(comp => console.log(`   - ${comp}`));
        }

        if (result.errors.length > 0) {
          console.log(chalk.red('Errors:'));
          result.errors.forEach(error => console.log(`   ✗ ${error}`));
        }
      } else {
        console.log(chalk.red('\nPromotion failed:'));
        result.errors.forEach(error => console.log(`   ✗ ${error}`));
      }

    } catch (error) {
      console.log(chalk.red(`\nError during promotion: ${error.message}`));
    }

    // Ask if user wants to do something else
    const { continue: shouldContinue } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continue',
        message: 'Would you like to do something else?',
        default: false
      }
    ]);

    if (shouldContinue) {
      await this.start();
    } else {
      console.log(chalk.blue('\nThanks for using Codessa Grow!'));
    }
  }

  async promoteLeafsFlow() {
    console.log(chalk.blue('\nLeafs Promotion Wizard\n'));
    console.log(chalk.gray('Promote leafs (CSS classes) to a project foundation\n'));

    try {
      // Get available target projects
      const targetProjects = await this.componentPromoter.getTargetProjects();

      if (targetProjects.length === 0) {
        console.log(chalk.red('No projects found in mygroves/ directory'));
        console.log(chalk.yellow('Create a project first using "Create a new project" option'));
        return;
      }

      // Select target project
      const { targetProject } = await inquirer.prompt([
        {
          type: 'list',
          name: 'targetProject',
          message: 'Select target project:',
          choices: targetProjects.map(project => ({
            name: project,
            value: project
          }))
        }
      ]);

      // Validate if it's a Growing project
      const targetProjectPath = path.join(this.componentPromoter.mygrovesPath, targetProject);
      const foundationPath = path.join(targetProjectPath, 'foundation');
      const leafsScssPath = path.join(foundationPath, 'leafs.scss');

      const hasFoundation = await this.componentPromoter.fileExists(foundationPath);
      const hasLeafsScss = await this.componentPromoter.fileExists(leafsScssPath);

      if (!hasFoundation || !hasLeafsScss) {
        console.log(chalk.red(`❌ This is not a valid Growing Project. Missing foundation/leafs.scss`));
        return;
      }

      // Get available leaf categories (JSON files in wood/leafs/)
      const leafCategories = await this.getLeafCategories();

      if (leafCategories.length === 0) {
        console.log(chalk.red('No leaf categories found in wood/leafs/'));
        return;
      }

      // Select leaf category
      const { category } = await inquirer.prompt([
        {
          type: 'list',
          name: 'category',
          message: 'Select leaf category:',
          choices: leafCategories.map(cat => ({
            name: cat,
            value: cat
          }))
        }
      ]);

      // Get leafs from selected category
      const categoryLeafs = await this.getLeafsFromCategory(category);

      if (categoryLeafs.length === 0) {
        console.log(chalk.red(`No leafs found in ${category} category`));
        return;
      }

      // Select leaf
      const { selectedLeaf } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedLeaf',
          message: 'Select leaf to promote:',
          choices: categoryLeafs.map(leaf => ({
            name: leaf.name,
            value: leaf
          }))
        }
      ]);

      // Check if leaf has modifiers
      if (selectedLeaf.modifiers && selectedLeaf.modifiers.length > 0) {
        // Ask if complete or partial promotion
        const { promotionType } = await inquirer.prompt([
          {
            type: 'list',
            name: 'promotionType',
            message: `Leaf "${selectedLeaf.name}" has modifiers. How would you like to promote?`,
            choices: [
              { name: 'Complete (all modifiers)', value: 'complete' },
              { name: 'Partial (select modifiers)', value: 'partial' }
            ]
          }
        ]);

        if (promotionType === 'partial') {
          // Select modifiers
          const { selectedModifiers } = await inquirer.prompt([
            {
              type: 'checkbox',
              name: 'selectedModifiers',
              message: 'Select modifiers to promote:',
              choices: selectedLeaf.modifiers.map(modifier => ({
                name: modifier,
                value: modifier,
                checked: false  // None selected by default
              }))
            }
          ]);

          if (selectedModifiers.length === 0) {
            console.log(chalk.yellow('No modifiers selected. Promotion cancelled.'));
            return;
          }

          // Perform partial promotion
          const result = await this.promoteLeafPartial(targetProject, category, selectedLeaf, selectedModifiers);
          if (result.success) {
            console.log(chalk.green(`\n✅ Successfully promoted ${selectedLeaf.name} with ${selectedModifiers.length} modifiers to ${targetProject}`));
          } else {
            console.log(chalk.red(`\n❌ Failed to promote leaf: ${result.error}`));
          }
          return;
        }
      }

      // Perform complete promotion
      const result = await this.promoteLeafComplete(targetProject, category, selectedLeaf);
      if (result.success) {
        console.log(chalk.green(`\n✅ Successfully promoted ${selectedLeaf.name} (complete) to ${targetProject}`));
      } else {
        console.log(chalk.red(`\n❌ Failed to promote leaf: ${result.error}`));
      }

    } catch (error) {
      console.log(chalk.red(`\nError during leafs promotion: ${error.message}`));
    }

    // Ask if user wants to do something else
    const { continue: shouldContinue } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continue',
        message: 'Would you like to do something else?',
        default: false
      }
    ]);

    if (shouldContinue) {
      await this.start();
    } else {
      console.log(chalk.blue('\nThanks for using Codessa Grow!'));
    }
  }

  async promoteSproutsFlow() {
    console.log(chalk.blue('\nSprouts Promotion Wizard\n'));
    console.log(chalk.gray('Promote SCSS mixins (sprouts) to a project with dependency resolution\n'));

    try {
      // Get available target projects
      const targetProjects = await this.componentPromoter.getTargetProjects();

      if (targetProjects.length === 0) {
        console.log(chalk.red('No projects found in mygroves/ directory'));
        console.log(chalk.yellow('Create a project first using "Create a new project" option'));
        return;
      }

      // Select target project
      const { targetProject } = await inquirer.prompt([
        {
          type: 'list',
          name: 'targetProject',
          message: 'Select target project:',
          choices: targetProjects.map(project => ({
            name: project,
            value: project
          }))
        }
      ]);

      // Validate if it's a Growing project by checking for foundation/ directory
      const targetProjectPath = path.join(this.componentPromoter.mygrovesPath, targetProject);
      const foundationPath = path.join(targetProjectPath, 'foundation');
      const sproutsScssPath = path.join(foundationPath, 'sprouts.scss');

      const hasFoundation = await this.componentPromoter.fileExists(foundationPath);
      const hasSproutsScss = await this.componentPromoter.fileExists(sproutsScssPath);

      if (!hasFoundation || !hasSproutsScss) {
        console.log(chalk.red(`❌ This is not a valid Growing Project. Missing foundation/sprouts.scss`));
        return;
      }

      // Get available sprout categories (JSON files in wood/sprouts/)
      const sproutCategories = await this.getSproutCategories();

      if (sproutCategories.length === 0) {
        console.log(chalk.red('No sprout categories found in wood/sprouts/'));
        return;
      }

      // Select sprout category
      const { category } = await inquirer.prompt([
        {
          type: 'list',
          name: 'category',
          message: 'Select sprout category:',
          choices: sproutCategories.map(cat => ({
            name: cat,
            value: cat
          }))
        }
      ]);

      // Get sprouts from selected category
      const categorySprouts = await this.getSproutsFromCategory(category);

      if (categorySprouts.length === 0) {
        console.log(chalk.red(`No sprouts found in ${category} category`));
        return;
      }

      // Select sprout
      const { selectedSprout } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedSprout',
          message: 'Select sprout to promote:',
          choices: categorySprouts.map(sprout => ({
            name: this.formatSproutChoice(sprout),
            value: sprout,
            short: sprout.name
          }))
        }
      ]);

      // Resolve dependencies
      const allSproutsToPromote = await this.resolveSproutDependencies(category, selectedSprout, categorySprouts);

      // Show summary
      console.log(chalk.blue('\nPromotion Summary:'));
      console.log(`   Main sprout: ${chalk.cyan(selectedSprout.name)}`);
      console.log(`   Dependencies: ${allSproutsToPromote.length - 1}`);
      if (allSproutsToPromote.length > 1) {
        console.log(`   All sprouts: ${allSproutsToPromote.map(s => s.name).join(', ')}`);
      }
      console.log(`   Target: ${chalk.cyan(targetProject)}`);

      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: 'Proceed with promotion?',
          default: true
        }
      ]);

      if (!confirm) {
        console.log(chalk.yellow('Promotion cancelled'));
        return;
      }

      // Perform promotion
      const result = await this.promoteSprouts(allSproutsToPromote, category, targetProject);

      if (result.success) {
        console.log(chalk.green(`\n✅ Successfully promoted ${allSproutsToPromote.length} sprouts to ${targetProject}`));
        console.log(chalk.blue('Sprouts copied:'));
        result.copied.forEach(sprout => console.log(`   ✓ ${sprout}`));
      } else {
        console.log(chalk.red(`\n❌ Failed to promote sprouts: ${result.error}`));
      }

    } catch (error) {
      console.log(chalk.red(`\nError during sprouts promotion: ${error.message}`));
    }

    // Ask if user wants to do something else
    const { continue: shouldContinue } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continue',
        message: 'Would you like to do something else?',
        default: false
      }
    ]);

    if (shouldContinue) {
      await this.start();
    } else {
      console.log(chalk.blue('\nThanks for using Codessa Grow!'));
    }
  }

  async promoteSparksFlow() {
    console.log(chalk.blue('\nSparks Promotion Wizard\n'));
    console.log(chalk.gray('Promote JavaScript components (sparks) to a project\n'));

    try {
      // Get available target projects
      const targetProjects = await this.componentPromoter.getTargetProjects();

      if (targetProjects.length === 0) {
        console.log(chalk.red('No projects found in mygroves/ directory'));
        console.log(chalk.yellow('Create a project first using "Create a new project" option'));
        return;
      }

      // Select target project
      const { targetProject } = await inquirer.prompt([
        {
          type: 'list',
          name: 'targetProject',
          message: 'Select target project:',
          choices: targetProjects.map(project => ({
            name: project,
            value: project
          }))
        }
      ]);

      // Validate if it's a Growing project by checking for sparks/ directory
      const targetProjectPath = path.join(this.componentPromoter.mygrovesPath, targetProject);
      const sparksPath = path.join(targetProjectPath, 'sparks');

      const hasSparks = await this.componentPromoter.fileExists(sparksPath);

      if (!hasSparks) {
        console.log(chalk.red(`❌ This is not a valid Growing Project. Missing sparks/ directory`));
        return;
      }

      // Load sparks registry
      const sparksRegistry = await this.loadSparksRegistry();

      if (!sparksRegistry) {
        console.log(chalk.red('No sparks registry found. Please update sparks components first.'));
        return;
      }

      // Get all available sparks (simple + modules)
      const availableSparks = this.getAvailableSparks(sparksRegistry);

      if (availableSparks.length === 0) {
        console.log(chalk.red('No sparks available to promote'));
        return;
      }

      // Select spark
      const { selectedSpark } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedSpark',
          message: 'Select spark to promote:',
          choices: availableSparks.map(spark => ({
            name: this.formatSparkChoice(spark),
            value: spark,
            short: spark.name
          }))
        }
      ]);

      // Perform promotion
      const result = await this.promoteSpark(selectedSpark, targetProject);

      if (result.success) {
        console.log(chalk.green(`\n✅ Successfully promoted ${selectedSpark.name} to ${targetProject}`));
        console.log(chalk.blue('Files copied:'));
        result.copied.forEach(file => console.log(`   ✓ ${file}`));
      } else {
        console.log(chalk.red(`\n❌ Failed to promote spark: ${result.error}`));
      }

    } catch (error) {
      console.log(chalk.red(`\nError during sparks promotion: ${error.message}`));
    }

    // Ask if user wants to do something else
    const { continue: shouldContinue } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continue',
        message: 'Would you like to do something else?',
        default: false
      }
    ]);

    if (shouldContinue) {
      await this.start();
    } else {
      console.log(chalk.blue('\nThanks for using Codessa Grow!'));
    }
  }

  async updateComponentsFlow() {
    console.log(chalk.blue('\nComponent Update Wizard\n'));
    console.log(chalk.gray('Update component registries by scanning source files\n'));

    try {
      // Choose component type to update
      const { componentType } = await inquirer.prompt([
        {
          type: 'list',
          name: 'componentType',
          message: 'Which component type do you want to update?',
          choices: [
            { name: 'Leafs (CSS classes)', value: 'leafs' },
            { name: 'Sprouts (SCSS mixins)', value: 'sprouts' },
            { name: 'Trunks (layout components)', value: 'trunks' },
            { name: 'Sparks (JavaScript components)', value: 'sparks' }
          ]
        }
      ]);

      const componentUpdater = new ComponentUpdater(this.config);
      let result;

      if (componentType === 'leafs') {
        console.log(chalk.yellow('Currently updating: Leafs components\n'));
        result = await componentUpdater.updateLeafs();
      } else if (componentType === 'sprouts') {
        console.log(chalk.yellow('Currently updating: Sprouts components\n'));
        result = await componentUpdater.updateSprouts();
      } else if (componentType === 'trunks') {
        console.log(chalk.yellow('Currently updating: Trunks components\n'));
        result = await componentUpdater.updateTrunks();
      } else if (componentType === 'sparks') {
        console.log(chalk.yellow('Currently updating: Sparks components\n'));
        result = await componentUpdater.updateSparks();
      }

      if (result.success) {
        console.log(chalk.green('Update completed successfully!'));
        console.log(chalk.blue('Files processed:'));
        result.processed.forEach(file => console.log(`   ✓ ${file}`));

        if (result.created.length > 0) {
          console.log(chalk.blue('JSON files created:'));
          result.created.forEach(file => console.log(`   + ${file}`));
        }

        if (result.updated.length > 0) {
          console.log(chalk.blue('JSON files updated:'));
          result.updated.forEach(file => console.log(`   ~ ${file}`));
        }
      } else {
        console.log(chalk.red('Update failed:'));
        result.errors.forEach(error => console.log(`   ✗ ${error}`));
      }

    } catch (error) {
      console.log(chalk.red(`\nError during update: ${error.message}`));
    }

    // Ask if user wants to do something else
    const { continue: shouldContinue } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continue',
        message: 'Would you like to do something else?',
        default: false
      }
    ]);

    if (shouldContinue) {
      await this.start();
    } else {
      console.log(chalk.blue('\nThanks for using Codessa Grow!'));
    }
  }

  showHelp() {
    console.log(chalk.green('\nCodessa Grow - Help\n'));

    console.log(chalk.blue('Interactive Mode:'));
    console.log('  Just run: node grow/grow.js');
    console.log('  Follow the prompts to create projects\n');

    console.log(chalk.blue('Command Line Mode:'));
    console.log('  node grow/grow.js create <name> --type=<type>');
    console.log('  node grow/grow.js help\n');

    console.log(chalk.blue('Project Types:'));
    console.log('  • vite  - Full web app with Vite + SCSS');
    console.log('  • sass  - SCSS-only library');
    console.log('  • json  - Data-only project\n');

    console.log(chalk.blue('Examples:'));
    console.log('  node grow/grow.js create my-app --type=vite');
    console.log('  node grow/grow.js create styles --type=sass\n');

    // Wait for user input
    setTimeout(() => {
      inquirer.prompt([
        {
          type: 'confirm',
          name: 'back',
          message: 'Back to main menu?',
          default: true
        }
      ]).then(answers => {
        if (answers.back) {
          this.start();
        }
      });
    }, 1000);
  }

  formatComponentType(type) {
    const formats = {
      leafs: 'Leafs (styles)',
      sprouts: 'Sprouts (components)',
      trunks: 'Trunks (layouts)',
      sparks: 'Sparks (scripts)'
    };
    return formats[type] || type;
  }

  /**
   * Get available leaf categories (JSON files in wood/leafs/)
   */
  async getLeafCategories() {
    try {
      const leafsPath = path.join(this.componentPromoter.woodPath, 'leafs');
      const entries = await fs.readdir(leafsPath, { withFileTypes: true });

      return entries
        .filter(entry => entry.isFile() && path.extname(entry.name) === '.json')
        .map(entry => path.basename(entry.name, '.json'))
        .sort();
    } catch (error) {
      console.error(`Error reading leaf categories: ${error.message}`);
      return [];
    }
  }

  /**
   * Get leafs from a specific category JSON file
   */
  async getLeafsFromCategory(category) {
    try {
      const categoryPath = path.join(this.componentPromoter.woodPath, 'leafs', `${category}.json`);
      const content = await fs.readFile(categoryPath, 'utf-8');
      const data = JSON.parse(content);

      return data.leafs || [];
    } catch (error) {
      console.error(`Error reading leafs from ${category}: ${error.message}`);
      return [];
    }
  }

  /**
   * Promote a leaf completely (all modifiers)
   */
  async promoteLeafComplete(targetProject, category, leaf) {
    try {
      // Read the SCSS file for the category
      const scssPath = path.join(this.componentPromoter.woodPath, 'leafs', `${category}.scss`);
      const scssContent = await fs.readFile(scssPath, 'utf-8');

      // Extract the complete leaf code
      const leafCode = this.extractLeafCode(scssContent, leaf.name);
      if (!leafCode) {
        return { success: false, error: `Leaf ${leaf.name} not found in ${category}.scss` };
      }

      // Target file path
      const targetProjectPath = path.join(this.componentPromoter.mygrovesPath, targetProject);
      const targetFilePath = path.join(targetProjectPath, 'foundation', 'leafs.scss');

      // Read current content of target file
      let targetContent = '';
      try {
        targetContent = await fs.readFile(targetFilePath, 'utf-8');
      } catch {
        // File doesn't exist, start with empty content
      }

      // Add the leaf code at the end
      const newContent = targetContent + '\n' + leafCode + '\n';

      // Write back to target file
      await fs.writeFile(targetFilePath, newContent, 'utf-8');

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Promote a leaf partially (selected modifiers only)
   */
  async promoteLeafPartial(targetProject, category, leaf, selectedModifiers) {
    try {
      // Read the SCSS file for the category
      const scssPath = path.join(this.componentPromoter.woodPath, 'leafs', `${category}.scss`);
      const scssContent = await fs.readFile(scssPath, 'utf-8');

      // Extract partial leaf code with only selected modifiers
      const leafCode = this.extractLeafCodePartial(scssContent, leaf.name, selectedModifiers);
      if (!leafCode) {
        return { success: false, error: `Leaf ${leaf.name} or selected modifiers not found in ${category}.scss` };
      }

      // Target file path
      const targetProjectPath = path.join(this.componentPromoter.mygrovesPath, targetProject);
      const targetFilePath = path.join(targetProjectPath, 'foundation', 'leafs.scss');

      // Read current content of target file
      let targetContent = '';
      try {
        targetContent = await fs.readFile(targetFilePath, 'utf-8');
      } catch {
        // File doesn't exist, start with empty content
      }

      // Add the leaf code at the end
      const newContent = targetContent + '\n' + leafCode + '\n';

      // Write back to target file
      await fs.writeFile(targetFilePath, newContent, 'utf-8');

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Extract complete leaf code from SCSS content
   */
  extractLeafCode(scssContent, leafName) {
    const lines = scssContent.split('\n');
    const startPattern = new RegExp(`^\\.${leafName}\\s*\\{`);
    const endPattern = /^}/;

    let startIndex = -1;
    let braceCount = 0;
    let inLeaf = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (startPattern.test(line)) {
        startIndex = i;
        inLeaf = true;
        braceCount = (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
        continue;
      }

      if (inLeaf) {
        braceCount += (line.match(/{/g) || []).length;
        braceCount -= (line.match(/}/g) || []).length;

        if (braceCount <= 0) {
          // Found the end of the leaf
          return lines.slice(startIndex, i + 1).join('\n');
        }
      }
    }

    return null; // Leaf not found
  }

  /**
   * Extract partial leaf code with selected modifiers
   */
  extractLeafCodePartial(scssContent, leafName, selectedModifiers) {
    const lines = scssContent.split('\n');
    const startPattern = new RegExp(`^\\.${leafName}\\s*\\{`);
    const modifierPattern = /&--[\w-]+/;

    let startIndex = -1;
    let braceCount = 0;
    let inLeaf = false;
    let baseIndent = '';
    const resultLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();

      if (startPattern.test(trimmedLine)) {
        startIndex = i;
        inLeaf = true;
        baseIndent = line.substring(0, line.indexOf(`.${leafName}`));
        resultLines.push(line); // Add the base leaf declaration
        braceCount = (trimmedLine.match(/{/g) || []).length - (trimmedLine.match(/}/g) || []).length;
        continue;
      }

      if (inLeaf) {
        braceCount += (trimmedLine.match(/{/g) || []).length;
        braceCount -= (trimmedLine.match(/}/g) || []).length;

        // Check if this line contains a modifier
        const modifierMatch = trimmedLine.match(modifierPattern);
        if (modifierMatch) {
          const modifier = modifierMatch[0];
          if (selectedModifiers.includes(modifier)) {
            resultLines.push(line);
          }
        }

        if (braceCount <= 0) {
          // Found the end of the leaf
          resultLines.push(`${baseIndent}}`);
          break;
        }
      }
    }

    return resultLines.length > 0 ? resultLines.join('\n') : null;
  }

  /**
   * Load sparks registry from wood/sparks/sparks.json
   */
  async loadSparksRegistry() {
    try {
      const registryPath = path.join(this.componentPromoter.woodPath, 'sparks', 'sparks.json');
      const content = await fs.readFile(registryPath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.error(`Error loading sparks registry: ${error.message}`);
      return null;
    }
  }

  /**
   * Get available sprout categories (JSON files in wood/sprouts/)
   */
  async getSproutCategories() {
    try {
      const sproutsPath = path.join(this.componentPromoter.woodPath, 'sprouts');
      const entries = await fs.readdir(sproutsPath, { withFileTypes: true });

      return entries
        .filter(entry => entry.isFile() && path.extname(entry.name) === '.json' && !entry.name.includes('.meta'))
        .map(entry => path.basename(entry.name, '.json'))
        .sort();
    } catch (error) {
      console.error(`Error reading sprout categories: ${error.message}`);
      return [];
    }
  }

  /**
   * Get sprouts from a specific category JSON file
   */
  async getSproutsFromCategory(category) {
    try {
      const categoryPath = path.join(this.componentPromoter.woodPath, 'sprouts', `${category}.json`);
      const content = await fs.readFile(categoryPath, 'utf-8');
      const data = JSON.parse(content);

      return data.sprouts || [];
    } catch (error) {
      console.error(`Error reading sprouts from ${category}: ${error.message}`);
      return [];
    }
  }

  /**
   * Resolve dependencies for a sprout recursively
   */
  async resolveSproutDependencies(category, selectedSprout, allSprouts) {
    const resolved = new Set();
    const toProcess = [selectedSprout.name];

    // Create a map for quick lookup
    const sproutMap = new Map();
    allSprouts.forEach(sprout => {
      sproutMap.set(sprout.name, sprout);
    });

    while (toProcess.length > 0) {
      const currentName = toProcess.shift();

      if (resolved.has(currentName)) {
        continue;
      }

      const currentSprout = sproutMap.get(currentName);
      if (!currentSprout) {
        console.warn(`Warning: Sprout ${currentName} not found in category ${category}`);
        continue;
      }

      resolved.add(currentName);

      // Add dependencies to processing queue
      if (currentSprout.dependencies && currentSprout.dependencies.length > 0) {
        // Check if dependencies are from the same category or other categories
        for (const depName of currentSprout.dependencies) {
          if (!resolved.has(depName)) {
            toProcess.push(depName);
          }
        }
      }
    }

    // Return sprouts in dependency order (dependencies first)
    return Array.from(resolved).map(name => sproutMap.get(name)).filter(Boolean);
  }

  /**
   * Promote sprouts to target project
   */
  async promoteSprouts(sprouts, category, targetProject) {
    try {
      const results = {
        success: true,
        copied: [],
        errors: []
      };

      // Read the SCSS file for the category
      const scssPath = path.join(this.componentPromoter.woodPath, 'sprouts', `${category}.scss`);
      const scssContent = await fs.readFile(scssPath, 'utf-8');

      // Target file path
      const targetProjectPath = path.join(this.componentPromoter.mygrovesPath, targetProject);
      const targetFilePath = path.join(targetProjectPath, 'foundation', 'sprouts.scss');

      // Read current content of target file
      let targetContent = '';
      try {
        targetContent = await fs.readFile(targetFilePath, 'utf-8');
      } catch {
        // File doesn't exist, start with empty content
      }

      // Get all mixin names that should be in the file
      const allMixinNames = this.extractMixinNamesFromContent(targetContent);
      const newMixinNames = sprouts.map(s => s.name);

      // Combine and deduplicate
      const combinedMixinNames = [...new Set([...allMixinNames, ...newMixinNames])];

      // Get metadata for all mixins (from current sprouts and existing ones)
      const allMetadata = [...sprouts];
      for (const name of allMixinNames) {
        if (!allMetadata.find(m => m.name === name)) {
          // Try to find metadata from the same category
          try {
            const categoryPath = path.join(this.componentPromoter.woodPath, 'sprouts', `${category}.json`);
            const categoryContent = await fs.readFile(categoryPath, 'utf-8');
            const categoryData = JSON.parse(categoryContent);
            const metadata = categoryData.sprouts.find(s => s.name === name);
            if (metadata) {
              allMetadata.push(metadata);
            }
          } catch (error) {
            // Ignore errors, mixin will be added without metadata
          }
        }
      }

      // Extract all mixin codes
      const allMixinCodes = [];
      for (const name of combinedMixinNames) {
        let code = null;

        // Try to extract from current target content first
        if (targetContent.includes(`@mixin ${name}`)) {
          code = this.extractSproutCode(targetContent, name);
        }

        // If not found, extract from source
        if (!code) {
          code = this.extractSproutCode(scssContent, name);
        }

        if (code) {
          allMixinCodes.push({ name, code });
        } else {
          results.errors.push(`Failed to extract ${name}`);
        }
      }

      // Sort by dependency order
      const sortedMixinCodes = this.sortSproutsByDependencies(allMixinCodes, allMetadata);

      // Generate new content
      let newContent = '';
      for (const mixin of sortedMixinCodes) {
        newContent += '\n' + mixin.code + '\n';
      }

      // Track what was actually added
      for (const name of newMixinNames) {
        if (!allMixinNames.includes(name)) {
          results.copied.push(name);
        }
      }

      // Ensure target directory exists
      await fs.mkdir(path.dirname(targetFilePath), { recursive: true });

      // Write back to target file
      await fs.writeFile(targetFilePath, newContent, 'utf-8');

      return results;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Extract sprout code from SCSS content
   */
  extractSproutCode(scssContent, sproutName) {
    const lines = scssContent.split('\n');
    const startPattern = new RegExp(`^@mixin ${sproutName}\\s*(\\(|\\{)`);

    let startIndex = -1;
    let braceCount = 0;
    let inSprout = false;
    let foundOpening = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (startPattern.test(line)) {
        startIndex = i;
        inSprout = true;
        braceCount = (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
        if (braceCount > 0) foundOpening = true;
        continue;
      }

      if (inSprout) {
        braceCount += (line.match(/{/g) || []).length;
        braceCount -= (line.match(/}/g) || []).length;
        if (braceCount > 0) foundOpening = true;

        if (braceCount <= 0 && foundOpening) {
          // Found the end of the sprout
          return lines.slice(startIndex, i + 1).join('\n');
        }
      }
    }

    return null; // Sprout not found
  }

  /**
   * Load sparks registry from wood/sparks/sparks.json
   */
  async loadSparksRegistry() {
    try {
      const registryPath = path.join(this.componentPromoter.woodPath, 'sparks', 'sparks.json');
      const content = await fs.readFile(registryPath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.error(`Error loading sparks registry: ${error.message}`);
      return null;
    }
  }
  getAvailableSparks(registry) {
    const sparks = [];

    // Add simple sparks
    if (registry.sparks.simple) {
      registry.sparks.simple.forEach(spark => {
        sparks.push({
          ...spark,
          type: 'simple',
          displayName: `${spark.name} (simple)`
        });
      });
    }

    // Add module sparks
    if (registry.sparks.modules) {
      registry.sparks.modules.forEach(spark => {
        sparks.push({
          ...spark,
          type: 'module',
          displayName: `${spark.name} (module)`
        });
      });
    }

    return sparks;
  }

  /**
   * Promote a spark to target project
   */
  async promoteSpark(spark, targetProject) {
    try {
      const results = {
        success: true,
        copied: [],
        errors: []
      };

      const targetProjectPath = path.join(this.componentPromoter.mygrovesPath, targetProject);
      const sparksTargetPath = path.join(targetProjectPath, 'sparks');

      if (spark.type === 'simple') {
        // Copy single file
        const sourcePath = path.join(this.componentPromoter.woodPath, 'sparks', spark.file);
        const targetPath = path.join(sparksTargetPath, spark.file);

        await fs.mkdir(sparksTargetPath, { recursive: true });
        await fs.copyFile(sourcePath, targetPath);
        results.copied.push(spark.file);

      } else if (spark.type === 'module') {
        // Copy entire directory
        const sourcePath = path.join(this.componentPromoter.woodPath, 'sparks', spark.path);
        const targetPath = path.join(sparksTargetPath, spark.name);

        await this.componentPromoter.copyDirectory(sourcePath, targetPath);
        results.copied.push(...spark.files.map(file => `${spark.name}/${file}`));
      }

      return results;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Format spark choice for better display in menu
   */
  formatSparkChoice(spark) {
    const typeIcon = spark.type === 'simple' ? '📄' : '📁';
    const typeLabel = spark.type === 'simple' ? 'Simple' : 'Module';

    // Truncate description if too long
    const maxDescLength = 60;
    const description = spark.description.length > maxDescLength
      ? spark.description.substring(0, maxDescLength) + '...'
      : spark.description;

    return `${typeIcon} ${chalk.cyan(spark.name)} ${chalk.gray(`(${typeLabel})`)}\n   ${chalk.white(description)}`;
  }

  /**
   * Format sprout choice for better display in menu
   */
  formatSproutChoice(sprout) {
    // Determine type based on dependencies
    const hasDeps = sprout.dependencies && sprout.dependencies.length > 0;
    const typeIcon = hasDeps ? '🔗' : '📦';
    const typeLabel = hasDeps ? 'Composite' : 'Base';

    // Truncate description if too long
    const maxDescLength = 60;
    const description = sprout.description.length > maxDescLength
      ? sprout.description.substring(0, maxDescLength) + '...'
      : sprout.description;

    return `${typeIcon} ${chalk.cyan(sprout.name)} ${chalk.gray(`(${typeLabel})`)}\n   ${chalk.white(description)}`;
  }

  /**
   * Parse existing mixins from target file content
   */
  parseExistingMixins(content) {
    const mixins = [];
    const lines = content.split('\n');
    let currentMixin = null;
    let braceCount = 0;
    let startIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith('@mixin ')) {
        // Extract mixin name
        const match = line.match(/^@mixin\s+([^\s(]+)/);
        if (match) {
          currentMixin = { name: match[1], code: '', metadata: null };
          startIndex = i;
          braceCount = (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
        }
      }

      if (currentMixin) {
        braceCount += (line.match(/{/g) || []).length;
        braceCount -= (line.match(/}/g) || []).length;

        if (braceCount <= 0 && startIndex !== -1) {
          // Found the end of the mixin
          currentMixin.code = lines.slice(startIndex, i + 1).join('\n');
          mixins.push(currentMixin);
          currentMixin = null;
          startIndex = -1;
          braceCount = 0;
        }
      }
    }

    return mixins;
  }

  /**
   * Remove duplicate mixins by name
   */
  removeDuplicateMixins(mixins) {
    const seen = new Set();
    const unique = [];

    for (const mixin of mixins) {
      if (!seen.has(mixin.name)) {
        seen.add(mixin.name);
        unique.push(mixin);
      }
    }

    return unique;
  }

  /**
   * Extract mixin names from SCSS content
   */
  extractMixinNamesFromContent(content) {
    const names = [];
    const lines = content.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('@mixin ')) {
        const match = trimmed.match(/^@mixin\s+([^\s(]+)/);
        if (match) {
          names.push(match[1]);
        }
      }
    }

    return names;
  }

  /**
   * Sort sprouts by dependency order (dependencies first)
   */
  sortSproutsByDependencies(sproutCodes, sproutMetadata) {
    // Create a map for quick lookup of metadata
    const metadataMap = new Map();
    sproutMetadata.forEach(sprout => {
      metadataMap.set(sprout.name, sprout);
    });

    // Create a map for sprout codes
    const codeMap = new Map();
    sproutCodes.forEach(sprout => {
      codeMap.set(sprout.name, sprout);
    });

    const visited = new Set();
    const visiting = new Set();
    const ordered = [];

    function visit(name) {
      if (visited.has(name)) return;
      if (visiting.has(name)) {
        // Circular dependency detected, but we'll continue
        console.warn(`Warning: Circular dependency detected involving ${name}`);
        return;
      }

      visiting.add(name);

      const metadata = metadataMap.get(name);
      if (metadata && metadata.dependencies) {
        for (const dep of metadata.dependencies) {
          if (codeMap.has(dep)) { // Only visit dependencies that are being promoted
            visit(dep);
          }
        }
      }

      visiting.delete(name);
      visited.add(name);
      ordered.push(codeMap.get(name));
    }

    // Visit all sprouts
    for (const sprout of sproutCodes) {
      if (!visited.has(sprout.name)) {
        visit(sprout.name);
      }
    }

    return ordered;
  }

  async promoteTrunksFlow() {
    console.log(chalk.blue('\nTrunks Promotion Wizard\n'));
    console.log(chalk.gray('Promote SCSS layout components (trunks) to a project with automatic sprout dependency resolution\n'));

    try {
      // Get available target projects
      const targetProjects = await this.componentPromoter.getTargetProjects();

      if (targetProjects.length === 0) {
        console.log(chalk.red('No projects found in mygroves/ directory'));
        console.log(chalk.yellow('Create a project first using "Create a new project" option'));
        return;
      }

      // Select target project
      const { targetProject } = await inquirer.prompt([
        {
          type: 'list',
          name: 'targetProject',
          message: 'Select target project:',
          choices: targetProjects.map(project => ({
            name: project,
            value: project
          }))
        }
      ]);

      // Validate if it's a Growing project by checking for growth/ directory
      const targetProjectPath = path.join(this.componentPromoter.mygrovesPath, targetProject);
      const growthPath = path.join(targetProjectPath, 'growth');

      const hasGrowth = await this.componentPromoter.fileExists(growthPath);

      if (!hasGrowth) {
        console.log(chalk.red(`❌ This is not a valid Growing Project. Missing growth/ directory`));
        return;
      }

      // Get available trunk categories (JSON files in wood/trunks/)
      const trunkCategories = await this.getTrunkCategories();

      if (trunkCategories.length === 0) {
        console.log(chalk.red('No trunk categories found in wood/trunks/'));
        return;
      }

      // Select trunk category
      const { category } = await inquirer.prompt([
        {
          type: 'list',
          name: 'category',
          message: 'Select trunk category:',
          choices: trunkCategories.map(cat => ({
            name: cat,
            value: cat
          }))
        }
      ]);

      // Get trunks from selected category
      const categoryTrunks = await this.getTrunksFromCategory(category);

      if (categoryTrunks.length === 0) {
        console.log(chalk.red(`No trunks found in ${category} category`));
        return;
      }

      // Select trunk
      const { selectedTrunk } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedTrunk',
          message: 'Select trunk to promote:',
          choices: categoryTrunks.map(trunk => ({
            name: this.formatTrunkChoice(trunk),
            value: trunk,
            short: trunk.name
          }))
        }
      ]);

      // Resolve dependencies (sprouts that this trunk depends on)
      const allSproutsToPromote = await this.resolveTrunkDependencies(selectedTrunk);

      // Show summary
      console.log(chalk.blue('\nPromotion Summary:'));
      console.log(`   Main trunk: ${chalk.cyan(selectedTrunk.name)}`);
      console.log(`   Sprout dependencies: ${allSproutsToPromote.length}`);
      if (allSproutsToPromote.length > 0) {
        console.log(`   Sprouts: ${allSproutsToPromote.map(s => s.name).join(', ')}`);
      }
      console.log(`   Target: ${chalk.cyan(targetProject)}`);
      console.log(`   Target file: growth/${category}.scss`);

      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: 'Proceed with promotion?',
          default: true
        }
      ]);

      if (!confirm) {
        console.log(chalk.yellow('Promotion cancelled'));
        return;
      }

      // First promote all required sprouts
      if (allSproutsToPromote.length > 0) {
        console.log(chalk.blue('\nPromoting sprout dependencies...'));
        const sproutResult = await this.promoteSproutsForTrunk(allSproutsToPromote, targetProject);
        if (!sproutResult.success) {
          console.log(chalk.red(`❌ Failed to promote sprout dependencies: ${sproutResult.error}`));
          return;
        }
        console.log(chalk.green(`✅ Promoted ${sproutResult.copied.length} sprouts`));
      }

      // Then promote the trunk
      const trunkResult = await this.promoteTrunk(selectedTrunk, category, targetProject);

      if (trunkResult.success) {
        console.log(chalk.green(`\n✅ Successfully promoted ${selectedTrunk.name} trunk to ${targetProject}`));
        console.log(chalk.blue('Files modified:'));
        trunkResult.copied.forEach(file => console.log(`   ✓ ${file}`));
      } else {
        console.log(chalk.red(`\n❌ Failed to promote trunk: ${trunkResult.error}`));
      }

    } catch (error) {
      console.log(chalk.red(`\nError during trunks promotion: ${error.message}`));
    }

    // Ask if user wants to do something else
    const { continue: shouldContinue } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continue',
        message: 'Would you like to do something else?',
        default: false
      }
    ]);

    if (shouldContinue) {
      await this.start();
    } else {
      console.log(chalk.blue('\nThanks for using Codessa Grow!'));
    }
  }

  /**
   * Get available trunk categories (JSON files in wood/trunks/)
   */
  async getTrunkCategories() {
    try {
      const trunksPath = path.join(this.componentPromoter.woodPath, 'trunks');
      const entries = await fs.readdir(trunksPath, { withFileTypes: true });

      return entries
        .filter(entry => entry.isFile() && path.extname(entry.name) === '.json' && !entry.name.includes('.meta'))
        .map(entry => path.basename(entry.name, '.json'))
        .sort();
    } catch (error) {
      console.error(`Error reading trunk categories: ${error.message}`);
      return [];
    }
  }

  /**
   * Get trunks from a specific category JSON file
   */
  async getTrunksFromCategory(category) {
    try {
      const categoryPath = path.join(this.componentPromoter.woodPath, 'trunks', `${category}.json`);
      const content = await fs.readFile(categoryPath, 'utf-8');
      const data = JSON.parse(content);

      return data.trunks || [];
    } catch (error) {
      console.error(`Error reading trunks from ${category}: ${error.message}`);
      return [];
    }
  }

  /**
   * Resolve dependencies for a trunk (returns all required sprouts)
   */
  async resolveTrunkDependencies(selectedTrunk) {
    const allSprouts = new Set();

    // Add direct sprout dependencies
    if (selectedTrunk.sprouts && selectedTrunk.sprouts.length > 0) {
      for (const sproutName of selectedTrunk.sprouts) {
        // Find the sprout in all categories
        const sproutCategories = await this.getSproutCategories();
        for (const category of sproutCategories) {
          const categorySprouts = await this.getSproutsFromCategory(category);
          const sprout = categorySprouts.find(s => s.name === sproutName);
          if (sprout) {
            // Resolve dependencies recursively for this sprout
            const resolvedSprouts = await this.resolveSproutDependencies(category, sprout, categorySprouts);
            resolvedSprouts.forEach(s => allSprouts.add(JSON.stringify(s)));
            break;
          }
        }
      }
    }

    // Convert back to objects and remove duplicates
    const uniqueSprouts = Array.from(allSprouts).map(s => JSON.parse(s));
    const seen = new Set();
    return uniqueSprouts.filter(sprout => {
      if (seen.has(sprout.name)) return false;
      seen.add(sprout.name);
      return true;
    });
  }

  /**
   * Promote sprouts required by a trunk
   */
  async promoteSproutsForTrunk(sprouts, targetProject) {
    try {
      const results = {
        success: true,
        copied: [],
        errors: []
      };

      // Group sprouts by category
      const sproutsByCategory = new Map();
      for (const sprout of sprouts) {
        // Find which category this sprout belongs to
        const categories = await this.getSproutCategories();
        for (const category of categories) {
          const categorySprouts = await this.getSproutsFromCategory(category);
          if (categorySprouts.find(s => s.name === sprout.name)) {
            if (!sproutsByCategory.has(category)) {
              sproutsByCategory.set(category, []);
            }
            sproutsByCategory.get(category).push(sprout);
            break;
          }
        }
      }

      // Promote sprouts for each category
      for (const [category, categorySprouts] of sproutsByCategory) {
        const categoryResult = await this.promoteSprouts(categorySprouts, category, targetProject);
        if (!categoryResult.success) {
          results.success = false;
          results.errors.push(...categoryResult.errors);
        } else {
          results.copied.push(...categoryResult.copied);
        }
      }

      return results;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Promote a trunk to target project
   */
  async promoteTrunk(trunk, category, targetProject) {
    try {
      const results = {
        success: true,
        copied: [],
        errors: []
      };

      // Read the SCSS file for the category
      const scssPath = path.join(this.componentPromoter.woodPath, 'trunks', `${category}.scss`);
      const scssContent = await fs.readFile(scssPath, 'utf-8');

      // Extract the trunk code
      const trunkCode = this.extractTrunkCode(scssContent, trunk.name);
      if (!trunkCode) {
        return { success: false, error: `Trunk ${trunk.name} not found in ${category}.scss` };
      }

      // Target file path (growth/{category}.scss)
      const targetProjectPath = path.join(this.componentPromoter.mygrovesPath, targetProject);
      const targetFilePath = path.join(targetProjectPath, 'growth', `${category}.scss`);

      // Read current content of target file
      let targetContent = '';
      try {
        targetContent = await fs.readFile(targetFilePath, 'utf-8');
      } catch {
        // File doesn't exist, start with empty content
      }

      // Check if trunk is already in the file
      const trunkClassName = `.${trunk.name}`;
      if (targetContent.includes(trunkClassName)) {
        results.errors.push(`Trunk ${trunk.name} already exists in ${category}.scss`);
        return results;
      }

      // Add the trunk code at the end
      const newContent = targetContent + '\n' + trunkCode + '\n';

      // Ensure target directory exists
      await fs.mkdir(path.dirname(targetFilePath), { recursive: true });

      // Write back to target file
      await fs.writeFile(targetFilePath, newContent, 'utf-8');

      results.copied.push(`growth/${category}.scss`);

      return results;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Extract trunk code from SCSS content
   */
  extractTrunkCode(scssContent, trunkName) {
    const lines = scssContent.split('\n');
    const startPattern = new RegExp(`^\\.${trunkName}\\s*\\{`);

    let startIndex = -1;
    let braceCount = 0;
    let inTrunk = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (startPattern.test(line)) {
        startIndex = i;
        inTrunk = true;
        braceCount = (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
        continue;
      }

      if (inTrunk) {
        braceCount += (line.match(/{/g) || []).length;
        braceCount -= (line.match(/}/g) || []).length;

        if (braceCount <= 0) {
          // Found the end of the trunk
          return lines.slice(startIndex, i + 1).join('\n');
        }
      }
    }

    return null; // Trunk not found
  }

  /**
   * Format trunk choice for better display in menu
   */
  formatTrunkChoice(trunk) {
    // Determine type based on sprout dependencies
    const hasSprouts = trunk.sprouts && trunk.sprouts.length > 0;
    const typeIcon = hasSprouts ? '🌳' : '🌿';
    const typeLabel = hasSprouts ? 'Composite' : 'Simple';

    // Truncate description if too long
    const maxDescLength = 60;
    const description = trunk.description.length > maxDescLength
      ? trunk.description.substring(0, maxDescLength) + '...'
      : trunk.description;

    return `${typeIcon} ${chalk.cyan(trunk.name)} ${chalk.gray(`(${typeLabel})`)}\n   ${chalk.white(description)}`;
  }
}