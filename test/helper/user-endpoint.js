const os = require('os');

const UserEndpoint = function UserEndpoint(browser) {
  this.browser = browser;
  this.getOsHostname = () => os.hostname();
  this.visit = () => this.browser.visit('/user/details');
  this.getJsonResponse = () => JSON.parse(this.browser.response.body);
};

module.exports = UserEndpoint;
