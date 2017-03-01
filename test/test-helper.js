const Zombie = require('zombie');
const os = require('os');

Zombie.site = 'http://localhost:25566';
const browser = new Zombie();

const IndexPage = require('./helper/index-page');
const ServerEndpoint = require('./helper/server-endpoint');
const UserEndpoint = require('./helper/user-endpoint');

require('../bin/www'); // This starts the web server, and ensures it is only
// started once. It is a misuse of "require", and
// should be improved.

module.exports = {
  indexPage: new IndexPage(browser),
  serverEndpoint: new ServerEndpoint(browser),
  userEndpoint: new UserEndpoint(browser),
  hostname: os.hostname(),
  browser,
};

