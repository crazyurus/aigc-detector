import type { BaseLanguageModel } from '@langchain/core/language_models/base';
import type { ChatPromptTemplate } from '@langchain/core/prompts';

import { ChatOpenAI } from '@langchain/openai';

import Stream from '../core/stream';

abstract class Platform {
  protected temperature = 0.7;

  protected getChatModel(apiKey?: string, streaming = false): BaseLanguageModel {
    return new ChatOpenAI({
      apiKey,
      configuration: {
        baseURL: `https://${this.server}/v1`
      },
      frequencyPenalty: 1,
      model: this.model,
      streaming,
      temperature: this.temperature
    });
  }

  public async invoke(prompt: ChatPromptTemplate, params: Record<string, unknown>, apiKey?: string): Promise<string> {
    const chatModel = this.getChatModel(apiKey);
    const chain = prompt.pipe(chatModel);
    const result = await chain.invoke(params);

    return result.text;
  }

  public stream(prompt: ChatPromptTemplate, params: Record<string, unknown>, apiKey?: string): Stream {
    const chatModel = this.getChatModel(apiKey, true);
    const chain = prompt.pipe(chatModel);
    const stream = new Stream();

    chain
      .invoke(params, {
        callbacks: [
          {
            handleLLMNewToken(token: string) {
              stream.write(token);
            }
          }
        ]
      })
      .then(() => {
        stream.destroy();
      });

    return stream;
  }

  protected abstract model: string;

  public abstract name: string;

  protected abstract server: string;
}

export default Platform;
