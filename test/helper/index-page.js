const IndexPage = function IndexPage(browser) {
  this.browser = browser;

  this.visit = () => browser.visit('/leaderboard');
  this.serverDetails = () => browser.text('[data-test="server-details"]');
  this.avatar = () => browser.query('[data-test="avatar"]').src;
  this.player = () => browser.text('[data-test="player"]');
  this.achievements = () => browser.query('[data-test="achievement"]').className;
  this.score = () => browser.text('[data-test="score"]');
};

module.exports = IndexPage;
