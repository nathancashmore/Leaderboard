
const FlightTrackPage = function FlightTrackPage(browser) {
  this.browser = browser;

  this.visit = course => browser.visit(`/flight-track/${course}`);
  this.refresh = course => browser.visit(`/flight-track/${course}?refresh=true`);
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
};

module.exports = FlightTrackPage;
