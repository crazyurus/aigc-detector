import { ChatZhipuAI } from '@langchain/community/chat_models/zhipuai';
import { type BaseLanguageModel } from '@langchain/core/language_models/base';

import Platform from './base';

class ZhiPu extends Platform {
  protected model = 'glm-4';

  public name = 'ZhiPu';

  protected server = 'open.bigmodel.cn';

  protected getChatModel(apiKey?: string): BaseLanguageModel {
    return new ChatZhipuAI({
      model: this.model,
      temperature: this.temperature,
      zhipuAIApiKey: apiKey
    });
  }
}

export default ZhiPu;
