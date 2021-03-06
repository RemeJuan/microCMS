var express = require('express');
var router = express.Router();
var config = require('../../config');
var passport = require('passport');
var userService = require('../services/user-service');
var adminService = require('../services/admin-service');
var restrict = require('../auth/restrict');
var locale = require('../localisation/en_GB');

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
		if (err) {
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

module.exports = router;