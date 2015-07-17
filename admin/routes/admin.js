var express = require('express');
var router = express.Router();
var config = require('../../config');
var passport = require('passport');
var userService = require('../services/user-service');
var restrict = require('../auth/restrict');
var locale = require('../localisation/en_GB');

var app = express();

router.get('/', function(req, res){
  if (req.user) {
    userName = req.user.firstName + ' ' + req.user.lastName;
    return res.render('index', {
      title: config.siteName,
      username: userName,
      lang: locale
    }); 
  };

  res.redirect('/admin/login');

});

router.get('/login', function(req, res){
  res.render('login', {
    title: config.siteName,
    error: req.flash('error'),
    lang: locale
  });
});

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

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/admin/login'); }

    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/admin');
    });
  })(req, res, next);
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  req.logout();
  res.redirect('/admin/login');
});

module.exports = router;