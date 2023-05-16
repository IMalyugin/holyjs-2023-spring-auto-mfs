const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('./webpack.config')
const compiler = webpack(webpackConfig);

function start() {
  webpackConfig.forEach((config, index) => {
    const currentCompiler = compiler.compilers[index];

    const devServerOptions = { ...currentCompiler.options.devServer };
    const server = new WebpackDevServer(devServerOptions, currentCompiler)
    server.listen(devServerOptions.port);
  });
}

start();
