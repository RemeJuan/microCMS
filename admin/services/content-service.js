var Content = require('../models/content').Content;

exports.createContent = function(content, next) {
    var newContent = new Content({
        title: content.title,
        slug: content.slug,
        body: content.body,
        meta: content.meta,
        keywords: content.keywords
    });

    newContent.save(function(err) {
        if (err) {
            return next(err);
        }
        next(null);
    });
};

exports.updateContent = function(content, next) {
    Content.update({slug: content.slug}, {
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

exports.findContent = function(slug, next) {
    Content.findOne({
        slug: slug
    }, function(err, content) {
        next(err, content);
    });
};

exports.getAllContent = function(content, next) {
    Content.find({
        
    }, function(err, content) {
        next(err, content);
    });
};

exports.fetchContentItem = function(slug, next) {
    Content.find({
        slug: slug
    }, function(err, content) {
        console.log(content);
        next(err, content);
    });
};