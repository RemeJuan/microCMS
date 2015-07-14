var express = require('express');
var router = express.Router();
var config = require('../../config');
var restrict = require('../auth/restrict');

var app = express();

router.get('/', restrict, function(req, res){
  return res.render('content', {
    title: 'Content',
    listView: true
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

module.exports = router;