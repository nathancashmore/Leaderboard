const express = require('express');
const logger = require('winston');
const phantomjs = require('phantomjs-prebuilt');
const path = require('path');

const router = new express.Router();

async function downloadFile(url, filename) {
  const script = path.join(__dirname, '../middleware/exportPageAsImage.js');

  return new Promise(((resolve, reject) => {
    const program = phantomjs.exec(script, url, filename);

    program.stdout.pipe(process.stdout);
    program.stderr.pipe(process.stderr);

    program.on('exit', (code) => {
      if (code === 0) {
        logger.log('info', `Success - file written to ${filename}`);
        resolve();
      } else {
        logger.log('error', `Error when attempting to output file : ${code}`);
        reject();
      }
    });
  }));
}

router.get('/', async (req, res) => {
  const url = `http://localhost:${req.app.get('port')}/leaderboard`;
  const filename = `${req.app.locals.exportPath}/leaderboard.png`;

  await downloadFile(url, filename);
  res.download(filename);
});

module.exports = router;
