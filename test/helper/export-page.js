
const ExportPage = function ExportPage(browser) {
  this.browser = browser;

  this.visit = () => browser.visit('/export');
  this.body = () => browser.response.body;
};

module.exports = ExportPage;
