const chai = require('chai');
const chaiFiles = require('chai-files');
const path = require('path');
const md5 = require('md5');

chai.use(chaiFiles);

const expect = chai.expect;
const file = chaiFiles.file;
const helper = require('../test-helper');

const exportPage = helper.exportPage;
const exportFilename = path.join(__dirname, '../../app/data/leaderboard.png');

describe('Export Controller - Default', () => {
  after(() =>
    helper.removeFile(exportFilename)
  );

  /* eslint-disable no-unused-expressions */
  it('should produce and return image file', () =>
    exportPage.visit()
      .then(() => {
        expect(file(exportFilename)).to.exist;
        expect(md5(exportPage.body())).to.equal('5139048834431f05072ddbf3351444f2');
      })
  ).timeout(8000);
});
