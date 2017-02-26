const express = require('express');
const request = require('request-promise-native');
const logger = require('winston');

const router = new express.Router();

router.get('/', (req, res) => {
  request(`http://localhost:${req.app.locals.settings.port}/server/details`).then((result) => {
    const serverDetails = JSON.parse(result);

    const pageData = {
      serverDetails: `${serverDetails.connecturl}`,
      players: [
        { name: 'MajorSlackmore', achievements: 'overpowered', score: 100 }
      ]
    };

    res.render('index', pageData);
  }).catch(e => logger.log('error', e));
});

module.exports = router;
