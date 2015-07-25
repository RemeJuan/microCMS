var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user').User;

exports.findUser = function(email, next) {
    User.findOne({
        email: email.toLowerCase()
    }, function(err, user) {
        next(err, user);
    });
};

exports.getAllUsers = function(users, next) {
    User.find({
        
    }, function(err, users) {
        next(err, users);
    });
};

exports.deleteUser = function(userEmail, next) {
    User.findOneAndRemove({
        email: userEmail.email.toLowerCase()
    }, function(err) {
        next(err);
    });
};

exports.addUpdateUser = function(user, next) {
    if (user.password !== '') {
        bcrypt.hash(user.password, null, null, function(err, hash) {
            if(err) {
                return next(err);
            }
            User.update({email: user.email}, {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: hash,
                $inc: {__v:1}
            },
			{
				upsert:true
			},
			function(err, numberAffected, rawResponse, user) {
				console.log(err);
               if (err) {
                   return next(err);
               }
               next(null, user);
            });
        });
    } else {
        User.update({email: user.email}, {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            $inc: {__v:1}
        }, function(err, numberAffected, rawResponse, user) {
           if (err) {
               return next(err);
           }
           next(null, user);
        });
    }
};
