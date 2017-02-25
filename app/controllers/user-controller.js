const express = require('express');
const jsonFile = require('jsonfile-promised');

const router = new express.Router();

router.get('/details', (req, res) => {
  const userDataFile = `${req.app.locals.mcServerPath}usercache.json`;

  return jsonFile.readFile(userDataFile).then((result) => {
    res.json(result.map(entry => ({ uuid: entry.uuid, name: entry.name })));
  });
});

module.exports = router;
