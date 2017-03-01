const express = require('express');
const ServerHelper = require('../util/server-helper');

const router = new express.Router();

router.get('/details', (req, res) => {
  const serverHelper = new ServerHelper(req.app.locals.mcServerPath);
  res.json(serverHelper.getDetails());
});

module.exports = router;
