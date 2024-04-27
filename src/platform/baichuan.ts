import { ChatPromptTemplate } from '@langchain/core/prompts';

import { PROMPT } from '../const';
import Platform from './base';

class BaiChuan extends Platform {
  protected model = 'Baichuan2-Turbo-192k';

  public name = 'BaiChuan';

  protected server = 'api.baichuan-ai.com';

  protected getPrompt(): ChatPromptTemplate {
    return ChatPromptTemplate.fromMessages([['user', PROMPT + '\nHere is what needs to be evaluated: \n{content}']]);
  }
}

export default BaiChuan;
