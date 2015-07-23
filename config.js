var config = {};

//DB Details
config.mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/micro-cms';

//Cache
config.coockieMaxAge = 30 * 24 * 3600 * 1000;

module.exports = config;