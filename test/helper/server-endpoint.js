const os = require('os');

const ServerEndpoint = function ServerEndpoint(browser) {
  this.browser = browser;
  this.getOsHostname = () => os.hostname();
  this.visit = () => this.browser.visit('/server/details');
  this.getJsonResponse = () => JSON.parse(this.browser.response.body);
};

module.exports = ServerEndpoint;
