import { Command, loadHelpClass, type Config } from '@oclif/core';
import chalk from 'chalk';

import ConfigManager from '../manager/config.js';
import FileManager from '../manager/file.js';

abstract class BaseCommand extends Command {
  protected configManager: ConfigManager;

  protected fileManager: FileManager;

  constructor(argv: string[], config: Config) {
    super(argv, config);

    this.configManager = new ConfigManager(this.config.configDir);
    this.fileManager = new FileManager();
  }

  protected list(label: string, content: string): void {
    this.log(chalk.cyan(label) + ': ' + content);
  }

  protected async showHelp(): Promise<void> {
    const Help = await loadHelpClass(this.config);
    const help = new Help(this.config);

    await help.showHelp(this.argv);
  }

  protected success(text: string): void {
    const bang = chalk.green('✓');

    this.log(bang + ' ' + text);
  }
}

export default BaseCommand;
