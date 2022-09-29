const { config } = require('./src/webpackConfig.js');
const { useModuleFederationPlugin, remoteEntry, getMfPort } = require('./src/webpackUtils.js');

module.exports = {
  config,
  remoteEntry,
  getMfPort,
  useModuleFederationPlugin
};
