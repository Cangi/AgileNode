const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes/users');
const passport = require('passport');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
const uuid = require('uuid');
const config = require('./config/config.js');
const configDatabase = require('./config/database.js');
var port = 3000;

mongoose.connect(configDatabase.database);
let db = mongoose.connection;

// Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function(err){
  console.log(err);
});

const app = express();

const callback = (iss, sub, profile, accessToken, refreshToken, done) => {
  done(null, {
    profile,
    accessToken,
    refreshToken
  });
};

passport.use(new OIDCStrategy(config.creds, callback));
const users = {};
passport.serializeUser((user, done) => {
  const id = uuid.v4();
  users[id] = user;
  done(null, id);
});
passport.deserializeUser((id, done) => {
  const user = users[id];
  done(null, user);
});
//app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// session middleware configuration
// see https://github.com/expressjs/session
app.use(session({
  secret: '12345QWERTY-SECRET',
  name: 'graphNodeCookie',
  resave: false,
  saveUninitialized: false,
  //cookie: {secure: true} // For development only
}));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());



app.use('/', routes);
/*app.get('/', function(req, res) {
	res.json({message: 'EXPRESS LISTENING'});
});*/

//app.use(router);



app.listen(port, function() {
	console.log(`running port ${port}`);
});
