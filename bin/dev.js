#!/usr/bin/env -S node --loader ts-node/esm --no-warnings=ExperimentalWarning --experimental-specifier-resolution=node

// eslint-disable-next-line n/shebang
import { execute } from '@oclif/core';

import { initProxy } from './proxy.js';

initProxy();

await execute({
  development: true,
  dir: import.meta.url
});
