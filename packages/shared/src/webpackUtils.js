const { autoRemotes } = require('./remotesDiscovery');
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

const useModuleFederationPlugin = ({
  name,
  exposes,
}, cwd = process.cwd()) => (
  new ModuleFederationPlugin({
    name,
    filename: 'remoteEntry.js',
    remotes: autoRemotes(cwd),
    exposes,
    shared: {
      react: { singleton: true },
      'react-dom': { singleton: true },
    },
  })
);

module.exports = {
  useModuleFederationPlugin,
  getMfPort,
};
