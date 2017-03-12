const express = require('express');
const ServerHelper = require('../util/server-helper');
const UserHelper = require('../util/user-helper');

const router = new express.Router();

function getUserData(userHelper) {
  return userHelper.getAllAchievements().then((users) => {
    const userNamePromises = [];

    users.forEach((user) => {
      userNamePromises.push(
        userHelper.getName(user.userId)
      );
    });

    return Promise.all(userNamePromises).then((allNames) => {
      const playerDataArray = [];

      users.forEach((user, index) => {
        const playerName = allNames[index];

        const playerData =
          {
            name: playerName === 'UNKNOWN' ? user.userId.split('-')[0] : playerName,
            achievements: user.achievements.map(x => ({ class: x })),
            score: user.score
          };

        playerDataArray.push(Object.assign(playerData));
      });
      return playerDataArray;
    });
  });
}

router.get('/', (req, res, next) => {
  const serverHelper = new ServerHelper(req.app.locals.mcServerPath, req.hostname);
  const serverDetails = serverHelper.getDetails();

  const userHelper = new UserHelper(req.app.locals.mcServerPath, serverDetails['level-name']);

  return getUserData(userHelper).then((userData) => {
    res.render('index', Object.assign(
      { players: userData },
      { serverDetails },
      { waitingForPlayers: userData.length === 0 }));
  })
    .catch(e => next(e));
});

router.get('/stats', (req, res, next) => {
  const serverHelper = new ServerHelper(req.app.locals.mcServerPath, req.hostname);
  const serverDetails = serverHelper.getDetails();

  const userHelper = new UserHelper(req.app.locals.mcServerPath, serverDetails['level-name']);

  return getUserData(userHelper).then((userData) => {
    res.render('achievements', { players: userData });
  })
    .catch(e => next(e));
});

module.exports = router;
