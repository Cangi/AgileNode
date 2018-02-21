const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes/users');
const routeCalls = require('./routes/api');
const passport = require('passport');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
const uuid = require('uuid');
const config = require('./config/config.js');
const configDatabase = require('./config/database.js');
var port = 3001;

mongoose.connect(configDatabase.database);
let db = mongoose.connection;

// Check connection
db.once('open', () =>{
  console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', (err) =>{
  console.log(err);
});

const app = express();

app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});

const fUpload = require('express-fileupload');
app.use(fUpload());
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
// configuration for session middleware
app.use(session({
  secret: 'theBooleans-SECRET',
  name: 'graphNodeCookie',
  resave: false,
  saveUninitialized: false,
  //cookie: {secure: true} // For development only
}));
//Add static paths when react is working
//app.use(express.static(path.join(__dirname, 'public')));
//configuration for passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/api',routeCalls)

//Upload to server functionality
app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  let uploadedFile = req.files.sampleFile;
  uploadedFile.mv('./uploads/' + req.files.sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);
    res.send('File uploaded!');
  });
});

//Returns list of files in uploads folder in json format --- Tests
app.get('/download', function(req, res) {
	const fileloc = './uploads/';
	const fs = require('fs');
	var arr = [];
	fs.readdirSync(fileloc).forEach(file => {
	  arr.push(file);
	});
	var json = JSON.stringify(arr);
	res.json(json);
});

//Downloads file named "black_man.png" from uploads folder --- Tests
app.get('/download2', function(req, res){
  var file = __dirname + '/uploads/black_man.png';
  res.download(file); // Set disposition and send it.
});

app.listen(port, () => {
	console.log(`running port ${port}`);
});
