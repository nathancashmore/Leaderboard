const expect = require('chai').expect;
const config = require('getconfig');

const UserHelper = require('../../app/util/user-helper');

describe('User Helper - Default', () => {
  const userHelper = new UserHelper(config.MC_SERVER_PATH, 'world');

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

  describe('Advancements', () => {
    it('should return user advancements by user with score', () => {
      const expectedResult =
        {
          userId: '879e207a-39a5-48df-ba7e-eb6089fe970c',
          advancements: [
            'minecraft:story/root',
            'minecraft:story/mine_stone',
          ],
          score: 20
        };

      return userHelper.getAdvancements('879e207a-39a5-48df-ba7e-eb6089fe970c')
        .then(achievementsResult =>
          expect(achievementsResult).to.deep.equal(expectedResult));
    });

    it('should return advancements for all known', () => {
      const expectedResult =
        [
          {
            userId: '6eb35f96-c2c7-4332-b0b9-3d1981edae78',
            advancements: [
              'minecraft:adventure/kill_a_mob',
              'minecraft:story/mine_stone',
              'minecraft:adventure/root',
              'minecraft:adventure/shoot_arrow',
              'minecraft:story/upgrade_tools',
              'minecraft:story/root',
            ],
            score: 60
          },
          {
            userId: '879e207a-39a5-48df-ba7e-eb6089fe970c',
            advancements: [
              'minecraft:story/root',
              'minecraft:story/mine_stone',
            ],
            score: 20
          },
        ];

      return userHelper.getAllAdvancements()
        .then((result) => {
          expect(result).to.deep.equal(expectedResult);
        });
    });

    it('should function even when there is no trailing space on MC_SERVER_PATH', () => {
      const userHelperNoTrailingSpace = new UserHelper('./test/data/minecraftServer', 'world');

      return userHelperNoTrailingSpace.getAdvancements('879e207a-39a5-48df-ba7e-eb6089fe970c')
        .then(advancementResult =>
          expect(advancementResult).to.exist);
    });
  });
});

describe('User Helper - NoPlayers', () => {
  describe('Achievements', () => {
    const userHelper = new UserHelper(config.MC_SERVER_PATH, 'world');

    it('should return empty array', () =>
      userHelper.getAllAdvancements()
        .then(result =>
          expect(result).to.be.empty
        ));
  });
});

describe('User Helper - NoCache', () => {
  describe('Name', () => {
    const userHelper = new UserHelper(config.MC_SERVER_PATH, 'world');

    it('should return correct name when not found in cache ', () =>
      userHelper.getName('879e207a-39a5-48df-ba7e-eb6089fe970c')
        .then(result =>
          expect(result).to.equal('MajorSlackmore'))
    );
  });
});

describe('User Helper - NoInternet', () => {
  describe('Name', () => {
    const userHelper = new UserHelper(config.MC_SERVER_PATH, 'world');

    it('should return correct name when no internet', () =>
      userHelper.getName('6eb35f96-c2c7-4332-b0b9-3d1981edae78')
        .then(result =>
          expect(result).to.equal('UNKNOWN'))
    );
  });
});

