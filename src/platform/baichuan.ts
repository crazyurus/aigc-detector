import Platform from './base';

class BaiChuan extends Platform {
  protected model = 'Baichuan3-Turbo';

  public name = '百川智能';

  protected server = 'api.baichuan-ai.com';

  protected temperature = 0.3;
}

export default BaiChuan;
