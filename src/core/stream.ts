import { Transform, type TransformCallback } from 'node:stream';

class Stream extends Transform {
  private data = '';

  getData(): Promise<string> {
    return new Promise((resolve) => {
      this.on('close', () => {
        resolve(this.data);
      });
    });
  }

  _transform(chunk: Buffer, encoding: BufferEncoding, callback: TransformCallback): void {
    const data = chunk.toString();

    this.data += data;

    callback(null, data);
  }
}

export default Stream;
