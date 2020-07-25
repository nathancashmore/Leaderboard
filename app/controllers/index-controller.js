const express = require('express');
const i18n = require('i18n');
const ServerHelper = require('../util/server-helper');
const UserHelper = require('../util/user-helper');
const link = require('../assets/json/link');

const router = new express.Router();

const achRegEx = /(.*):(.*)\/(.*)/;
const GAME = 1;
const TYPE = 2;
const NAME = 3;

function getUserData(userHelper, displayLimit) {
  return userHelper.getAllAdvancements().then((users) => {
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
            advancements: user.advancements.map((x) => {
              const achMap = x.match(achRegEx);
              return {
                class: `${achMap[GAME]}-${achMap[TYPE]}-${achMap[NAME]}`,
                // eslint-disable-next-line no-underscore-dangle
                title: i18n.__(`advancement.title.${achMap[GAME]}.${achMap[TYPE]}.${achMap[NAME]}`),
                // eslint-disable-next-line no-underscore-dangle
                description: i18n.__(`advancement.description.${achMap[GAME]}.${achMap[TYPE]}.${achMap[NAME]}`),
                link: link[`${achMap[GAME]}-${achMap[TYPE]}`],
                ref: `advancement-${achMap[GAME]}-${achMap[TYPE]}-${achMap[NAME]}`
              };
            }),
            score: user.score
          };

        playerDataArray.push(Object.assign(playerData));
      });

      return playerDataArray.slice(0, displayLimit);
    });
  });
}

router.get('/', (req, res, next) => {
  const serverHelper = new ServerHelper(req.app.locals.mcServerPath, req.hostname);
  const serverDetails = serverHelper.getDetails();

  const userHelper = new UserHelper(req.app.locals.mcServerPath, serverDetails['level-name']);

  return getUserData(userHelper, req.app.locals.displayLimit).then((userData) => {
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
    res.render('advancements', { players: userData });
  })
    .catch(e => next(e));
});

module.exports = router;
