var Content = require('../models/content').Content;

exports.addEditContent = function(content, next) {
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

exports.createUpdateContent = function(slug, next) {
    Content.findOneAndUpdate({
        slug: slug,
        upsert: true
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
    Content.findOne({
        slug: slug
    }, function(err, content) {
        next(err, content);
    });
};