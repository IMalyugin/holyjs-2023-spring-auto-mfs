const bonjour = require('bonjour')();
const browser = bonjour.find({ type: 'wmf' });

const discoverBonjourPort = (mfName) => {
  const matches = browser.services
    .filter((service) => service.type === 'wmf')
    .filter((service) => service.name === mfName);

  return matches[0]?.port;
};


module.exports = {
  discoverBonjourPort,
};
