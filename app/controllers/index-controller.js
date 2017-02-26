const express = require('express');

const router = new express.Router();

router.get('/', (req, res) => {
  const pageData = {
    serverDetails: 'localhost:25566',
    players: [
      { name: 'MajorSlackmore', achievements: 'overpowered', score: 100 }
    ]
  };

  res.render('index', pageData);
});

module.exports = router;
