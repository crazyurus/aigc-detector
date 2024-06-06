export default {
  bin: 'aigc-detector',
  commands: './dist/cli/commands',
  dirname: 'aigc-detector',
  plugins: [
    '@oclif/plugin-help',
    '@oclif/plugin-not-found',
    '@oclif/plugin-version',
    '@oclif/plugin-warn-if-update-available'
  ]
};
