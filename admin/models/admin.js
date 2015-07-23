var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    siteName: {type: String},
    siteEmail: {type: String},
    siteMeta: {type: String},
    siteKeyWords: {type: String},
    keenPID: {type: String},
    keenRK: {type: String},
    keenWK: {type: String},
    lastmodified: {
        type: Date, 
        default: Date.now
    }
});

var Admin = mongoose.model('Admin', adminSchema);

module.exports = {
    Admin: Admin
};