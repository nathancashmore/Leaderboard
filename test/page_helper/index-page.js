const IndexPage = function IndexPage(browser) {
  this.browser = browser;

  this.visit = () => this.browser.visit('/leaderboard');
  this.loadingSectionDisplayed = () => browser.assert.element('#loading');
};

module.exports = IndexPage;
