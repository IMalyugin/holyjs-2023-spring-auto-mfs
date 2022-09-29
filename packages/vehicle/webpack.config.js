const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './',
  output: {
    filename: 'static/[name].js',
    publicPath: 'auto',
    assetModuleFilename: `static/assets/[name].[hash][ext][query]`,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      }, {
        test: /\.pcss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[folder]_[local]_[hash:base64:4]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['postcss-preset-env', {
                    stage: 1,
                  }],
                ],
              },
            },
          },
        ]
      }, {
        test: /\.(jpg|png)$/,
        type: 'asset/resource'
      }
    ],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: './server/views/index.html',
    // }),
    new ModuleFederationPlugin({
      name: 'vehicle',
      filename: 'remoteEntry.js',
      exposes: {
        '.': '.'
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 8081,
  }
};
