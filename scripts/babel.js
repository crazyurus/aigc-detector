import { transformFileAsync } from "@babel/core";
import { glob } from 'glob';
import fs from 'node:fs';
import path from 'node:path';

const files = await glob('./dist/**/*.js');
const transformImportSourcePlugin = {
  visitor: {
    ImportDeclaration(params, context) {
      const { value } = params.node.source;

      if (value.startsWith('./') || value.startsWith('../')) {
        const absolutePath = path.join(context.filename, '..', value + '.js');

        if (fs.existsSync(absolutePath)) {
          params.node.source.value += '.js';
        } else {
          const absolutePath = path.join(context.filename, '..', value, 'index.js');

          if (fs.existsSync(absolutePath)) {
            params.node.source.value += '/index.js';
          }
        }
      }
    }
  }
};

for (const file of files) {
  const filePath = path.join(import.meta.url, '..', '..', file).slice(5);
  const result = await transformFileAsync(filePath, {
    plugins: [transformImportSourcePlugin]
  });

  await fs.promises.writeFile(filePath, result.code);
}

