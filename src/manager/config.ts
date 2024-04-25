import path from 'node:path';

import FileSystem from './file-system.js';
import encryptMiddleware from './middlewares/encrypt.js';

interface Config {
  apiKey: string;
  platform: string;
}

class ConfigManager {
  private configDirectory: string;

  private configPath: string;

  private fileSystem: FileSystem;

  constructor(configDirectory: string) {
    this.configDirectory = configDirectory;
    this.configPath = path.join(configDirectory, 'settings');
    this.fileSystem = new FileSystem([encryptMiddleware]);
  }

  async getAll(): Promise<Partial<Config>> {
    try {
      const config = await this.fileSystem.readFile(this.configPath);

      return JSON.parse(config.toString());
    } catch {
      return {};
    }
  }

  async getItem<K extends keyof Config>(key: K): Promise<Config[K] | undefined> {
    const config = await this.getAll();

    return config[key];
  }

  async setItem<K extends keyof Config>(key: K, value: Config[K]): Promise<void> {
    const config = await this.getAll();

    config[key] = value;

    if (!(await this.fileSystem.isFileExist(this.configDirectory))) {
      await this.fileSystem.makeDirectory(this.configDirectory);
    }

    await this.fileSystem.writeFile(this.configPath, JSON.stringify(config, null, 2));
  }
}

export default ConfigManager;
