const express = require('express');
const properties = require('properties');
const os = require('os');
const logger = require('winston');

const router = new express.Router();

router.get('/server-details', (req, res) => {
  const propsFile = `${req.app.locals.mcServerPath}/server.properties`;

  properties.parse(propsFile, { path: true }, (error, obj) => {
    if (error) {
      logger.log('error', error);
    }
    const ip = os.hostname();
    const connecturl = `${ip}:${obj['server-port']}`;

    res.json(Object.assign(obj, { ip, connecturl }));
  });
});

module.exports = router;
