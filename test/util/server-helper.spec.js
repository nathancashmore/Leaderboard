const expect = require('chai').expect;
const helper = require('../test-helper');
const config = require('getconfig');

const ServerHelper = require('../../app/util/server-helper');

describe('Server Helper - Default', () => {
  const serverHelper = new ServerHelper(config.MC_SERVER_PATH);

  describe('Details', () => {
    let detailsResult = {};

    before(() => {
      detailsResult = serverHelper.getDetails();
    });

    it('should return expected values', () => {
      expect(detailsResult.ip).to.equal(helper.hostname);
      expect(detailsResult.connecturl).to.equal(`${helper.hostname}:25565`);
      expect(detailsResult.motd).to.equal('A Minecraft Server');
    });
  });
});
