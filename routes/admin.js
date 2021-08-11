var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
res.render('admin/admin', { admin: true });
});

router.get("/add-time-table", (req, res) => {
  res.render('admin/add-time-table')
})
router.post('/add-time-table', (req, res) => {
  console.log(req.body);
})
module.exports = router;
