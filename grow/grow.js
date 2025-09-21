#!/usr/bin/env node

/**
 * Codessa Grow - Project & Component Manager
 * The unified tool for Codessa Growing ecosystem
 */

import { Command } from 'commander';
import { ProjectCreator } from './core/project-creator.js';
import { InteractiveCLI } from './utils/interactive-cli.js';
import { ConfigManager } from './core/config-manager.js';
import ora from 'ora';
import chalk from 'chalk';
import inquirer from 'inquirer';

const program = new Command();

// Initialize core systems
const config = new ConfigManager();
const projectCreator = new ProjectCreator(config);
const interactiveCLI = new InteractiveCLI(config);

// CLI Setup
program
  .name('grow')
  .description('Codessa Grow - Project & Component Manager')
  .version('1.0.0');

// Create command
program
  .command('create <projectName>')
  .description('Create a new project')
  .option('-t, --type <type>', 'Project type (sass, vite, json)', 'vite')
  .option('-f, --force', 'Overwrite existing project')
  .option('-v, --verbose', 'Verbose output')
  .action(async (projectName, options) => {
    const spinner = ora('Creating project...').start();

    try {
      const result = await projectCreator.create(projectName, options);

      if (result.success) {
        spinner.succeed(chalk.green(`Project ${projectName} created successfully!`));
        console.log(chalk.blue(`Location: ${result.path}`));
        console.log(chalk.yellow(`Next steps:`));
        console.log(`   cd ${projectName}`);
        console.log(`   npm install  # if applicable`);
        console.log(`   npm run dev  # if applicable`);
      } else {
        spinner.fail(chalk.red(`Failed to create project: ${result.error}`));
        process.exit(1);
      }
    } catch (error) {
      spinner.fail(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// Help command
program
  .command('help')
  .description('Show help information')
  .action(() => {
    interactiveCLI.showHelp();
  });

// Error handling
program.on('command:*', (unknownCommand) => {
  console.error(chalk.red(`Unknown command: ${unknownCommand[0]}`));
  console.log(chalk.yellow('Run "grow help" for available commands'));
  process.exit(1);
});

// Parse arguments
const args = process.argv.slice(2);

// If no arguments provided, check if we're in interactive mode
if (args.length === 0) {
  if (process.stdin.isTTY) {
    // Interactive terminal - show menu
    console.log(chalk.green('Codessa Grow - Interactive Mode'));
    console.log(chalk.gray('Let\'s create something amazing together!\n'));

    inquirer.prompt([
      {
        type: 'list',
        name: 'mode',
        message: 'How would you like to proceed?',
        choices: [
          { name: 'Interactive Mode (recommended)', value: 'interactive' },
          { name: 'Show help', value: 'help' },
          { name: 'Exit', value: 'exit' }
        ]
      }
    ]).then(answers => {
      switch (answers.mode) {
        case 'interactive':
          interactiveCLI.start().catch(error => {
            console.error('Error:', error.message);
            process.exit(1);
          });
          break;
        case 'help':
          interactiveCLI.showHelp();
          break;
        case 'exit':
          console.log(chalk.blue('Goodbye!'));
          process.exit(0);
      }
    }).catch(error => {
      console.log(chalk.blue('Goodbye!'));
      process.exit(0);
    });
  } else {
    // Non-interactive (piped input) - show help
    console.log(chalk.yellow('No arguments provided. Use "grow help" for usage information.'));
    process.exit(1);
  }
} else {
  program.parse();
}