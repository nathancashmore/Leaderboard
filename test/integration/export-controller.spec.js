const chai = require('chai');
const chaiFiles = require('chai-files');
const path = require('path');


chai.use(chaiFiles);

const expect = chai.expect;
const file = chaiFiles.file;
const helper = require('../test-helper');

const leaderboardExportFilename = path.join(__dirname, '../../app/data/leaderboard.png');
const expectedLeaderboardImage = path.join(__dirname, '../data/export/leaderboard.png');

describe('Export Controller - Default', () => {
  after(() => {
    helper.removeFile(leaderboardExportFilename);
  });

  /* eslint-disable no-unused-expressions */
  it('should produce and return image file for leaderboard', async () => {
    await helper.downloadFromUrl('/export/leaderboard', leaderboardExportFilename);
    expect(file(leaderboardExportFilename)).to.exist;
    helper.compareImages(leaderboardExportFilename, expectedLeaderboardImage);
  });
});
