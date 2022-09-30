const { config } = require('./src/webpackConfig.js');
const { useModuleFederationPlugin, getMfPort } = require('./src/webpackUtils.js');

module.exports = {
  config,
  getMfPort,
  useModuleFederationPlugin,
};
