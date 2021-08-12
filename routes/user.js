var express = require('express');
var router = express.Router();
var studentHelpers = require('../helpers/student-helpers')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user/user', { admin:false});
});
router.get('/timetable', (req, res) => {
  studentHelpers.getAllTimeTable().then((timetable) => {
    res.render('user/timetable', { timetable })
  })
})
module.exports = router;
