const chai = require('chai');
const chaiFiles = require('chai-files');
const path = require('path');

chai.use(chaiFiles);

const expect = chai.expect;
const file = chaiFiles.file;
const helper = require('../test-helper');

const leaderboardImage = path.join(__dirname, '../../app/data/leaderboard.png');
const expectedLeaderboardImage = path.join(__dirname, '../data/export/leaderboard.png');

const courseImage = path.join(__dirname, '../../app/data/glider-rider-TestCourseA.png');
const expectedCourseImage = path.join(__dirname, '../data/export/glider-rider-TestCourseA.png');

describe('Export Controller - Default', () => {
  afterEach(() => {
    helper.removeFile(leaderboardImage);
    helper.removeFile(courseImage);
  });

  /* eslint-disable no-unused-expressions */
  it('should produce and return image file for leaderboard', async () => {
    await helper.downloadFromUrl('/export/leaderboard', leaderboardImage);
    expect(file(leaderboardImage)).to.exist;
    expect(helper.pixelImageDiff(leaderboardImage, expectedLeaderboardImage)).to.equal(0);
  });

  /* eslint-disable no-unused-expressions */
  it('should produce and return image file for glider-rider course', async () => {
    await helper.downloadFromUrl('/export/glider-rider/TestCourseA', courseImage);
    expect(file(courseImage)).to.exist;
    expect(helper.pixelImageDiff(courseImage, expectedCourseImage)).to.equal(0);
  });
});
