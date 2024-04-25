import Platform from './base.js';

class OpenAI extends Platform {
  public model = 'gpt-3.5-turbo';

  public name = 'OpenAI';

  public server = 'api.openai.com';
}

export default OpenAI;
