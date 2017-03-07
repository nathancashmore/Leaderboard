const express = require('express');
const ServerHelper = require('../util/server-helper');
const UserHelper = require('../util/user-helper');

const router = new express.Router();

router.get('/', (req, res, next) => {
  const serverHelper = new ServerHelper(req.app.locals.mcServerPath, req.hostname);
  const userHelper = new UserHelper(req.app.locals.mcServerPath);

  const serverDetails = serverHelper.getDetails();

  userHelper.getAllAchievements().then((users) => {
    const userNamePromises = [];

    users.forEach((user) => {
      userNamePromises.push(
        userHelper.getName(user.userId)
      );
    });

    Promise.all(userNamePromises).then((allNames) => {
      const playerDataArray = [];

      users.forEach((user, index) => {
        const playerName = allNames[index];

        const playerData =
          {
            name: playerName,
            achievements: user.achievements.map(x => ({ class: x })),
            score: user.score
          };

        playerDataArray.push(Object.assign(playerData));
      });

      const pageData = {
        serverDetails: `${serverDetails.connecturl}`,
        players: playerDataArray,
        waitingForPlayers: playerDataArray.length === 0
      };

      res.render('index', pageData);
    }).catch(e => next(e));
  }).catch(e => next(e));
});

module.exports = router;
