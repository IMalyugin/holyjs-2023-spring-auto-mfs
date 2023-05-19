const { config } = require('./src/webpackConfig.js');
const { useModuleFederationPlugin, remoteEntry } = require('./src/webpackUtils.js');

module.exports = {
  config,
  remoteEntry,
  useModuleFederationPlugin
};
