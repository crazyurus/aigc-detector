import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { Args, Flags } from '@oclif/core';
import chalk from 'chalk';
import ora from 'ora';

import { PROMPT } from '../const';
import BaseCommand from '../extends/command';
import { getPlatform, type Platform } from '../platform';
import { getDetectResult } from '../utils';

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
        const platform = getPlatform(config.platform as unknown as Platform);
        const chatModel = new ChatOpenAI({
          apiKey: config.apiKey,
          configuration: {
            baseURL: platform.baseURL
          },
          model: platform.model,
          temperature: 0.7
        });
        const prompt = ChatPromptTemplate.fromMessages([
          ['system', PROMPT],
          ['user', 'Here is what needs to be evaluated: {input}']
        ]);
        const chain = prompt.pipe(chatModel);
        const { content: result } = await chain.invoke({
          input: flags.content
        });
        const { probability, reason } = getDetectResult(result.toString());
        const percent = Number.parseInt(probability, 10);

        if (percent > 50) {
          spinner.fail('This is AI generated content');
        } else {
          spinner.succeed('This is NOT AI generated content');
        }

        this.list('Probability', percent > 50 ? chalk.red(probability) : chalk.green(probability));
        this.list('Reason', reason);
      } else {
        this.warn('Please complete the configuration first');
        this.log('Run ' + chalk.yellow(this.id + ' config --help') + ' to view details');
      }
    } else {
      this.showHelp();
    }
  }
}

export default DetectCommand;
