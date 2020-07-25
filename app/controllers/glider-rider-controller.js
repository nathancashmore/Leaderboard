const express = require('express');
const moment = require('moment');

const ServerHelper = require('../util/server-helper');

const router = new express.Router();

router.get('/:course', (req, res) => {
  const course = req.params.course;
  const isRefresh = req.query.refresh;
  const serverHelper = new ServerHelper(req.app.locals.mcServerPath, req.hostname);
  let courseTimes = [];

  serverHelper.getGliderRiderRecords()
    .then((records) => {
      if (records.length) {
        const courseRecord = records.find(cr => cr.course === course);

        if (courseRecord) {
          courseTimes = courseRecord.courseTimeList
            .map(ct => ({ player: ct.player, time: moment(ct.time).format('mm:ss.SSS') }));
        }
      }

      const times = courseTimes.slice(0, req.app.locals.displayLimit);
      if (isRefresh) {
        res.render('glider-rider-detail', { course, times });
      } else {
        res.render('glider-rider', { course, times });
      }
    });
});

module.exports = router;
