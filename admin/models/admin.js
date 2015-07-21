var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var adminService = require('../services/admin-service');
var locale = require('../localisation/en_GB');
var findOrCreate = require('mongoose-findorcreate');

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

adminSchema.plugin(findOrCreate);
var Admin = mongoose.model('Admin', adminSchema);

module.exports = {
    Admin: Admin
}