const oclifPrettierConfig = require('@oclif/prettier-config');

module.exports = {
  ...oclifPrettierConfig,
  semi: true,
  bracketSpacing: true,
  trailingComma: 'none',
  bracketSameLine: true,
  useTabs: false,
  plugins: [
    'prettier-plugin-packagejson'
  ]
};
