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
    it('should return expected values', () =>
      userHelper.getName('879e207a-39a5-48df-ba7e-eb6089fe970c')
        .then(result =>
          expect(result).to.equal('MajorSlackmore'))
    );

    it('should return start of uuid if no name can be found', () =>
      userHelper.getName('cce091ad-6b3e-40db-87c9-6f6ace04ac95')
        .then(result =>
          expect(result).to.equal('cce091ad'))
    );
  });

  describe('Achievements', () => {
    it('should return user achievements by user with score', () => {
      const expectedResult =
        {
          userId: '879e207a-39a5-48df-ba7e-eb6089fe970c',
          achievements: ['buildPickaxe', 'openInventory', 'buildWorkBench', 'mineWood', 'exploreAllBiomes'],
          score: 50
        };

      return userHelper.getAchievements('879e207a-39a5-48df-ba7e-eb6089fe970c')
        .then(achievementsResult =>
          expect(achievementsResult).to.deep.equal(expectedResult));
    });

    it('should return achievements for all known stats', () => {
      const expectedResult =
        [
          {
            userId: '6eb35f96-c2c7-4332-b0b9-3d1981edae78',
            achievements: ['openInventory', 'buildWorkBench', 'mineWood', 'exploreAllBiomes'],
            score: 40
          },
          {
            userId: '879e207a-39a5-48df-ba7e-eb6089fe970c',
            achievements: ['buildPickaxe', 'openInventory', 'buildWorkBench', 'mineWood', 'exploreAllBiomes'],
            score: 50
          },
        ];

      return userHelper.getAllAchievements()
        .then((result) => {
          expect(result).to.deep.equal(expectedResult);
        });
    });
  });
});
