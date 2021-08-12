var express = require('express');
var router = express.Router();
var studentHelpers = require('../helpers/student-helpers')
/* GET users listing. */
router.get('/', function(req, res, next) {
res.render('admin/admin', { admin: true });
});

router.get("/view-time-table", (req, res) => {
  studentHelpers.getAllTimeTable().then((timetable) => {
    res.render('admin/view-time-table', { admin:true, timetable })
  })
  
})
router.get('/add-time-table', (req, res) => {
  res.render('admin/add-time-table', { admin: true})
})
router.post('/add-time-table', (req, res) => {
  console.log(req.body);
  studentHelpers.addTimeTable(req.body, (result) => {
    res.render('admin/add-time-table', {admin: true})
  })
})
module.exports = router;
