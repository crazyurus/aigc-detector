import { Command, Flags } from '@oclif/core';

class ConfigCommand extends Command {
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
      options: ['openai', 'moonshot']
    })
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(ConfigCommand);

    this.log(JSON.stringify(flags));
  }
}

export default ConfigCommand;
