const PropertiesReader = require('properties-reader');
const os = require('os');

module.exports = class ServerHelper {

  constructor(serverPath) {
    this.serverPath = serverPath;
  }

  getDetails() {
    const propsFile = `${this.serverPath}/server.properties`;

    const props = PropertiesReader(propsFile);
    const ip = os.hostname();
    const connecturl = `${ip}:${props.get('server-port')}`;

    return Object.assign(props.getAllProperties(), { ip, connecturl });
  }
};
