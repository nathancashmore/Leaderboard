const ServerEndpoint = function ServerEndpoint(browser) {
  this.browser = browser;
  this.visit = () => this.browser.visit('/server/details');
  this.getJsonResponse = () => JSON.parse(this.browser.response.body);
};

module.exports = ServerEndpoint;
