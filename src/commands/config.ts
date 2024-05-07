import { Flags } from '@oclif/core';
import inquirer from 'inquirer';

import { maskKey } from '../core/utils';
import BaseCommand from '../extends/command';
import { getAvailablePlatforms, getPlatform, type Platform } from '../platform';

class ConfigCommand extends BaseCommand {
  static args = {};

  static description = 'Configure parameters of the LLM platform';

  static examples = [];

  static flags = {
    apiKey: Flags.string({
      char: 'k',
      description: 'Using API key for LLM',
      helpLabel: '-k, --api-key'
    }),
    platform: Flags.string({
      char: 'p',
      description: 'Platform that provides LLM',
      multiple: false,
      options: getAvailablePlatforms()
    })
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(ConfigCommand);
    const hasFlag = Object.keys(flags).length > 0;

    if (hasFlag) {
      if (flags.platform) {
        await this.configManager.setItem('platform', flags.platform);
      }

      if (flags.apiKey) {
        await this.configManager.setItem('apiKey', flags.apiKey);
      }

      this.success('Configuration successful');
    } else {
      const config = await this.configManager.getAll();

      if (Object.keys(config).length > 0) {
        if (config.platform) {
          const platform = getPlatform(config.platform as unknown as Platform);

          this.list('Platform', platform.name);
        }

        if (config.apiKey) {
          this.list('API Key', maskKey(config.apiKey));
        }
      } else {
        const answer = await inquirer.prompt([
          {
            choices: getAvailablePlatforms().map((platform) => ({
              name: getPlatform(platform as unknown as Platform).name,
              value: platform
            })),
            message: ConfigCommand.flags.platform.description,
            name: 'platform',
            type: 'list'
          },
          {
            message: ConfigCommand.flags.apiKey.description,
            name: 'apiKey',
            type: 'input',
            validate(input: string): boolean {
              return Boolean(input.trim());
            }
          }
        ]);

        await this.configManager.setItem('platform', answer.platform);
        await this.configManager.setItem('apiKey', answer.apiKey);

        this.success('Configuration successful');
      }
    }
  }
}

export default ConfigCommand;
