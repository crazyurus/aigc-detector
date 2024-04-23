const oclifPrettierConfig = require('@oclif/prettier-config');

module.exports = {
  ...oclifPrettierConfig,
  semi: true,
  bracketSpacing: true,
  trailingComma: 'none',
  bracketSameLine: true,
  useTabs: false,
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-packagejson'
  ],
  importOrder: [
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/(.*)$',
    '',
    '^[./]'
  ]
};
