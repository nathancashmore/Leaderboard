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
          },
          {
            uuid: 'd8d53d17-adfa-4007-bfa2-a4b427b2de26',
            name: 'MinorSlackmore'
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
            userId: 'd8d53d17-adfa-4007-bfa2-a4b427b2de26',
            advancements: [
              'minecraft:story/root',
              'minecraft:story/mine_stone',
              'minecraft:story/upgrade_tools',
              'minecraft:story/smelt_iron',
              'minecraft:story/obtain_armor',
              'minecraft:story/lava_bucket',
              'minecraft:story/iron_tools',
              'minecraft:story/deflect_arrow',
              'minecraft:story/form_obsidian',
              'minecraft:story/mine_diamond',
              'minecraft:story/enter_the_nether',
              'minecraft:story/shiny_gear',
              'minecraft:story/enchant_item',
              'minecraft:story/cure_zombie_villager',
              'minecraft:story/follow_ender_eye',
              'minecraft:story/enter_the_end',
              'minecraft:nether/root',
              'minecraft:nether/fast_travel',
              'minecraft:nether/find_fortress',
              'minecraft:nether/return_to_sender',
              'minecraft:nether/obtain_blaze_rod',
              'minecraft:nether/get_wither_skull',
              'minecraft:nether/uneasy_alliance',
              'minecraft:nether/brew_potion',
              'minecraft:nether/summon_wither',
              'minecraft:nether/all_potions',
              'minecraft:nether/create_beacon',
              'minecraft:nether/all_effects',
              'minecraft:nether/create_full_beacon',
              'minecraft:end/root',
              'minecraft:end/kill_dragon',
              'minecraft:end/dragon_egg',
              'minecraft:end/enter_end_gateway',
              'minecraft:end/respawn_dragon',
              'minecraft:end/dragon_breath',
              'minecraft:end/find_end_city',
              'minecraft:end/elytra',
              'minecraft:end/levitate',
              'minecraft:adventure/root',
              'minecraft:adventure/kill_a_mob',
              'minecraft:adventure/trade',
              'minecraft:adventure/sleep_in_bed',
              'minecraft:adventure/shoot_arrow',
              'minecraft:adventure/kill_all_mobs',
              'minecraft:adventure/totem_of_undying',
              'minecraft:adventure/summon_iron_golem',
              'minecraft:adventure/adventuring_time',
              'minecraft:adventure/sniper_duel',
              'minecraft:husbandry/root',
              'minecraft:husbandry/breed_an_animal',
              'minecraft:husbandry/tame_an_animal',
              'minecraft:husbandry/plant_seed',
              'minecraft:husbandry/breed_all_animals',
              'minecraft:husbandry/balanced_diet',
              'minecraft:husbandry/break_diamond_hoe'
            ],
            score: 550
          },
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

describe('User Helper - NoAdvancements', () => {
  describe('Advancements', () => {
    const userHelper = new UserHelper(config.MC_SERVER_PATH, 'world');

    it('should return zero score', () => {
      const expectedResult =
        [
          {
            userId: '879e207a-39a5-48df-ba7e-eb6089fe970c',
            advancements: [],
            score: 0
          },
        ];

      userHelper.getAllAdvancements()
        .then(result =>
          expect(result).to.equal(expectedResult)
        );
    });
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

