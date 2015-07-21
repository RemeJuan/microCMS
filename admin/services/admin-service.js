var Admin = require('../models/admin').Admin;

exports.updateContent = function(content, next) {
    Admin.update({slug: content.slug}, {
        title: content.title,
        body: content.body,
        meta: content.meta,
        keywords: content.keywords,
        $inc: {__v:1}
    }, function(err, numberAffected, rawResponse, content) {
       if (err) {
           return next(err);
       }
       next(null, content);
    });
};

exports.getAllContent = function(content, next) {
    Content.find({
        
    }, function(err, content) {
        next(err, content);
    });
};