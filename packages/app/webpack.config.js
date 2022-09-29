const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { config, useModuleFederationPlugin } = require('@beemfs/af-shared');

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
        '@beemfs/af-vehicle': 'vehicle@http://localhost:8081/remoteEntry.js',
      },
    }),
  ],
};
