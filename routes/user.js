var express = require('express');
var router = express.Router();
var studentHelpers = require('../helpers/student-helpers')
var signupHelpers = require('../helpers/signup-helpers')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user/user', { admin:false});
});
router.get('/timetable', (req, res) => {
  studentHelpers.getAllTimeTable().then((timetable) => {
    res.render('user/timetable', { timetable })
  })
})
router.get('/view-student', (req, res) => {
  res.render('admin/view-student')
})

router.get('/add-student', (req, res) => {
  res.render('admin/add-student')
})
router.post('/add-student', (req, res) => {
  console.log(req.body);
  signupHelpers.addStudent(req.body).then((response) => {
    res.render('admin/view-student')
  })

})
module.exports = router;
