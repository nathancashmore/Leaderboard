const chai = require('chai');
const chaiFiles = require('chai-files');
const path = require('path');

chai.use(chaiFiles);

const expect = chai.expect;
const file = chaiFiles.file;
const helper = require('../test-helper');

const leaderboardExportFilename = path.join(__dirname, '../../app/data/leaderboard.png');
const expectedLeaderboardImage = path.join(__dirname, '../data/export/leaderboard.png');

const gliderRiderCourseExportFilename = path.join(__dirname, '../../app/data/glider-rider-TestCourse.png');
const expectedGliderRiderCourseImage = path.join(__dirname, '../data/export/glider-rider-TestCourse.png');

describe('Export Controller - Default', () => {
  after(() => {
    helper.removeFile(leaderboardExportFilename);
    helper.removeFile(gliderRiderCourseExportFilename);
  });

  /* eslint-disable no-unused-expressions */
  it('should produce and return image file for leaderboard', async () => {
    await helper.downloadFromUrl('/export/leaderboard', leaderboardExportFilename);
    expect(file(leaderboardExportFilename)).to.exist;
    helper.compareImages(leaderboardExportFilename, expectedLeaderboardImage);
  });

  it('should produce and return image file for glider-rider course', async () => {
    await helper.downloadFromUrl('/export/glider-rider/TestCourse', gliderRiderCourseExportFilename);
    expect(file(gliderRiderCourseExportFilename)).to.exist;
    helper.compareImages(gliderRiderCourseExportFilename, expectedGliderRiderCourseImage);
  });
});
