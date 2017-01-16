const os = require('os');

const InformationPage = function InformationPage(browser) {
  this.browser = browser;
  this.getOsHostname = () => os.hostname();
  this.visit = () => this.browser.visit('/information/server-details');
  this.getJsonResponse = () => JSON.parse(this.browser.response.body);
};

module.exports = InformationPage;
