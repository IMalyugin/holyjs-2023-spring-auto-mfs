const { Package } = require('./package');
const { resolve } = require('resolve.exports');

const getDependentMfs = (cwd = process.cwd()) => {
  const pkg = Package.fromCwd(cwd);
  return pkg.getDependencies()
    .map((pkgName) => pkg.resolve(pkgName))
    .map((pkgCwd) => Package.fromCwd(pkgCwd))
    .filter((pkg) => pkg.isMF())
    .map((pkg) => pkg.getInfo())
};


const autoRemotes = (cwd) => {
  return getDependentMfs(cwd).reduce((accum, { pkgName, name, version, port }) => ({
    ...accum,
    [pkgName]: `${name}@/mfs/${name}/${version}/remoteEntry.js`
  }), {});
}

const autoExposes = (pkg) => {
  if (pkg.exports) {
    return Object.keys(pkg.exports).filter(isPublicExport).reduce((accum, exportPath) => ({
      ...accum,
      [exportPath]: resolve(pkg, exportPath),
    }), {});
  }

  // else use module/main

  // else use './index' file in root;

  // else throw an error
}

const isPublicExport = (exportPath) => exportPath !== './package.json';
module.exports = {
  autoRemotes,
  autoExposes,
};
