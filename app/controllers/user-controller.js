const express = require('express');
const jsonFile = require('jsonfile');
const logger = require('winston');

const router = new express.Router();

router.get('/details', (req, res) => {
  const userDataFile = `${req.app.locals.mcServerPath}usercache.json`;

  jsonFile.readFile(userDataFile, (err, result) => {
    if (err) {
      logger.log('error', err);
      res.json({ error: err });
    }

    res.json(result.map(entry => ({ uuid: entry.uuid, name: entry.name })));
  });
});

module.exports = router;
