const express = require('express');
const jsonFile = require('jsonfile-promised');
const logger = require('winston');

const router = new express.Router();

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
    res.json(Object.keys(result)
      .filter(x => x.indexOf('achievement') === 0)
      .map(y => y.substring('achievement.'.length))
    );
  })
    .catch(e => logger.log('error', e));
});

module.exports = router;
