const express = require('express');
const UserHelper = require('../util/user-helper');

const router = new express.Router();

router.get('/details', (req, res) => {
  const userHelper = new UserHelper(req.app.locals.mcServerPath);

  userHelper.getDetails().then((result) => {
    res.json(result);
  });
});

router.get('/:userId/achievements', (req, res) => {
  const userHelper = new UserHelper(req.app.locals.mcServerPath);

  userHelper.getAchievements(req.params.userId).then((result) => {
    res.json(result);
  });
});

module.exports = router;
