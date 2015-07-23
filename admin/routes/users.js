var express = require('express');
var router = express.Router();
var config = require('../../config');
var userService = require('../services/user-service');
var restrict = require('../auth/restrict');
var locale = require('../localisation/en_GB');
var gravatar = require('gravatar');

var app = express();

// User Management
router.get('/', restrict, function(req, res){
  userService.getAllUsers(req.body, function(err, users) {
    return res.render('admin', {
      usersAdmin: true,
      isSiteAdmin: true,
      users: users,
      lang: locale
    });
  });
});

//Create
router.post('/create', function(req, res, next) {
  userService.addUpdateUser(req.body, function(err) {
    if (err) {
		return res.send('Error');
	}
    return res.send('Success');
  });
});

router.post('/delete', function(req, res, next) {
  userService.deleteUser(req.body, function(err) {
    if (err) {
		return res.send('Error');
	}
    return res.send('Success');
  });
});

module.exports = router;