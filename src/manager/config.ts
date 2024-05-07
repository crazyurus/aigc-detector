import path from 'node:path';

import { getEnvConfig, type Config } from '../core/env';
import FileManager from './file';
import encryptMiddleware from './middlewares/encrypt';

class ConfigManager {
  private configDirectory: string;

  private configPath: string;

  private fileManager: FileManager;

  constructor(configDirectory: string) {
    this.configDirectory = configDirectory;
    this.configPath = path.join(configDirectory, 'settings');
    this.fileManager = new FileManager([encryptMiddleware]);
  }

  async getAll(): Promise<Partial<Config>> {
    const result = getEnvConfig();

    if (Object.keys(result).length > 0) {
      return result;
    }

    try {
      const config = await this.fileManager.readFile(this.configPath);

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

    if (!(await this.fileManager.isFileExist(this.configDirectory))) {
      await this.fileManager.makeDirectory(this.configDirectory);
    }

    await this.fileManager.writeFile(this.configPath, JSON.stringify(config, null, 2));
  }
}

export default ConfigManager;
