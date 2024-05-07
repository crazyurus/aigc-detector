import fs from 'node:fs/promises';

import type { Middleware } from './middlewares/types';

class FileManager {
  private middlewares: Middleware[] = [];

  constructor(middlewares?: Middleware[]) {
    if (middlewares) {
      this.middlewares = middlewares;
    }
  }

  async isFileExist(path: string): Promise<boolean> {
    try {
      await fs.access(path);

      return true;
    } catch {
      return false;
    }
  }

  async makeDirectory(path: string): Promise<void> {
    await fs.mkdir(path);
  }

  async readFile(path: string): Promise<string> {
    const content = await fs.readFile(path);
    let originContent = content.toString();

    for (const middleware of this.middlewares) {
      originContent = middleware.read(originContent);
    }

    return originContent;
  }

  async writeFile(path: string, content: string): Promise<void> {
    let originContent = content;

    for (const middleware of this.middlewares) {
      originContent = middleware.write(originContent);
    }

    await fs.writeFile(path, originContent);
  }
}

export default FileManager;
