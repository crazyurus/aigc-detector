import type { BaseMessage } from '@langchain/core/messages';

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

  public chat(content: string, messages: BaseMessage[]): Stream {
    const platform = getPlatform(this.platform);

    return platform.stream(
      'You are a helpful assistant. Answer all questions to the best of your ability.',
      { content, messages },
      this.apiKey
    );
  }

  public async detect(content: string): Promise<ReturnType<typeof getDetectResult>> {
    const platform = getPlatform(this.platform);
    const result = await platform.invoke(PROMPT, { content }, this.apiKey);

    return getDetectResult(result);
  }
}
