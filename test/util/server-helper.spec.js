const { expect, assert } = require('chai');
const helper = require('../test-helper');

const ServerHelper = require('../../app/util/server-helper');

describe('Server Helper - Default', () => {
  const serverHelper = new ServerHelper(helper.config.MC_SERVER_PATH, 'myhostname.com');

  describe('Details', () => {
    let detailsResult = {};

    before(() => {
      detailsResult = serverHelper.getDetails();
    });

    it('should return expected values', () => {
      expect(detailsResult.ip).to.equal('myhostname.com');
      expect(detailsResult.connecturl).to.equal('myhostname.com:25565');
      expect(detailsResult.motd).to.equal('A Minecraft Server');
      expect(detailsResult['level-name']).to.equal('world');
    });
  });

  describe('GliderRider', () => {
    it('should return flight track data', () =>
      serverHelper.getGliderRiderRecords()
        .then(result =>
          expect(result[0].course).to.equal('TestCourseA')
        )
    );

    it('should return course names', () =>
      serverHelper.getGliderRiderCourses()
        .then(result =>
          assert.deepEqual(result, ['TestCourseA', 'TestCourseB'])
        )
    );
  });
});

describe('Server Helper - NoData', () => {
  const serverHelper = new ServerHelper(helper.config.MC_SERVER_PATH, 'myhostname.com');

  describe('GliderRider Records', () => {
    it('should return empty list when no records file present', () =>
      serverHelper.getGliderRiderRecords()
        .then(result => expect(result).to.be.empty)
    );

    it('should return empty list when no courses file present', () =>
      serverHelper.getGliderRiderCourses()
        .then(result => expect(result).to.be.empty)
    );
  });
});

