import type { BaseLanguageModel } from '@langchain/core/language_models/base';

import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { LLMChain } from 'langchain/chains';

type InvokeParameter = Parameters<InstanceType<typeof LLMChain>['invoke']>[0];

abstract class Platform {
  protected temperature = 0.7;

  protected getChatModel(apiKey?: string): BaseLanguageModel {
    return new ChatOpenAI({
      apiKey,
      configuration: {
        baseURL: `https://${this.server}/v1`
      },
      frequencyPenalty: 1,
      model: this.model,
      temperature: this.temperature
    });
  }

  protected getPrompt(prompt: string): ChatPromptTemplate {
    return ChatPromptTemplate.fromMessages([
      SystemMessagePromptTemplate.fromTemplate(prompt),
      HumanMessagePromptTemplate.fromTemplate('Here is what needs to be evaluated: \n{content}')
    ]);
  }

  public async invoke(prompt: string, params: InvokeParameter, apiKey?: string): Promise<string> {
    const promptTemplate = this.getPrompt(prompt);
    const chain = new LLMChain({
      llm: this.getChatModel(apiKey),
      prompt: promptTemplate
    });
    const result = await chain.invoke(params);

    return result.text;
  }

  protected abstract model: string;

  public abstract name: string;

  protected abstract server: string;
}

export default Platform;
