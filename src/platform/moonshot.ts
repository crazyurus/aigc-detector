import Platform from './base';

class Moonshot extends Platform {
  protected model = 'moonshot-v1-8k';

  public name = 'Moonshot';

  protected server = 'api.moonshot.cn';
}

export default Moonshot;
