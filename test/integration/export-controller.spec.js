const chai = require('chai');
const chaiFiles = require('chai-files');
const path = require('path');
const md5 = require('md5');
const fs = require('fs');

chai.use(chaiFiles);

const expect = chai.expect;
const file = chaiFiles.file;
const helper = require('../test-helper');

const exportPage = helper.exportPage;
const exportFilename = path.join(__dirname, '../../app/data/export.png');

describe('Export Controller - Default', () => {
  before(() => {
    if (fs.existsSync(exportFilename)) {
      fs.unlinkSync(exportFilename);
    }
  });

  /* eslint-disable no-unused-expressions */
  it('should produce and return image file', () =>
    exportPage.visit()
      .then(() => {
        expect(file(exportFilename)).to.exist;
        expect(md5(exportPage.body())).to.equal('e4f5ccdc69b690c0c6262af6a5f4cc15');
      })
  ).timeout(8000);
});
