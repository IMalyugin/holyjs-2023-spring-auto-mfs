const path = require('path');
const { Package } = require('./Package');
const { useModuleFederationPlugin } = require("./webpackUtils");

const config = (cwd = process.cwd(), { port = process.env.PORT } = {}) => {
  const { name: mfName } = Package.fromCwd(cwd).getInfo();

  return {
    context: cwd,
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
        useModuleFederationPlugin(cwd)
    ],
    devServer: {
      bonjour: {
        host: 'localhost',
        name: mfName,
        type: 'wmf',
        port,
      },
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      port,
    }
  }
};

module.exports = {
  config,
};
