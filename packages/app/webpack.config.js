const HtmlWebpackPlugin = require('html-webpack-plugin');
const { config, useModuleFederationPlugin } = require('@beemfs/af-shared');

module.exports = {
  ...config('app'),
  entry: './src/',
  plugins: [
    new HtmlWebpackPlugin({
      template: './server/views/index.html',
    }),
    useModuleFederationPlugin({
      name: 'app',
    }),
  ],
};
