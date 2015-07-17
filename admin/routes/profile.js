var express = require('express');
var router = express.Router();
var config = require('../../config');
var userService = require('../services/user-service');
var restrict = require('../auth/restrict');
var locale = require('../localisation/en_GB');
var gravatar = require('gravatar');

var app = express();

router.get('/', restrict, function(req, res){
    return res.render('profile', {
      content: req.user,
      gravatar: gravatar.url(req.user.email, {s: 200}),
      lang: locale,
      isProfile: true
    }); 
});

router.post('/', restrict, function(req, res) {
  userService.updateUser(req.body, function(err, user) {
    console.log('body', req.body);
    if (err) {
      return res.render('profile', {
        content: req.body,
        lang: locale,
        message: locale.updateUserErr,
        messageClass: locale.classError,
      isProfile: true
      });
    }

    return res.render('profile', {
      content: req.body,
      lang: locale,
      message: locale.updateUserSuc,
      messageClass: locale.classSuccess,
      isProfile: true
    });
  });
});

// router.get('/create', restrict, function(req, res){
//   return res.render('content', {
//     title: locale.createContent,
//     editView: true,
//     lang: locale
//   }); 
// });

// router.post('/create', function(req, res, next) {
//   contentService.createContent(req.body, function(err) {
//     if (err) {
//       var vm = {
//         title: locale.createContent,
//         content: req.body,
//         message: locale.slugError,
//         messageClass: locale.classError,
//         editView: true,
//         lang: locale
//       };
//       return res.render('content', vm);
//     }

//     res.redirect('/admin/content');

//   });
// });

module.exports = router;