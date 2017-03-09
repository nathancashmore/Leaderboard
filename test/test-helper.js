const Zombie = require('zombie');

Zombie.site = 'http://localhost:25599';
const browser = new Zombie();

const IndexPage = require('./helper/index-page');

const config = require('getconfig');

require('../bin/www'); // This starts the web server, and ensures it is only
// started once. It is a misuse of "require", and
// should be improved.

module.exports = {
  indexPage: new IndexPage(browser),
  browser,
  config
};

