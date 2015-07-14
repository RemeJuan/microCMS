var express = require('express');
var router = express.Router();
// var MongoClient = require('mongodb').MongoClient;

var config = require('../../config');

var app = express();

//Mongo api 
app.use('/api', function(req, res){

  // MongoClient.connect(config.mongodb, function(err, db) {
  //     if(err) throw err;

  //     //Setting the query params as a variable.
  //     // var query = { type:"footerIcon"};
  //     var urlQuery = req.query;
  //     var collection = urlQuery.collection;
  //     var type = urlQuery.filter;

  //     var query = {'type': type};
  //     var projection = {'_id': 0};

  //     //acces db collection, run a search and put results into an array
  //     db.collection(collection).find(query, projection).toArray(function(err, docs) {
  //         if(err) throw err;          
  //         res.send(docs);
  //         console.log(docs);
  //         db.close();
  //     });
  // });

});

module.exports = router;