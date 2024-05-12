import { AIMessage, HumanMessage } from '@langchain/core/messages';
import chalk from 'chalk';
import { ChatMessageHistory } from 'langchain/stores/message/in_memory';
import readline from 'node:readline';

import type { Platform } from '../../platform';

import { AIGC } from '../../core';
import BaseCommand from '../extends/command';

enum PromptRole {
  AI = 'ai',
  USER = 'user'
}

const promptMessageMap = {
  [PromptRole.AI]: AIMessage,
  [PromptRole.USER]: HumanMessage
};
const promptRoleDisplayMap = {
  [PromptRole.AI]: {
    color: 'yellow',
    name: 'AI'
  },
  [PromptRole.USER]: {
    color: 'green',
    name: 'You'
  }
} as const;

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class ChatCommand extends BaseCommand {
  static args = {};

  static description = 'Chat with the LLM';

  static examples = [];

  static flags = {};

  private messages = new ChatMessageHistory();

  async run(): Promise<void> {
    const config = await this.configManager.getAll();

    if (Object.keys(config).length > 0) {
      const detector = new AIGC({
        apiKey: config.apiKey,
        platform: config.platform as unknown as Platform
      });
      const aiDisplay = this.getDisplayContent(PromptRole.AI);
      let lastMessage = 'How can I help you today?';

      process.stdout.write(aiDisplay + lastMessage + '\n');

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const userMessage = await this.getUserMessage();
        const stream = detector.chat(userMessage, await this.messages.getMessages());

        process.stdout.write(aiDisplay);
        stream.pipe(process.stdout);

        lastMessage = await stream.getData();

        process.stdout.write('\n');

        await this.addMessage(PromptRole.USER, userMessage);
        await this.addMessage(PromptRole.AI, lastMessage);
      }
    } else {
      this.showHelp();
    }
  }

  private async addMessage(role: PromptRole, content: string): Promise<string> {
    const Message = promptMessageMap[role];

    await this.messages.addMessage(new Message(content));

    return this.getDisplayContent(role) + content;
  }

  private getDisplayContent(role: PromptRole): string {
    const roleDisplay = promptRoleDisplayMap[role];

    return chalk[roleDisplay.color](`[${roleDisplay.name}] `);
  }

  private getUserMessage(): Promise<string> {
    const userDisplay = this.getDisplayContent(PromptRole.USER);

    return new Promise<string>((resolve) => {
      reader.question(userDisplay, resolve);
    });
  }
}

export default ChatCommand;
