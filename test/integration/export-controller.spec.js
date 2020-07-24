const chai = require('chai');
const chaiFiles = require('chai-files');
const path = require('path');

chai.use(chaiFiles);

const expect = chai.expect;
const file = chaiFiles.file;
const helper = require('../test-helper');

const exportPage = helper.exportPage;

const leaderboardImage = path.join(__dirname, '../../app/data/leaderboard.png');
const expectedLeaderboardImage = path.join(__dirname, '../data/export/leaderboard.png');

const courseImageA = path.join(__dirname, '../../app/data/glider-rider-TestCourseA.png');
const expectedCourseImageA = path.join(__dirname, '../data/export/glider-rider-TestCourseA.png');

const courseImageB = path.join(__dirname, '../../app/data/glider-rider-TestCourseB.png');
const expectedCourseImageB = path.join(__dirname, '../data/export/glider-rider-TestCourseB.png');

describe('Export Controller - ImageCompare', () => {
  afterEach(() => {
    helper.removeFile(leaderboardImage);
    helper.removeFile(courseImageA);
    helper.removeFile(courseImageB);
  });

  /* eslint-disable no-unused-expressions */
  it('should produce and return image file for leaderboard', async () => {
    await helper.downloadFromUrl('/export/leaderboard', leaderboardImage);
    expect(file(leaderboardImage)).to.exist;
    expect(helper.pixelImageDiff(leaderboardImage, expectedLeaderboardImage)).to.equal(0);
  });

  /* eslint-disable no-unused-expressions */
  it('should produce and return image file for glider-rider course', async () => {
    await helper.downloadFromUrl('/export/glider-rider/TestCourseA', courseImageA);
    expect(file(courseImageA)).to.exist;
    expect(helper.pixelImageDiff(courseImageA, expectedCourseImageA)).to.equal(0);
  });

  it('should produce an image file for all courses', async () => {
    await exportPage.visit();

    expect(file(leaderboardImage)).to.exist;
    expect(file(courseImageA)).to.exist;
    expect(file(courseImageB)).to.exist;

    expect(helper.pixelImageDiff(leaderboardImage, expectedLeaderboardImage)).to.equal(0);
    expect(helper.pixelImageDiff(courseImageA, expectedCourseImageA)).to.equal(0);
    expect(helper.pixelImageDiff(courseImageB, expectedCourseImageB)).to.equal(0);
  }).timeout(10000);
});
