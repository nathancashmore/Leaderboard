const expect = require('chai').expect;
const helper = require('../test-helper');

const gliderRiderPage = helper.gliderRiderPage;

describe('GliderRider Controller - Default', () => {
  it('should display the correct banner image', () =>
    gliderRiderPage.visit('TestCourseA')
      .then(() => {
        expect(gliderRiderPage.bannerImage()).to.contain('/images/glider_rider.png');
      })
  );

  it('should display the correct values', () =>
    gliderRiderPage.visit('TestCourseA')
      .then(() => {
        expect(gliderRiderPage.course()).to.equal('TestCourseA');
        expect(gliderRiderPage.playerInPosition(0)).to.equal('MajorSlackmore');
        expect(gliderRiderPage.timeInPosition(0)).to.equal('00:09.123');
        expect(gliderRiderPage.playerInPosition(1)).to.equal('MiniSlackmore');
        expect(gliderRiderPage.timeInPosition(1)).to.equal('10:20.555');
      })
  );

  it('should only display part of the page if refresh', () =>
    gliderRiderPage.refresh('TestCourseA')
      .then(() => {
        expect(gliderRiderPage.hasNotLoadedMainContent());
      })
  );
});

describe('GliderRider Controller - NoData', () => {
  it('should display waiting for course records', () =>
    gliderRiderPage.visit('TestCourseA')
      .then(() => {
        expect(gliderRiderPage.noRecords());
      })
  );
});

describe('GliderRider Controller - OtherConfig', () => {
  it('should limit the number of displayed players', () =>
    gliderRiderPage.visit('TestCourseA')
      .then(() => {
        expect(gliderRiderPage.course()).to.equal('TestCourseA');
        expect(gliderRiderPage.playerInPosition(0)).to.equal('MajorSlackmore');
        expect(gliderRiderPage.playerInPosition(1)).to.equal(undefined);
      })
  );
});
