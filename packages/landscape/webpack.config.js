const { config, useModuleFederationPlugin } = require('@beemfs/af-shared');

module.exports = {
  ...config('landscape'),
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
