const jsonFile = require('jsonfile-promised');
const logger = require('winston');

const points = require('../assets/json/points.json');

module.exports = class UserHelper {

  constructor(serverPath) {
    this.serverPath = serverPath;
  }

  static filterAchievements(stats) {
    return Object.keys(stats)
      .filter(x => x.indexOf('achievement') === 0)
      .map(y => y.substring('achievement.'.length));
  }

  static calcScore(achievementList) {
    return achievementList
      .map(x => points[`achievement.${x}`])
      .reduce((prev, curr) => prev + curr);
  }

  getDetails() {
    const userDataFile = `${this.serverPath}usercache.json`;

    return jsonFile.readFile(userDataFile).then(result =>
      result.map(entry => ({ uuid: entry.uuid, name: entry.name })))
      .catch(e => logger.log('error', e));
  }

  getName(userId) {
    return this.getDetails().then(details => {
      const user = details.filter(user => user.uuid === userId)[0]
      return user ? user.name : userId.split('-')[0];
    });
  }

  getAchievements(userId) {
    const statsDataFile =
      `${this.serverPath}world/stats/${userId}.json`;

    return jsonFile.readFile(statsDataFile).then((result) => {
      const achievements = UserHelper.filterAchievements(result);
      const score = UserHelper.calcScore(achievements);

      return Object.assign({ achievements, score });
    })
      .catch(e => logger.log('error', e));
  }
};
