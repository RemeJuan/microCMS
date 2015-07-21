var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var adminService = require('../services/admin-service');
var locale = require('../localisation/en_GB');

var adminSchema = new Schema({
    title: {type: String, required: locale.conTitVal},
    slug: {type: String, required: locale.conSlugVal},
    body:  {type: String, required: locale.conBodyVal},
    meta: {type: String},
    keywords: {type: String},
    created: {
        type: Date, 
        default: Date.now
    },
    lastmodified: {
        type: Date, 
        default: Date.now
    }
});

// adminSchema.path('slug').validate( function(value, next) {
//     contentService.findContent(value, function(err, content) {
//         if(err) {
//             return next(false);
//         }
//         next(!content);
//     });
// }, locale.slugInUseError);

var Admin = mongoose.model('Admin', adminSchema);

module.exports = {
    Admin: Admin
}