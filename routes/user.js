var express = require('express');
var router = express.Router();
var studentHelpers = require('../helpers/student-helpers')
var signupHelpers = require('../helpers/signup-helpers')
const verifyLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};
/* GET home page. */
router.get('/', function(req, res, next) {
  var student = req.session.student
  console.log(student);
  res.render('user/user', { admin:false, student});
  
});

router.get('/timetable', verifyLogin, (req, res) => {
  studentHelpers.getAllTimeTable().then((timetable) => {
    var student = req.session.student
    res.render('user/timetable', { timetable, student })
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
  res.render("admin/login")
})

router.post('/login', (req, res) => {
  signupHelpers.studentsLogin(req.body).then((response) => {
    if(response.status){
      req.session.loggedIn = true
      req.session.student = response.student
      res.redirect("/")
    } else {
      res.redirect('/login')
    }
  })
})
router.get("/logout", (req, res) => {
  req.session.destroy()
  res.redirect("/")
})

router.get('/attendence', verifyLogin, (req, res) => {
  studentHelpers.getAllAttendence().then((attendence) => {
    var student = req.session.student
    res.render('user/attendence', {student})
  })
  
})

router.post('/attendence', (req, res) => {
  console.log(req.body);
  studentHelpers.addAttendence(req.body).then((response) => {
    res.redirect('/')
  })
    
  
})


module.exports = router;
