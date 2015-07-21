var Admin = require('../models/admin').Admin;

exports.updateAdmin = function(admin, next) {
    Admin.update({}, {
        siteName: admin.siteName,
        siteEmail: admin.siteEmail,
        siteMeta: admin.siteMeta,
        siteKeyWords: admin.siteKeyWords,
        keenPID: admin.keenPID,
        keenRK: admin.keenRK,
        keenWK: admin.keenWK
    },
    {
        upsert: true
    }, function(err, admin, created) {
        console.log(created);
       if (err) {
           return next(err);
       }
       next(null, admin);
    });
};

exports.getAdminData = function(admin, next) {
    Admin.find({
        
    }, function(err, admin) {
        next(err, admin);
    });
};