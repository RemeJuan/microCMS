var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userService = require('../services/user-service');
var locale = require('../localisation/en_GB');

var userSchema = new Schema({
    firstName: {type: String, required: locale.fnVal },
    lastName:  {type: String, required: locale.snVal},
    email: {type: String, required: locale.emailVal, unique: true },
    password: {type: String, required: locale.pwVal},
	resetPasswordToken: String,
	resetPasswordExpires: Date,
    created: {
        type: Date, 
        default: Date.now
    }
});

/* userSchema.path('email').validate( function(value, next) {
    userService.findUser(value, function(err, user) {
        if(err) {
            return next(false);
        }
        next(!user);
    });
}, locale.emailInvaledVal ); */

var User = mongoose.model('User', userSchema);

module.exports = {
    User: User
};