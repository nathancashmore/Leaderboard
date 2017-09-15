const expect = require('chai').expect;
const helper = require('../test-helper');

const flightTrackPage = helper.flightTrackPage;

describe('FlightTrack Controller - Default', () => {
  it('should display the correct values', () =>
    flightTrackPage.visit('TestCourse')
      .then(() => {
        expect(flightTrackPage.course()).to.equal('TestCourse');
        expect(flightTrackPage.playerInPosition(0)).to.equal('MajorSlackmore');
        expect(flightTrackPage.timeInPosition(0)).to.equal('10000');
        expect(flightTrackPage.playerInPosition(1)).to.equal('MiniSlackmore');
        expect(flightTrackPage.timeInPosition(1)).to.equal('9000');
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

