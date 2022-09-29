const { config, useModuleFederationPlugin } = require('@beemfs/af-shared');

module.exports = {
  ...config,
  entry: './',
  plugins: [
    useModuleFederationPlugin({
      name: 'landscape',
      exposes: {
        '.': '.'
      },
    }),
  ],
};
