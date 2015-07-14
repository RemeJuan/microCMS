var express = require('express');
var router = express.Router();
var mandrill = require('node-mandrill')(process.env.MANDRILL_API);

var config = require('../config');

var app = express();

app.use('/', function(req, res){
  var mailDetails = req.query;

  //send an e-mail to jim rubenstein
  mandrill('/messages/send', {
      message: {
          to: [{email: config.contactMail, name: config.contactName}],
          from_email: mailDetails.email,
          from_name: mailDetails.name,
          subject: config.contactSubject,
          text: mailDetails.message,
          html: mailDetails.message
      }
  }, function(error, response)
  {
      //uh oh, there was an error
      if (error) console.log( JSON.stringify(error) );

      //everything's good, lets see what mandrill said
      else res.sendStatus(200)
  });
});

module.exports = router;