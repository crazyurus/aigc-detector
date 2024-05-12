import type { BaseLanguageModel } from '@langchain/core/language_models/base';

import { ChatZhipuAI } from '@langchain/community/chat_models/zhipuai';

import Platform from './base';

class ZhiPu extends Platform {
  protected model = 'glm-4';

  public name = '智谱清言';

  protected server = 'open.bigmodel.cn';

  protected getChatModel(apiKey?: string, streaming?: boolean): BaseLanguageModel {
    return new ChatZhipuAI({
      model: this.model,
      streaming,
      temperature: this.temperature,
      zhipuAIApiKey: apiKey
    });
  }
}

export default ZhiPu;
