var gzippo = require('gzippo');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var morgan = require('morgan');
var http = require('http');
var useragent = require('express-useragent');
var mandrill = require('node-mandrill')(process.env.MANDRILL_API);

var mongoose = require('mongoose');
var passport = require('passport');
var expressSession = require('express-session');
var flash = require('connect-flash');
var connectMongo = require('connect-mongo');

var config = require('./config');
var routes = require('./routes/api');
var admin = require('./routes/admin');
var sendmail = require('./routes/sendmail');

var passportConfig = require('./auth/passport-config');
var restrict = require('./auth/restrict');

passportConfig();

mongoose.connect(config.mongoUri);

var app = express();

app.use(require('prerender-node').set('prerenderToken', process.env.PRERENDER_TOKEN));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(useragent.express());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Cache-Control', 'public, max-age=31557600');
  next();
});

// View engine setup
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/admin/views');
app.use('/admin', express.static('admin'));

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));

var MongoStore = connectMongo(expressSession);

app.use(expressSession(
  {
    secret: 'getting hungry',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
  }
));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/admin', admin);
app.use('/sendmail', sendmail);

//Handled by angular front-end
app.use(function(req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

var server = http.createServer(app);
server.listen(process.env.PORT || 5000, function() {
    console.log('Express started on port 5000');
});