const HtmlWebpackPlugin = require('html-webpack-plugin');
const { config, remoteEntry, useModuleFederationPlugin } = require('@beemfs/af-shared');

module.exports = {
  ...config,
  entry: './src/',
  plugins: [
    new HtmlWebpackPlugin({
      template: './server/views/index.html',
    }),
    useModuleFederationPlugin({
      name: 'app',
      remotes: {
        ...remoteEntry('vehicle'),
        ...remoteEntry('landscape'),
      },
    }),
  ],
};
