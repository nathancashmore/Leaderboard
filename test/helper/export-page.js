
const ExportPage = function ExportPage(browser) {
  this.browser = browser;

  this.visit = () => browser.visit('/export');
  this.body = () => JSON.parse(browser.text());
};

module.exports = ExportPage;
