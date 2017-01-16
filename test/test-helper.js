const Zombie = require('zombie');

Zombie.site = 'http://localhost:25566';
const browser = new Zombie();

const IndexPage = require('./page_helper/index-page');
const InformationEndpoint = require('./page_helper/information-endpoint');

require('../bin/www'); // This starts the web server, and ensures it is only
// started once. It is a misuse of "require", and
// should be improved.

module.exports = {
  indexPage: new IndexPage(browser),
  informationEndpoint: new InformationEndpoint(browser),
  browser,
};

