var express = require('express');
var router = express.Router();
var config = require('../../config');
var userService = require('../services/user-service');
var User = require('../models/user').User;
var locale = require('../localisation/en_GB');
var async = require('async');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var mandrill = require('node-mandrill')(process.env.MANDRILL_API);

// Forgot Password
router.get('/', function(req, res) {
	res.render('forgot', {
		lang: locale
	});
});

router.post('/', function(req, res, next) {
	async.waterfall([
		function(done) {
			crypto.randomBytes(20, function(err, buf) {
				var token = buf.toString('hex');
				done(err, token);
			});
		},
		function(token, done) {
			User.findOne({
				email: req.body.email
			}, function(err, user) {
				if (!user) {
					return res.render('forgot', {
						lang: locale,
						message: 'A user with that email does not exist'
					});
				}
				
				user.resetPasswordToken = token;
				user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

				user.save(function(err) {
					done(err, token, user);
				});
			});
		},
		function(token, user, done) {
			var mailBody = 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
				'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
				'http://' + req.headers.host + '/admin/reset/' + token + '\n\n' +
				'If you did not request this, please ignore this email and your password will remain unchanged.\n';

			//send an e-mail to jim rubenstein
			mandrill('/messages/send', {
				message: {
					to: [{
						email: user.email,
						name: user.firstName
					}],
					from_email: 'forgot_password@remelehane.me',
					from_name: 'Password reset',
					subject: 'Password Reset',
					text: mailBody
				}
			}, function(err, res) {
				if (err) {
					return res.render('forgot', {
						lang: locale,
						message: 'There was an error sending your mail'
					});
				}
				done(err, 'done');
			});
		}
	], function(err) {
		if (err) return next(err);
		res.render('forgot', {
			lang: locale,
			message: 'Please check your email for your password reset instructions'
		});
	});
});

module.exports = router;