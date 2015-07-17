var express = require('express');
var router = express.Router();
var config = require('../../config');
var contentService = require('../services/content-service');
var restrict = require('../auth/restrict');
var locale = require('../localisation/en_GB');

var app = express();

router.get('/', restrict, function(req, res){
  contentService.getAllContent(req.body, function(err, content) {
    return res.render('content', {
      title: locale.contentTitle,
      listView: true,
      content: content,
      lang: locale
    }); 
  });
});

router.get('/edit/:slug', restrict, function(req, res){
  contentService.fetchContentItem(req.params.slug, function(err, content) {
    return res.render('content', {
      title: locale.editContent,
      editView: true,
      content: content[0],
      lang: locale
    });
  });
});

router.post('/edit/:slug', restrict, function(req, res){
  contentService.updateContent(req.body, function(err, content) {
    if (err) {
      return res.render('content', {
        title: locale.editContent,
        editView: true,
        content: req.body,
        message: locale.contentUpdateError,
        messageClass: locale.classError,
        lang: locale
      }); 
    }

    return res.render('content', {
      title: locale.editContent,
      editView: true,
      content: req.body,
      message: locale.contentUpdateSuccess,
      messageClass: locale.classSuccess,
      lang: locale
    }); 

  });
});

router.get('/create', restrict, function(req, res){
  return res.render('content', {
    title: locale.createContent,
    editView: true,
    lang: locale
  }); 
});

router.post('/create', function(req, res, next) {
  contentService.createContent(req.body, function(err) {
    if (err) {
      var vm = {
        title: locale.createContent,
        content: req.body,
        message: locale.slugError,
        messageClass: locale.classError,
        editView: true,
        lang: locale
      };
      return res.render('content', vm);
    }

    res.redirect('/admin/content');

  });
});

module.exports = router;