import type { BaseMessage } from '@langchain/core/messages';

import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder
} from '@langchain/core/prompts';

import type Stream from './stream';

import { PROMPT } from '../const';
import { getPlatform, type Platform } from '../platform';
import { getEnvConfig } from './env';
import { getDetectResult } from './utils';

interface Options {
  apiKey: string;
  platform: Platform;
}

export class AIGC {
  private apiKey?: Options['apiKey'];

  private platform: Options['platform'];

  constructor(options: Partial<Options>) {
    const env = getEnvConfig();

    this.apiKey = env.apiKey || options.apiKey;
    this.platform = (env.platform as unknown as Platform) || options.platform;
  }

  public chat(question: string, messages: BaseMessage[]): Stream {
    const platform = getPlatform(this.platform);
    const prompt = ChatPromptTemplate.fromMessages([
      SystemMessagePromptTemplate.fromTemplate(
        'You are a helpful assistant. Answer all questions to the best of your ability.'
      ),
      new MessagesPlaceholder('messages'),
      HumanMessagePromptTemplate.fromTemplate('{question}')
    ]);

    return platform.stream(prompt, { messages, question }, this.apiKey);
  }

  public async detect(content: string): Promise<ReturnType<typeof getDetectResult>> {
    const platform = getPlatform(this.platform);
    const prompt = ChatPromptTemplate.fromMessages([
      SystemMessagePromptTemplate.fromTemplate(PROMPT),
      HumanMessagePromptTemplate.fromTemplate('Here is what needs to be evaluated: \n{content}')
    ]);
    const result = await platform.invoke(prompt, { content }, this.apiKey);

    return getDetectResult(result);
  }
}
