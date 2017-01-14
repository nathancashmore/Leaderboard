const expect = require('chai').expect;
const helper = require('../test-helper');

const indexPage = helper.indexPage;

describe('Home Page', () => {
  it('should display holding page when requested', () =>
    indexPage.visit('/')
      .then(() => expect(indexPage.loadingSectionDisplayed()))
  );
});
