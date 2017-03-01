const express = require('express');
const request = require('request-promise-native');
const logger = require('winston');
const ServerHelper = require('../util/server-helper');

const router = new express.Router();


router.get('/', (req, res) => {
  const serverHelper = new ServerHelper(req.app.locals.mcServerPath);
  const serverDetails = serverHelper.getDetails();

  request(`http://localhost:${req.app.locals.settings.port}/user/details`).then((userJson) => {
    const users = JSON.parse(userJson);
    const achievementsPromises = [];

    users.forEach((user) => {
      achievementsPromises.push(
        request(`http://localhost:${req.app.locals.settings.port}/user/${user.uuid}/achievements`)
      );
    });

    Promise.all(achievementsPromises).then((achievementsJson) => {
      const playerDataArray = [];

      users.forEach((user, index) => {
        const achievements = JSON.parse(achievementsJson[index]);

        const playerData =
          {
            name: user.name,
            achievements: achievements.achievements.map(x => ({ class: x })),
            score: achievements.score
          };

        playerDataArray.push(Object.assign(playerData));
      });

      const pageData = {
        serverDetails: `${serverDetails.connecturl}`,
        players: playerDataArray
      };

      res.render('index', pageData);
    }).catch(e => logger.log('error', e));
  }).catch(e => logger.log('error', e));
});

module.exports = router;
