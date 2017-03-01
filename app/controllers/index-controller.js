const express = require('express');
const logger = require('winston');
const ServerHelper = require('../util/server-helper');
const UserHelper = require('../util/user-helper');

const router = new express.Router();

router.get('/', (req, res) => {
  const serverHelper = new ServerHelper(req.app.locals.mcServerPath);
  const userHelper = new UserHelper(req.app.locals.mcServerPath);

  const serverDetails = serverHelper.getDetails();

  userHelper.getDetails().then((users) => {
    const achievementsPromises = [];

    users.forEach((user) => {
      achievementsPromises.push(
        userHelper.getAchievements(user.uuid)
      );
    });

    Promise.all(achievementsPromises).then((allAchievements) => {
      const playerDataArray = [];

      users.forEach((user, index) => {
        const playerAchievements = allAchievements[index];

        const playerData =
          {
            name: user.name,
            achievements: playerAchievements.achievements.map(x => ({ class: x })),
            score: playerAchievements.score
          };

        playerDataArray.push(Object.assign(playerData));
      });

      const pageData = {
        serverDetails: `${serverDetails.connecturl}`,
        players: playerDataArray,
        waitingForPlayers: playerDataArray.length === 0
      };

      res.render('index', pageData);
    }).catch(e => logger.log('error', e));
  }).catch(e => logger.log('error', e));
});

module.exports = router;
