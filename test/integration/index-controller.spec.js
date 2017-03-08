const expect = require('chai').expect;
const helper = require('../test-helper');

const indexPage = helper.indexPage;

describe('Index Controller - Default', () => {
  const expectedPlayer = 'MajorSlackmore';

  it('should display the correct server connection details', () =>
    indexPage.visit()
      .then(() => {
        expect(indexPage.serverDetails()).to.equal('localhost:25565');
      })
  );

  it('should display the correct avatar', () =>
    indexPage.visit()
      .then(() => {
        expect(indexPage.avatar(expectedPlayer)).to.equal('https://minotar.net/avatar/MajorSlackmore/100.png');
      })
  );

  it('should display the correct player name', () =>
    indexPage.visit()
      .then(() => {
        expect(indexPage.player(expectedPlayer)).to.equal(expectedPlayer);
      })
  );

  it('should display the correct achievements', () =>
    indexPage.visit()
      .then(() => {
        expect(indexPage.achievements(expectedPlayer)).to.contain('buildPickaxe');
        expect(indexPage.achievements(expectedPlayer)).to.contain('openInventory');
        expect(indexPage.achievements(expectedPlayer)).to.contain('buildWorkBench');
        expect(indexPage.achievements(expectedPlayer)).to.contain('mineWood');
        expect(indexPage.achievements(expectedPlayer)).to.contain('exploreAllBiomes');
      })
  );

  it('should display the correct score', () =>
    indexPage.visit()
      .then(() => {
        expect(indexPage.score(expectedPlayer)).to.equal('50');
      })
  );
});

describe('Index Controller - NoPlayers', () => {
  it('should display Waiting if no players are found', () =>
    indexPage.visit()
      .then(() =>
        expect(indexPage.amWaitingForPlayers()))
  );
});

describe('Index Controller - NoCache', () => {
  it('should still display all players if cache is wrong', () =>
    indexPage.visit()
      .then(() =>
        expect(indexPage.noOfPlayersShown(2)))
  );

  it('should display the correct avatar', () =>
    indexPage.visit()
      .then(() => {
        expect(indexPage.avatar('MajorSlackmore')).to.equal('https://minotar.net/avatar/MajorSlackmore/100.png');
        expect(indexPage.avatar('MiniSlackmore')).to.equal('https://minotar.net/avatar/MiniSlackmore/100.png');
      })
  );
});
