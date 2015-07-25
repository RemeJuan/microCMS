var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var contentService = require('../services/content-service');
var locale = require('../localisation/en_GB');

var contentSchema = new Schema({
    title: {type: String, required: locale.conTitVal},
    slug: {type: String, required: locale.conSlugVal},
    body:  {type: String, required: locale.conBodyVal},
    meta: {type: String},
    keywords: {type: String},
    author: {type: String},
    modifiedBy: {type: String},
    created: {
        type: Date, 
        default: Date.now
    },
    lastmodified: {
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
}, locale.slugInUseError);

var Content = mongoose.model('Content', contentSchema);

module.exports = {
    Content: Content
}