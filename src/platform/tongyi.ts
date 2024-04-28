import { ChatAlibabaTongyi } from '@langchain/community/chat_models/alibaba_tongyi';
import { type BaseLanguageModel } from '@langchain/core/language_models/base';

import Platform from './base';

class TongYi extends Platform {
  protected model = 'qwen-max';

  public name = '通义千问';

  protected server = 'open.bigmodel.cn';

  protected getChatModel(apiKey?: string): BaseLanguageModel {
    return new ChatAlibabaTongyi({
      alibabaApiKey: apiKey,
      model: this.model,
      temperature: this.temperature
    });
  }
}

export default TongYi;
