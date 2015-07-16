var express = require('express');
var router = express.Router();
var config = require('../../config');
var contentService = require('../services/content-service');
var restrict = require('../auth/restrict');

var app = express();

router.get('/', restrict, function(req, res){
  contentService.fetchContent(req.body, function(err, content) {
    console.log(content);
    return res.render('content', {
      title: 'Content',
      listView: true,
      content: content
    }); 
  });
});

router.get('/edit', restrict, function(req, res){
  return res.render('content', {
    title: 'Edit Content',
    editView: true
  }); 
});

router.get('/create', restrict, function(req, res){
  return res.render('content', {
    title: 'Create Content',
    editView: true
  }); 
});

router.post('/create', function(req, res, next) {
  contentService.addEditContent(req.body, function(err) {
    if (err) {
      var vm = {
        title: 'Create Content',
        input: req.body,
        error: err,
        editView: true
      };
      return res.render('content', vm);
    }

    res.redirect('/admin/content');

  });
});

module.exports = router;