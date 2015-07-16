var Content = require('../models/content').Content;

exports.createContent = function(content, next) {
    var newContent = new Content({
        title: content.contentTitle,
        slug: content.contentSlug,
        body: content.contentBody,
        meta: content.contentMeta,
        keywords: content.contentKeywords
    });

    newContent.save(function(err) {
        if (err) {
            return next(err);
        }
        next(null);
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