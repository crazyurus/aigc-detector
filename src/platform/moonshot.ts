import type { BaseLanguageModel } from '@langchain/core/language_models/base';

import { ChatMoonshot } from '@langchain/community/chat_models/moonshot';

import Platform from './base';

class Moonshot extends Platform {
  protected model = 'moonshot-v1-8k';

  public name = 'Moonshot';

  protected server = 'api.moonshot.cn';

  protected getChatModel(apiKey?: string, streaming?: boolean): BaseLanguageModel {
    return new ChatMoonshot({
      apiKey,
      model: this.model,
      streaming,
      temperature: this.temperature
    });
  }
}

export default Moonshot;
