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
    console.log(users);
    return res.render('admin', {
      usersAdmin: true,
      isSiteAdmin: true,
      users: users,
      lang: locale
    });
  });
});

//Create
router.get('/create', function(req, res){
  res.render('signup', {
    title: config.siteName,
    lang: locale
  })
});

router.post('/create', function(req, res, next) {
  userService.addUser(req.body, function(err) {
    if (err) {
      var vm = {
        title: 'Create an account',
        input: req.body,
        error: err,
        lang: locale
      };
      delete vm.input.password;
      return res.render('signup', vm);
    }
    req.login(req.body, function(err) {
      res.redirect('/admin');
    });
  });
});

module.exports = router;