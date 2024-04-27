#!/usr/bin/env node --no-warnings=ExperimentalWarning --experimental-specifier-resolution=node

import { execute } from '@oclif/core'

await execute({ dir: import.meta.url })
