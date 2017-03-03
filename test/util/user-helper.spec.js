const expect = require('chai').expect;
const config = require('getconfig');

const UserHelper = require('../../app/util/user-helper');

describe('User Helper', () => {
  const userHelper = new UserHelper(config.MC_SERVER_PATH);

  describe('Details', () => {
    it('should return expected values', () => {
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

      return userHelper.getDetails()
        .then(detailsResult =>
          expect(detailsResult).to.deep.equal(expectedResult));
    });
  });

  describe('Name', () => {
    it('should return expected values', () => userHelper.getName('879e207a-39a5-48df-ba7e-eb6089fe970c')
        .then(result =>
          expect(result).to.equal('MajorSlackmore')));
  });

  describe('Achievements', () => {
    it('should return user achievements with score', () => {
      const expectedResult =
        {
          achievements: ['buildPickaxe', 'openInventory', 'buildWorkBench', 'mineWood', 'exploreAllBiomes'],
          score: 50
        };

      return userHelper.getAchievements('879e207a-39a5-48df-ba7e-eb6089fe970c')
        .then(achievementsResult =>
          expect(achievementsResult).to.deep.equal(expectedResult));
    });
  });
});
