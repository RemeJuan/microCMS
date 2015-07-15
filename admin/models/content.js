var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var contentService = require('../services/content-service');

var contentSchema = new Schema({
    title: {type: String, required: 'Please enter a title'},
    slug: {type: String, required: 'Please enter your first name'},
    body:  {type: String, required: 'Please enter your last name'},
    meta: {type: String, required: 'Please enter your email'},
    keywords: {type: String, required: 'Please enter your password'},
    created: {
        type: Date, 
        default: Date.now
    }
});

contentSchema.path('slug').validate( function(value, next) {
    contentService.findContent(value, function(err, content) {
        if(err) {
            return next(false);
        }
        next(!content);
    });
}, 'That slug is already in use');

var Content = mongoose.model('Content', contentSchema);

module.exports = {
    Content: Content
}