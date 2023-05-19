const { autoRemotes, autoExposes } = require('./remotesDiscovery');
const { Package } = require('./Package');
const { ModuleFederationPlugin } = require('webpack').container;

const useModuleFederationPlugin = (cwd = process.cwd()) => {
  const pkg = Package.fromCwd(cwd);

  return new ModuleFederationPlugin({
    name: pkg.getInfo().name,
    filename: 'remoteEntry.js',
    remotes: autoRemotes(cwd),
    exposes: autoExposes(pkg),
    shared: {
      react: { singleton: true },
      'react-dom': { singleton: true },
    },
  });
};

module.exports = {
  useModuleFederationPlugin,
};
