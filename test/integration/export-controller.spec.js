const expect = require('chai').expect;
const helper = require('../test-helper');

const exportPage = helper.exportPage;

describe('Export Controller - Default', () => {
  it('should return produced image details', () =>
    exportPage.visit()
      .then(() => {
        expect(exportPage.body()).to.deep.equal({ status : 'OK' });
        // Get and return the image ?
      })
  );
});
