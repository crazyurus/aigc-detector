import Platform from './base';

class MiniMax extends Platform {
  protected model = 'abab5.5-chat';

  public name = 'MiniMax';

  protected server = 'api.minimax.chat/v1/text/chatcompletion_v2#';
}

export default MiniMax;
