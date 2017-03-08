const expect = require('chai').expect;
const config = require('getconfig');

const UserHelper = require('../../app/util/user-helper');

describe('User Helper - Default', () => {
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

describe('User Helper - NoPlayers', () => {
  describe('Achievements', () => {
    const userHelper = new UserHelper(config.MC_SERVER_PATH);

    it('should return empty array', () =>
      userHelper.getAllAchievements()
        .then(result =>
          expect(result).to.be.empty
        ));
  });
});

describe('User Helper - WrongCache', () => {
  describe('Name', () => {
    const userHelper = new UserHelper(config.MC_SERVER_PATH);

    it('should return correct name when not found in cache ', () =>
      userHelper.getName('879e207a-39a5-48df-ba7e-eb6089fe970c')
        .then(result =>
          expect(result).to.equal('MajorSlackmore'))
    );
  });
});

describe('User Helper - NoInternet', () => {
  describe('Name', () => {
    const userHelper = new UserHelper(config.MC_SERVER_PATH);

    it('should return correct name when no internet', () =>
      userHelper.getName('6eb35f96-c2c7-4332-b0b9-3d1981edae78')
        .then(result =>
          expect(result).to.equal('6eb35f96'))
    );
  });
});

