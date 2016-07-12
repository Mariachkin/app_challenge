var express = require('express');
var users   =

var router = express.Router();

router.get('/',function(req, res) {
  res.send('main web route');
});


router.route('/users')
    .get(function(req, res) {
      res.send('users web route');
    })
    .post(function(req, res) {
      res.send('users web route');
    });



module.exports = router;
