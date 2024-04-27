import crypto from 'node:crypto';

import type { Middleware } from './types';

const SECRET_KEY = 'aigc-detector';
const ENCRYPT_METHOD = 'aes-256-cbc';
const key = crypto.createHash('sha512').update(SECRET_KEY).digest('hex').slice(0, 32);

const encryptMiddleware: Middleware = {
  read(content: string): string {
    const [iv, data] = content.split(':');
    const decipher = crypto.createDecipheriv(ENCRYPT_METHOD, key, Buffer.from(iv, 'hex'));

    return decipher.update(data, 'base64', 'utf8') + decipher.final('utf8');
  },
  write(content: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ENCRYPT_METHOD, key, iv);

    return iv.toString('hex') + ':' + cipher.update(content, 'utf8', 'base64') + cipher.final('base64');
  }
};

export default encryptMiddleware;
