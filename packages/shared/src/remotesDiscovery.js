const { Package } = require('./package');

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

module.exports = {
  autoRemotes,
};
