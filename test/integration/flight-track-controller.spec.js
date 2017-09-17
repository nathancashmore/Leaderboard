const expect = require('chai').expect;
const helper = require('../test-helper');

const flightTrackPage = helper.flightTrackPage;

describe('FlightTrack Controller - Default', () => {
  it('should display the correct values', () =>
    flightTrackPage.visit('TestCourse')
      .then(() => {
        expect(flightTrackPage.course()).to.equal('TestCourse');
        expect(flightTrackPage.playerInPosition(0)).to.equal('MajorSlackmore');
        expect(flightTrackPage.timeInPosition(0)).to.equal('00:09.123');
        expect(flightTrackPage.playerInPosition(1)).to.equal('MiniSlackmore');
        expect(flightTrackPage.timeInPosition(1)).to.equal('10:20.555');
      })
  );

  it('should only display part of the page if refresh', () =>
    flightTrackPage.refresh('TestCourse')
      .then(() => {
        expect(flightTrackPage.hasNotLoadedMainContent());
      })
  );
});

describe('FlightTrack Controller - NoAdvancements', () => {
  it('should display waiting for course records', () =>
    flightTrackPage.visit('TestCourse')
      .then(() => {
        expect(flightTrackPage.noRecords());
      })
  );
});

