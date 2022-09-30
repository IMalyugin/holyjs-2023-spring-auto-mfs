const { config, useModuleFederationPlugin } = require('@beemfs/af-shared');

module.exports = {
  ...config('vehicle'),
  entry: './',
  plugins: [
    useModuleFederationPlugin({
      name: 'vehicle',
      exposes: {
        '.': '.'
      },
    }),
  ],
};
