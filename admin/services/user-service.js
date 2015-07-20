var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user').User;

exports.addUser = function(user, next) {
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if(err) {
            return next(err);
        }
        var newUser = new User({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email.toLowerCase(),
            password: hash
        });

        newUser.save(function(err) {
            if (err) {
                return next(err);
            }
            next(null);
        });
    });
};

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

exports.updateUser = function(user, next) {
    User.update({email: user.email}, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        $inc: {__v:1}
    }, function(err, numberAffected, rawResponse, user) {
       if (err) {
           return next(err);
       }
       next(null, user);
    });
};
