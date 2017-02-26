const express = require('express');
const PropertiesReader = require('properties-reader');
const os = require('os');

const router = new express.Router();

router.get('/details', (req, res) => {
  const propsFile = `${req.app.locals.mcServerPath}/server.properties`;

  const props = PropertiesReader(propsFile);
  const ip = os.hostname();
  const connecturl = `${ip}:${props.get('server-port')}`;

  res.json(Object.assign(props.getAllProperties(), { ip, connecturl }));
});

module.exports = router;
