const { ModuleFederationPlugin } = require('webpack').container;

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

module.exports = {
  useModuleFederationPlugin,
};
