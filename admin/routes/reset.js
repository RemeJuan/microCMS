var express = require('express');
var router = express.Router();
var config = require('../../config');
var userService = require('../services/user-service');
var User = require('../models/user').User;
var locale = require('../localisation/en_GB');
var async = require('async');
var bcrypt = require('bcrypt-nodejs');

router.get('/', function(req, res){
		return res.render('reset', {
			lang: locale,
			user: req.user
		});
});
// Password Reset
router.get('/:token', function(req, res) {
	User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: {
			$gt: Date.now()
		}
	}, function(err, user) {
		console.log(user);
		if (!user) {
			return res.render('forgot', {
				lang: locale,
				message: 'Password token is invalid or expired'
			});
		}
		return res.render('reset', {
			lang: locale,
			user: req.user
		});
	});
});

router.post('/:token', function(req, res) {
	async.waterfall([
		function(done) {
			User.findOne({
				resetPasswordToken: req.params.token,
				resetPasswordExpires: {
					$gt: Date.now()
				}
			}, function(err, user) {
				if (!user) {
					return res.render('forgot', {
						lang: locale,
						message: 'Password token is invalid or expired'
					});
				}

				bcrypt.hash(req.body.password, null, null, function(err, hash) {
					if (err) {
						return next(err);
					}
						user.password = hash;
						user.resetPasswordToken = undefined;
						user.resetPasswordExpires = undefined;
					
					user.save(function(err) {
						if(err) {
							return res.render('forgot', {
								lang: locale,
								message: 'Password not updated'
							});
						}
						
						req.logIn(user, function(err) {
							if (err) {
								return next(err);
							}
							return res.redirect('/admin');
						});
						
					});
				});
			});
		}
	]);
});

module.exports = router;