const express = require('express');
const logger = require('winston');
const phantomjs = require('phantomjs-prebuilt');
const path = require('path');

const ServerHelper = require('../util/server-helper');

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
  const serverHelper = new ServerHelper(req.app.locals.mcServerPath, req.hostname);

  let url = `http://localhost:${req.app.get('port')}/leaderboard`;
  let filename = `${req.app.locals.exportPath}/${req.app.get('port')}-leaderboard.png`;

  await downloadFile(url, filename);

  const courseList = await serverHelper.getGliderRiderCourses();

  const promiseList = [];
  courseList.forEach((course) => {
    url = `http://localhost:${req.app.get('port')}/glider-rider/${course}`;
    filename = `${req.app.locals.exportPath}/${req.app.get('port')}-course-${course}.png`;
    promiseList.push(downloadFile(url, filename));
  });

  await Promise.all(promiseList);
  res.status(200).end();
});

router.get('/leaderboard', async (req, res) => {
  const url = `http://localhost:${req.app.get('port')}/leaderboard`;
  const filename = `${req.app.locals.exportPath}/${req.app.get('port')}-leaderboard.png`;

  await downloadFile(url, filename);
  res.download(filename);
});

router.get('/glider-rider/:course', async (req, res) => {
  const course = req.params.course;
  const url = `http://localhost:${req.app.get('port')}/glider-rider/${course}`;
  const filename = `${req.app.locals.exportPath}/${req.app.get('port')}-course-${course}.png`;

  await downloadFile(url, filename);
  res.download(filename);
});

module.exports = router;
