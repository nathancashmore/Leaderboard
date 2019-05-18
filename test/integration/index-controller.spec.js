const expect = require('chai').expect;
const helper = require('../test-helper');
const links = require('../../app/assets/json/link');
const content = require('../../app/locales/en');
const points = require('../../app/assets/json/points');

const indexPage = helper.indexPage;

describe('Index Controller - Default', () => {
  const expectedPlayer = 'MajorSlackmore';

  it('should display the correct template', () =>
    indexPage.visit()
      .then(() => {
        expect(indexPage.backgroundStyle()).to.equal('obsidian');
      })
  );

  it('should display the message of the day', () =>
    indexPage.visit()
      .then(() => {
        expect(indexPage.messageOfTheDay()).to.equal('A Minecraft Server');
      })
  );

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

  [
    { name: 'advancement-minecraft-story-root', link: 'minecraft-story', content: ['minecraft', 'story', 'root'] },
    { name: 'advancement-minecraft-story-mine_stone', link: 'minecraft-story', content: ['minecraft', 'story', 'mine_stone'] }
  ]
    .forEach((adv) => {
      it(`should display the advancement ${adv.name}`, () =>
      indexPage.visit()
        .then(() => {
          const advancement = indexPage.advancement(expectedPlayer, adv.name);
          const titleContent =
            content.advancement.title[adv.content[0]][adv.content[1]][adv.content[2]];
          const descriptionContent =
            content.advancement.description[adv.content[0]][adv.content[1]][adv.content[2]];

          expect(advancement.href).to.equal(links[adv.link]);
          expect(advancement.title).to.equal(`${titleContent} : ${descriptionContent}`);
        })
    );
    });

  it('should display the correct score', () =>
    indexPage.visit()
      .then(() => {
        expect(indexPage.score(expectedPlayer)).to.equal('20');
      })
  );

  it('should display the players in the correct order', () =>
    indexPage.visit()
      .then(() => {
        expect(indexPage.playerInPosition(0)).to.equal('MinorSlackmore');
        expect(indexPage.playerInPosition(1)).to.equal('MiniSlackmore');
        expect(indexPage.playerInPosition(2)).to.equal('MajorSlackmore');
      })
  );
});

function getAdvancementDetails() {
  const detailsArray = [];
  const totalAch = Object.keys(points).length;

  for (let i = 0; i < totalAch; i += 1) {
    const rawEntry = Object.keys(points)[i];
    const topic = rawEntry.split(':')[1].split('/')[0];
    const achievement = rawEntry.split(':')[1].split('/')[1];
    const domain = rawEntry.split(':')[0];

    detailsArray.push({ name: `advancement-${domain}-${topic}-${achievement}`, link: `${domain}-${topic}`, content: [`${domain}`, `${topic}`, `${achievement}`] });
  }

  return detailsArray;
}

describe('Index Controller - ALL Advancements', () => {
  const allAdvancementPlayer = 'MinorSlackmore';
  const advDetails = getAdvancementDetails();

  advDetails.forEach((adv) => {
    it(`should display the advancement ${adv.name}`, () =>
        indexPage.visit()
          .then(() => {
            const advancement = indexPage.advancement(allAdvancementPlayer, adv.name);
            const titleContent =
              content.advancement.title[adv.content[0]][adv.content[1]][adv.content[2]];
            const descriptionContent =
              content.advancement.description[adv.content[0]][adv.content[1]][adv.content[2]];

            expect(advancement.href).to.equal(links[adv.link]);
            expect(advancement.title).to.equal(`${titleContent} : ${descriptionContent}`);
          })
      );
  });
});

describe('Index Controller Stats Only - Default', () => {
  const expectedPlayer = 'MajorSlackmore';

  it('should display the correct avatar', () =>
    indexPage.visitStats()
      .then(() => {
        expect(indexPage.avatar(expectedPlayer)).to.equal('https://minotar.net/avatar/MajorSlackmore/100.png');
      })
  );

  it('should display the correct player name', () =>
    indexPage.visitStats()
      .then(() => {
        expect(indexPage.player(expectedPlayer)).to.equal(expectedPlayer);
      })
  );

  it('should display the correct advancements', () =>
    indexPage.visitStats()
      .then(() => {
        expect(indexPage.advancements(expectedPlayer)).to.contain('minecraft-story-root');
        expect(indexPage.advancements(expectedPlayer)).to.contain('minecraft-story-mine_stone');
      })
  );

  it('should display the correct score', () =>
    indexPage.visitStats()
      .then(() => {
        expect(indexPage.score(expectedPlayer)).to.equal('20');
      })
  );

  it('should display the players in the correct order', () =>
    indexPage.visitStats()
      .then(() => {
        expect(indexPage.playerInPosition(0)).to.equal('MinorSlackmore');
        expect(indexPage.playerInPosition(1)).to.equal('MiniSlackmore');
        expect(indexPage.playerInPosition(2)).to.equal('MajorSlackmore');
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
      })
  );
});

describe('Index Controller - NoInternet', () => {
  it('should display the default player name', () =>
    indexPage.visit()
      .then(() => {
        expect(indexPage.player('6eb35f96')).to.equal('6eb35f96');
      })
  );
});

describe('Index Controller - OtherConfig', () => {
  it('should NOT display the server connection details', () =>
    indexPage.visit()
      .then(() => expect(indexPage.serverDetails()).to.be.empty)
  );
});

