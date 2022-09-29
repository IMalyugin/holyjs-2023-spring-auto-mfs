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

const useModuleFederationPlugin = ({
  name,
  exposes,
  remotes,
}) => (
  new ModuleFederationPlugin({
    name,
    filename: 'remoteEntry.js',
    remotes,
    exposes,
    shared: {
      react: { singleton: true },
      'react-dom': { singleton: true },
    },
  })
);


const remoteEntry = (name) => {
  const { pkgName, port } = mfs[name];
  return {
    [pkgName]: `${name}@http://localhost:${port}/remoteEntry.js`
  };
};

module.exports = {
  useModuleFederationPlugin,
  remoteEntry,
};
