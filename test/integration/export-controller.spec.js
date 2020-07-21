const chai = require('chai');
const chaiFiles = require('chai-files');
const path = require('path');
const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');


chai.use(chaiFiles);

const expect = chai.expect;
const file = chaiFiles.file;
const helper = require('../test-helper');

const exportFilename = path.join(__dirname, '../../app/data/leaderboard.png');
const tmpDownloadFile = path.join(__dirname, '../../app/data/download.tmp.png');

describe('Export Controller - Default', () => {
  after(() => {
    helper.removeFile(exportFilename);
    helper.removeFile(tmpDownloadFile);
  });

  /* eslint-disable no-unused-expressions */
  it('should produce and return image file', async () => {
    // Download the image from the new endpoint and save in temporary file
    await helper.downloadFromUrl('/export', tmpDownloadFile);

    // Check the resulting image file exists on the filesystem
    expect(file(exportFilename)).to.exist;

    // Compare the image on the filesystem to the downloaded image
    const fsImage = PNG.sync.read(fs.readFileSync(exportFilename));
    const { width, height } = fsImage;
    const downloadedImage = PNG.sync.read(fs.readFileSync(tmpDownloadFile));

    pixelmatch(downloadedImage.data, fsImage.data, null, width, height, { threshold: 0 });
  }).timeout(8000);
});
