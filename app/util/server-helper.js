const PropertiesReader = require('properties-reader');
const readFile = require('fs-readfile-promise');

const colorCharRegEx = /\\u00A7./g;

module.exports = class ServerHelper {

  constructor(serverPath, host) {
    this.serverPath = serverPath;
    this.host = host;
  }

  getDetails() {
    const propsFile = `${this.serverPath}/server.properties`;

    const props = PropertiesReader(propsFile);
    const connecturl = `${this.host}:${props.get('server-port')}`;
    const motd = props.get('motd').replace(colorCharRegEx, '');

    return Object.assign(props.getAllProperties(), { ip: this.host, connecturl, motd });
  }

  getGliderRiderRecords() {
    const pathToData = `${this.serverPath}plugins/GliderRider/record.json`;

    return readFile(pathToData)
      .then(data => JSON.parse(data))
      .catch(() => []);
  }
};
