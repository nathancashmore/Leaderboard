const os = require('os');

const UserEndpoint = function UserEndpoint(browser) {
  this.browser = browser;
  this.getOsHostname = () => os.hostname();
  this.visitDetails = () => this.browser.visit('/user/details');
  this.visitAchievements = userId => this.browser.visit(`/user/${userId}/achievements`);
  this.getJsonResponse = () => JSON.parse(this.browser.response.body);
};

module.exports = UserEndpoint;
