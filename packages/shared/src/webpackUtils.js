const { autoRemotes, autoExposes } = require('./remotesDiscovery');
const { Package } = require('./Package');
const { ModuleFederationPlugin } = require('webpack').container;


const mfs = {
  'vehicle': {
    pkgName: '@beemfs/af-vehicle',
    port: 8081,
  },
  'landscape': {
    pkgName: '@beemfs/af-landscape',
    port: 8082,
  },
  'chassis': {
    pkgName: '@beemfs/af-chassis',
    port: 8083,
  },
};

const getMfPort = (mfName) => mfs[mfName].port;

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
  getMfPort,
};
