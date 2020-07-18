const Zombie = require('zombie');

Zombie.site = 'http://localhost:25599';
const browser = new Zombie();

const IndexPage = require('./helper/index-page');
const GliderRiderPage = require('./helper/glider-rider-page');
const ExportPage = require('./helper/export-page');

const config = require('getconfig');

require('../bin/www'); // This starts the web server, and ensures it is only
// started once. It is a misuse of "require", and
// should be improved.

module.exports = {
  indexPage: new IndexPage(browser),
  gliderRiderPage: new GliderRiderPage(browser),
  exportPage: new ExportPage(browser),
  browser,
  config
};

