var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/ang');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){

});