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

  private lastMessage = 'How can I help you today?';

  private messages = new ChatMessageHistory();

  async run(): Promise<void> {
    const config = await this.configManager.getAll();

    if (Object.keys(config).length > 0) {
      const detector = new AIGC({
        apiKey: config.apiKey,
        platform: config.platform as unknown as Platform
      });
      const userDisplay = this.getDisplayContent(PromptRole.USER);

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const aiMessage = await this.addMessage(PromptRole.AI, this.lastMessage);
        const userMessage = await this.getUserMessage(aiMessage + `\n${userDisplay}`);
        const answer = await detector.chat(userMessage, await this.messages.getMessages());

        await this.addMessage(PromptRole.USER, userMessage);
        this.lastMessage = answer;
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

  private getUserMessage(aiMessage: string): Promise<string> {
    return new Promise<string>((resolve) => {
      reader.question(aiMessage, resolve);
    });
  }
}

export default ChatCommand;
