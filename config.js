var config = {};

//DB Details
config.mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/micro-cms';

//Site details
config.siteName = 'Reme Le Hane';

//Cache
config.coockieMaxAge = 30 * 24 * 3600 * 1000;

//Email
config.contactMail = 'info@remelehane.me';
config.contactName = 'Reme Le Hane';
config.contactSubject = 'Website Query';

module.exports = config;