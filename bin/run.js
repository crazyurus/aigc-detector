#!/usr/bin/env node

import { execute } from '@oclif/core';

import { initProxy } from './proxy';

initProxy();

await execute({
  dir: import.meta.url
});
