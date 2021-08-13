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
  signupHelpers.getAllStudents().then((students) => {
    res.render('admin/view-student', {students, admin:true})
  })
  
})

router.get('/add-student', (req, res) => {
  res.render('admin/add-student', {admin: true})
})
router.post('/add-student', (req, res) => {
  console.log(req.body);
  signupHelpers.addStudent(req.body).then((response) => {
    res.render('admin/add-student', {admin:true})
  })

})
router.get('/login', (req, res) => {
  res.render('admin/login')
})
router.post('/login', (req, res) => {
  signupHelpers.studentsLogin(req.body).then((response) => {
    if(response.status){
      res.redirect("/")
    } else {
      res.redirect('/login')
    }
  })
})
module.exports = router;
