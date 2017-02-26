const expect = require('chai').expect;
const helper = require('../test-helper');

const endpointHelper = helper.userEndpoint;

describe('User', () => {
  describe('Details', () => {
    before(() => endpointHelper.visitDetails());

    it('should be successful', () =>
      expect(endpointHelper.browser.status).to.equal(200)
    );

    it('should return expected values in json response', () => {
      const expectedResult =
        [
          {
            uuid: '879e207a-39a5-48df-ba7e-eb6089fe970c',
            name: 'MajorSlackmore'
          },
          {
            uuid: '6eb35f96-c2c7-4332-b0b9-3d1981edae78',
            name: 'MiniSlackmore'
          }
        ];

      expect(JSON.stringify(endpointHelper.getJsonResponse()))
        .to.equal(JSON.stringify(expectedResult));
    });
  });

  describe('Achievements', () => {
    before(() => endpointHelper.visitAchievements('879e207a-39a5-48df-ba7e-eb6089fe970c'));

    it('should be successful', () =>
      expect(endpointHelper.browser.status).to.equal(200)
    );

    it('should return user achievements', () => {
      const expectedResult = [
        {
          achievements: ['buildPickaxe', 'openInventory', 'buildWorkBench', 'mineWood', 'exploreAllBiomes'],
          score: 50
        }
      ];
      expect(JSON.stringify(endpointHelper.getJsonResponse()))
        .to.equal(JSON.stringify(expectedResult));
    });
  });
});
