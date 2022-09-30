const path = require('path');
const loadJsonFile = require('load-json-file');


class Package {
  constructor(pkg) {
    this.pkg = pkg;
  }

  static fromCwd(cwd) {
    return new Package(loadJsonFile.sync(path.join(cwd, 'package.json')));
  }

  get pkgName() { return this.pkg.name; }
  get version() { return this.pkg.version; }
  get exports() { return this.pkg.exports; }

  getDependencies() {
    return [
      ...Object.keys(this.pkg.dependencies || {}),
      ...Object.keys(this.pkg.peerDependencies || {}),
    ];
  }

  resolve(pkgName) {
    return path.dirname(require.resolve(path.join(pkgName, 'package.json')));
  }

  isMF() {
    return !!this.getMfData();
  }

  getMfData() {
    return this.pkg.beemfs;
  }

  getInfo = () => ({
    pkgName: this.pkgName,
    version: this.version,
    ...this.getMfData(),
  });
}

module.exports = { Package };
