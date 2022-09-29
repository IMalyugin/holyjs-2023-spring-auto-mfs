const { config, useModuleFederationPlugin, remoteEntry } = require('@beemfs/af-shared');

module.exports = {
  ...config('vehicle'),
  entry: './',
  plugins: [
    useModuleFederationPlugin({
      name: 'vehicle',
      remotes: {
        ...remoteEntry('chassis'),
      },
      exposes: {
        '.': '.'
      },
    }),
  ],
};
