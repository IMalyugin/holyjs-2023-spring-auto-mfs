const path = require('path');
const loadJsonFile = require('load-json-file');

const convertPkgNameToMf = (pkgName) => pkgName
  .replace(/^@/, '')
  .replace('/', '__')
  .replace(/-/g, '_');

class Package {
  constructor(pkg, { mfPatterns = /^@beemfs\// } = {}) {
    this.pkg = pkg;
    this.options = { mfPatterns };
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
    return this.options.mfPatterns.test(this.pkgName);
  }

  getMfData() {
    return this.isMF() ? {
      name: convertPkgNameToMf(this.pkgName),
    } : undefined;
  }

  getInfo = () => ({
    pkgName: this.pkgName,
    version: this.version,
    ...this.getMfData(),
  });
}

module.exports = { Package };
