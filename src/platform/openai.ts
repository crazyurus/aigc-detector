import Platform from './base';

class OpenAI extends Platform {
  protected model = 'gpt-3.5-turbo';

  public name = 'OpenAI';

  protected server = 'api.openai.com';
}

export default OpenAI;
