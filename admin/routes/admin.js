var express = require('express');
var router = express.Router();
var config = require('../../config');
var passport = require('passport');
var userService = require('../services/user-service');
var adminService = require('../services/admin-service');
var restrict = require('../auth/restrict');
var locale = require('../localisation/en_GB');
var mandrill = require('node-mandrill')(process.env.MANDRILL_API);
var User = require('../models/user').User;
var async = require('async');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');

var app = express();

// Dashboard
router.get('/', function(req, res) {
	if (req.user) {
		userName = req.user.firstName + ' ' + req.user.lastName;
		return res.render('index', {
			title: config.siteName,
			username: userName,
			lang: locale,
			isDashboard: true
		});
	}
	res.redirect('/admin/login');
});

// Login
router.get('/login', function(req, res) {
	res.render('login', {
		title: config.siteName,
		lang: locale
	});
});

router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		console.log('here');
		if (err) {
			console.log(err);
			return next(err);
		}
		if (!user) {
			return res.redirect('/admin/login');
		}

		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}
			return res.redirect('/admin');
		});
	})(req, res, next);
});

// Site admin
router.get('/site', function(req, res) {
	adminService.getAdminData(req.body, function(err, content) {
		return res.render('admin', {
			siteAdmin: true,
			content: content[0],
			lang: locale,
			isSiteAdmin: true
		});
	});
});

router.post('/site', function(req, res) {
	adminService.updateAdmin(req.body, function(err, content) {
		if (err) {
			return res.render('admin', {
				siteAdmin: true,
				content: req.body,
				message: locale.contentUpdateError,
				messageClass: locale.classError,
				lang: locale,
				isSiteAdmin: true
			});
		}

		return res.render('admin', {
			siteAdmin: true,
			content: req.body,
			message: locale.contentUpdateSuccess,
			messageClass: locale.classSuccess,
			lang: locale,
			isSiteAdmin: true
		});
	});
});

// Logout
router.get('/logout', function(req, res, next) {
	req.session.destroy();
	req.logout();
	res.redirect('/admin/login');
});

// Forgot Password
router.get('/forgot', function(req, res) {
	res.render('forgot', {
		lang: locale
	});
});

router.post('/forgot', function(req, res, next) {
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
					console.log(err, token, user);
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
					console.log(JSON.stringify(err));
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

// Password Reset
router.get('/reset/:token', function(req, res) {
	console.log(req.params.token);
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

router.post('/reset/:token', function(req, res) {
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