import { type BaseLanguageModel } from '@langchain/core/language_models/base';
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { LLMChain } from 'langchain/chains';

import { PROMPT } from '../const';

abstract class Platform {
  protected temperature = 0.7;

  get baseURL(): string {
    return `https://${this.server}/v1`;
  }

  protected getChatModel(apiKey?: string): BaseLanguageModel {
    return new ChatOpenAI({
      apiKey,
      configuration: {
        baseURL: this.baseURL
      },
      model: this.model,
      temperature: this.temperature
    });
  }

  public async invoke(content?: string, apiKey?: string): Promise<string> {
    const prompt = ChatPromptTemplate.fromMessages([
      SystemMessagePromptTemplate.fromTemplate(PROMPT),
      HumanMessagePromptTemplate.fromTemplate('Here is what needs to be evaluated: \n{content}')
    ]);
    const chain = new LLMChain({
      llm: this.getChatModel(apiKey),
      prompt
    });
    const result = await chain.invoke({
      content
    });

    return result.text;
  }

  protected abstract model: string;

  public abstract name: string;

  protected abstract server: string;
}

export default Platform;
