
const GliderRiderPage = function GliderRiderPage(browser) {
  this.browser = browser;

  this.visit = course => browser.visit(`/glider-rider/${course}`);
  this.refresh = course => browser.visit(`/glider-rider/${course}?refresh=true`);
  this.course = () => browser.text('[data-test="course"]');
  this.playerInPosition = ((number) => {
    const players = browser.text('[data-test="player-name"]');
    return players.split(' ')[number];
  });
  this.timeInPosition = ((number) => {
    const players = browser.text('[data-test="player-time"]');
    return players.split(' ')[number];
  });
  this.noRecords = () => browser.assert.element('[data-test="no-records"]');
  this.hasNotLoadedMainContent = () => browser.assert.elements('[data-test="main-content"]', 0);
  this.bannerImage = () => browser.query('[data-test="banner"]').src;
};

module.exports = GliderRiderPage;
