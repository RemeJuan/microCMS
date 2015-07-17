var express = require('express');
var router = express.Router();
var config = require('../../config');
var contentService = require('../services/user-service');
var restrict = require('../auth/restrict');
var locale = require('../localisation/en_GB');

var app = express();

router.get('/', restrict, function(req, res){
    return res.render('profile', {
      listView: true,
      content: req.user,
      lang: locale
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