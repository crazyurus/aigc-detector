import { Args, Command, Flags } from '@oclif/core';

class DetectCommand extends Command {
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

    this.log(JSON.stringify(args));
    this.log(JSON.stringify(flags));
  }
}

export default DetectCommand;
