interface Config {
  bin: string;
  version: string;
}

class NetworkManager {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  async httpRequest(url: URL): Promise<string> {
    const response = await fetch(url, {
      headers: {
        'User-Agent': this.config.bin + '/' + this.config.version
      },
      method: 'GET'
    });
    const content = await response.text();

    return content;
  }
}

export default NetworkManager;
