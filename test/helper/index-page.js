
const IndexPage = function IndexPage(browser) {
  this.browser = browser;

  this.visit = () => browser.visit('/leaderboard');
  this.serverDetails = () => browser.text('[data-test="server-details"]');
  this.amWaitingForPlayers = () => browser.assert.element('[data-test="waiting-for-players"]');

  this.avatar = playerName => browser.query(`[data-test="player-${playerName}"] [data-test="avatar"]`).src;
  this.player = playerName => browser.text(`[data-test="player-${playerName}"] [data-test="player-name"]`);
  this.achievements = playerName => browser.query(`[data-test="player-${playerName}"] [data-test="achievements"]`).innerHTML;
  this.score = playerName => browser.text(`[data-test="player-${playerName}"] [data-test="score"]`);

  this.noOfPlayersShown = number => browser.assert.elements('[data-test-2="player"]', number);
};

module.exports = IndexPage;
