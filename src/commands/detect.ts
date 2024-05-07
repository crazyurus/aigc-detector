import { Args, Flags } from '@oclif/core';
import chalk from 'chalk';
import ora from 'ora';

import { AIGC } from '../core';
import BaseCommand from '../extends/command';
import { type Platform } from '../platform';

class DetectCommand extends BaseCommand {
  static args = {
    content: Args.string({
      description: 'Detected content'
    })
  };

  static description = 'Detect content and generate results';

  static examples = [];

  static flags = {
    content: Flags.string({
      char: 'c',
      description: DetectCommand.args.content.description
    }),
    file: Flags.file({
      char: 'f',
      description: 'Detected file, currently only text files are supported'
    }),
    url: Flags.url({
      char: 'u',
      description: 'Detected content from remote url'
    })
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(DetectCommand);
    const spinner = ora('Detecting').start();

    if (args.content) {
      flags.content = args.content;
    }

    if (flags.file) {
      flags.content = await this.fileManager.readFile(flags.file);
    }

    if (flags.url) {
      flags.content = await this.networkManager.httpRequest(flags.url);
    }

    if (Object.keys(flags).length > 0) {
      const config = await this.configManager.getAll();

      if (Object.keys(config).length > 0) {
        const detector = new AIGC({
          apiKey: config.apiKey,
          platform: config.platform as unknown as Platform
        });
        const { probability, reason } = await detector.detect(flags.content!);
        const percent = probability * 100;
        const percentText = percent + '%';

        if (percent > 50) {
          spinner.fail('This is AI generated content');
        } else {
          spinner.succeed('This is NOT AI generated content');
        }

        this.list('Probability', percent > 50 ? chalk.red(percentText) : chalk.green(percentText));
        this.list('Reason', reason);
      } else {
        spinner.fail('Please complete the configuration first');
        this.log('Run ' + chalk.yellow(this.config.bin + ' config') + ' to complete the configuration');
      }
    } else {
      spinner.stop();
      this.showHelp();
    }
  }
}

export default DetectCommand;
