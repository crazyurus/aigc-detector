import type { BaseLanguageModel } from '@langchain/core/language_models/base';

import { ChatMinimax } from '@langchain/community/chat_models/minimax';

import Platform from './base';

class MiniMax extends Platform {
  protected model = 'abab5.5-chat';

  public name = 'MiniMax';

  protected server = 'api.minimax.chat';

  protected getChatModel(apiKey?: string, streaming = false): BaseLanguageModel {
    return new ChatMinimax({
      minimaxApiKey: apiKey,
      minimaxGroupId: '1782658868262748274',
      model: this.model,
      streaming,
      temperature: this.temperature
    });
  }
}

export default MiniMax;
