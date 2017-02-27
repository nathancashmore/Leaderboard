const express = require('express');
const jsonFile = require('jsonfile-promised');
const logger = require('winston');

const points = require('../assets/json/points.json');

const router = new express.Router();

function filterAchievements(stats) {
  return Object.keys(stats)
      .filter(x => x.indexOf('achievement') === 0)
      .map(y => y.substring('achievement.'.length));
}

function calcScore(achievementList) {
  return achievementList
    .map(x => points[`achievement.${x}`])
    .reduce((prev, curr) => prev + curr);
}

router.get('/details', (req, res) => {
  const userDataFile = `${req.app.locals.mcServerPath}usercache.json`;

  return jsonFile.readFile(userDataFile).then((result) => {
    res.json(result.map(entry => ({ uuid: entry.uuid, name: entry.name })));
  });
});

router.get('/:userId/achievements', (req, res) => {
  const statsDataFile =
    `${req.app.locals.mcServerPath}world/stats/${req.params.userId}.json`;

  return jsonFile.readFile(statsDataFile).then((result) => {
    const achievements = filterAchievements(result);
    const score = calcScore(achievements);

    res.json(Object.assign({ achievements, score }));
  })
    .catch(e => logger.log('error', e));
});

module.exports = router;
