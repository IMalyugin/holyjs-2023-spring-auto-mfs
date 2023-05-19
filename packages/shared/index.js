const { config } = require('./src/webpackConfig.js');
const { useModuleFederationPlugin } = require('./src/webpackUtils.js');

module.exports = {
  config,
  useModuleFederationPlugin
};
