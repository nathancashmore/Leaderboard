
const IndexPage = function IndexPage(browser) {
  this.browser = browser;

  this.visit = () => browser.visit('/leaderboard');
  this.visitStats = () => browser.visit('/leaderboard/stats');
  this.serverDetails = () => browser.text('[data-test="server-details"]');
  this.messageOfTheDay = () => browser.text('[data-test="motd"]');
  this.amWaitingForPlayers = () => browser.assert.element('[data-test="waiting-for-players"]');

  this.backgroundStyle = () => browser.query('body').className;
  this.avatar = playerName => browser.query(`[data-test="player-${playerName}"] [data-test="avatar"]`).data;
  this.player = playerName => browser.text(`[data-test="player-${playerName}"] [data-test="player-name"]`);
  this.advancements = playerName => browser.query(`[data-test="player-${playerName}"] [data-test="advancements"]`).innerHTML;
  this.advancement = (playerName, ref) => browser.query(`[data-test="player-${playerName}"] [data-test="${ref}"]`);
  this.score = playerName => browser.text(`[data-test="player-${playerName}"] [data-test="score"]`);

  this.noOfPlayersShown = number => browser.assert.elements('[data-test-2="player"]', number);
  this.playerInPosition = ((number) => {
    const players = browser.text('[data-test-2="player"] [data-test="player-name"]');
    return players.split(' ')[number];
  });
};

module.exports = IndexPage;
