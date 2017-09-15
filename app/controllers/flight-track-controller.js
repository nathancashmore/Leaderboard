const express = require('express');

const ServerHelper = require('../util/server-helper');

const router = new express.Router();

router.get('/:course', (req, res) => {
  const course = req.params.course;
  const serverHelper = new ServerHelper(req.app.locals.mcServerPath, req.hostname);
  let courseTimes = [];

  serverHelper.getFlightTrackRecords()
    .then((records) => {
      if (records.length) {
        const courseRecord = records.find(cr => cr.course === course);

        if (courseRecord) {
          courseTimes = courseRecord.courseTimeList;
        }
      }
      res.render('flight-track', { course, times: courseTimes });
    });
});

module.exports = router;
