const PropertiesReader = require('properties-reader');

module.exports = class ServerHelper {

  constructor(serverPath, host) {
    this.serverPath = serverPath;
    this.host = host;
  }

  getDetails() {
    const propsFile = `${this.serverPath}/server.properties`;

    const props = PropertiesReader(propsFile);
    const connecturl = `${this.host}:${props.get('server-port')}`;

    return Object.assign(props.getAllProperties(), { ip: this.host, connecturl });
  }
};
