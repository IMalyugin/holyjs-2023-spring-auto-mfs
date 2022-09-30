const path = require('path');
const loadJsonFile = require('load-json-file');


class Package {
  constructor(pkg) {
    this.pkg = pkg;
  }

  get pkgName() { return this.pkg.name; }
  get version() { return this.pkg.version; }

  getDependencies() {
    return [
      ...Object.keys(this.pkg.dependencies || {}),
      ...Object.keys(this.pkg.peerDependencies || {}),
    ];
  }

  resolve(pkgName) {
    return path.dirname(require.resolve(path.join(pkgName, 'package.json')));
  }

  getMfData() {
    return this.pkg.beemfs;
  }

  getInfo = () => ({
    pkgName: this.pkgName,
    version: this.version,
    ...this.getMfData(),
  });

  isMF() {
    return !!this.getMfData();
  }

  static fromCwd(cwd) {
    return new Package(loadJsonFile.sync(path.join(cwd, 'package.json')));
  }
}

module.exports = { Package };
