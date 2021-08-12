var express = require('express');
var router = express.Router();
var studentHelpers = require('../helpers/student-helpers')
/* GET users listing. */
router.get('/', function(req, res, next) {
res.render('admin/admin', { admin: true });
});
// Time Table Methods
router.get("/view-time-table", (req, res) => {
  studentHelpers.getAllTimeTable().then((timetable) => {
    res.render('admin/view-time-table', { admin:true, timetable })
    console.log(timetable);
  })
  
})
router.get('/add-time-table', (req, res) => {
  res.render('admin/add-time-table', { admin: true})
})
router.post('/add-time-table', (req, res) => {
  console.log(req.body);
  studentHelpers.addTimeTable(req.body, (result) => {
    res.render('admin/view-time-table', {admin: true})
  })
})
router.get('/delete-day/:id', (req, res) => {
  let tableId = req.params.id
  studentHelpers.deleteDay(tableId).then((response) => {
    res.render('admin/view-time-table')
  })
})

router.get('/edit-day/:id', async(req, res) => {
  let timeTable = await studentHelpers.getTimeTable(req.params.id)
  console.log(timeTable);
  res.render('admin/edit-day', {timeTable}) 
})
router.post('/edit-day/:id', (req, res) => {
  studentHelpers.updateTimeTable(req.params.id, req.body).then(() => {
    console.log(req.body);
    res.redirect('/admin/view-time-table')
  })
})
module.exports = router;
