const express = require('express');
const logger = require('winston');
const phantomjs = require('phantomjs-prebuilt');
const path = require('path');

const router = new express.Router();

router.get('/', (req, res) => {
  const script = path.join(__dirname, '../middleware/exportLeaderboardAsImage.js');
  const url = `http://localhost:${req.app.get('port')}/leaderboard`;
  const filename = `${req.app.locals.exportPath}/leaderboard.png`;

  const program = phantomjs.exec(script, url, filename);

  program.stdout.pipe(process.stdout);
  program.stderr.pipe(process.stderr);

  program.on('exit', (code) => {
    if (code === 0) {
      logger.log('info', `Success - file written to ${filename}`);
    } else {
      logger.log('error', `Error when attempting to output file : ${code}`);
    }
  });

  setTimeout(() => {
    logger.log('info', 'Sending file');
    res.download(filename);
  }, 4000);
});

module.exports = router;
