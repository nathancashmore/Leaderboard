const jsonFile = require('jsonfile-promised');
const readfiles = require('node-readfiles');
const logger = require('winston');
const fs = require('fs');
const rp = require('request-promise');
const HTMLParser = require('fast-html-parser');

const points = require('../assets/json/points.json');

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getNameFromExternal"] }] */

module.exports = class UserHelper {

  constructor(serverPath, levelName) {
    this.serverPath = serverPath;
    this.levelName = levelName;
  }

  static filterAdvancements(advancements) {
    return Object.keys(advancements)
      .map(key => Object.assign({ name: key, done: advancements[key].done }))
      .filter(y => y.done === true)
      .filter(x =>
      x.name.includes(':story') ||
      x.name.includes(':adventure') ||
      x.name.includes(':husbandry') ||
      x.name.includes(':nether') ||
      x.name.includes(':end'))
      .map(z => z.name);
  }

  static calcScore(achievementList) {
    if (achievementList.length === 0) {
      return 0;
    }
    return achievementList
        .map(x => points[`${x}`])
        .reduce((prev, curr) => prev + curr);
  }

  getNameFromExternal(userId) {
    logger.log('info', `Attempting to lookup name via https://namemc.com/profile/${userId}`);

    return rp(`https://namemc.com/profile/${userId}`).then((result) => {
      const root = HTMLParser.parse(result);
      const name = root.querySelector('.minecraft-name').text;

      logger.log('info', `${userId} >> ${name}`);

      return name;
    })
      .catch(() => {
        logger.log('info', `Unable to get name externally.. using ${userId} instead.`);
        return 'UNKNOWN';
      });
  }

  getDetails() {
    const userDataFile = `${this.serverPath}/usercache.json`;

    return jsonFile.readFile(userDataFile).then(result =>
      result.map(entry => ({ uuid: entry.uuid, name: entry.name })))
      .catch(e => logger.log('error', e));
  }

  getName(userId) {
    return this.getDetails().then((details) => {
      const userDetail = details.filter(user => user.uuid === userId)[0];
      return userDetail ? userDetail.name : this.getNameFromExternal(userId);
    });
  }

  getAdvancements(userId) {
    const statsDataFile =
      `${this.serverPath}/${this.levelName}/advancements/${userId}.json`;

    return jsonFile.readFile(statsDataFile).then((result) => {
      const advancements = UserHelper.filterAdvancements(result);
      const score = UserHelper.calcScore(advancements);

      return Object.assign({ userId, advancements, score });
    })
      .catch(e => logger.log('error', e));
  }

  getAllAdvancements() {
    const achievementPromiseArray = [];
    const advancementDirectory = `${this.serverPath}/${this.levelName}/advancements/`;

    if (fs.existsSync(advancementDirectory)) {
      return readfiles(advancementDirectory).then((filenameList) => {
        const userIds = filenameList.map(filename => filename.replace('.json', ''));

        userIds.forEach((userId) => {
          achievementPromiseArray.push(this.getAdvancements(userId));
        });

        return Promise.all(achievementPromiseArray).then(result =>
          result.sort((a, b) => b.score - a.score));
      })
        .catch(e => logger.log('error', e));
    }
    return new Promise(resolve => resolve([]));
  }
};
