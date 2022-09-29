const { config, useModuleFederationPlugin } = require('@beemfs/af-shared');

module.exports = {
  ...config('chassis'),
  entry: './',
  plugins: [
    useModuleFederationPlugin({
      name: 'chassis',
      exposes: {
        '.': '.'
      },
    }),
  ],
};
