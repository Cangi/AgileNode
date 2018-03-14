const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const graphHelper = require('../config/graphHelper.js');
const passport = require('passport');
let User = require('../models/user');
const front = require('../config/serverConfig');
var userData = undefined;
// Get the home page.
router.get('/', (req, res) => {
  // check if user is authenticated
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  } else {
    //renderSendMail(req, res);
    res.redirect(front.serverFront +'/index');
  }
});


// Authentication request.
router.get('/login',
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/');
    });
router.get('/userdata', (req, res) => {

    res.send(req.session);

});
router.post('/userdata', (req, res) => {

	graphHelper.getUserData(req.body.token, (err, user) => {
        if (!err) {
			res.send(user.body);
		}
		else {

		}
	});
});


// Authentication callback.
// After we have an access token, get user data and load the sendMail page.
router.get('/token',
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }),
    (req, res) => {
      graphHelper.getUserData(req.user.accessToken, (err, user) => {
        if (!err) {
            userData = user.body;
            console.log(req.originalUrl);
		  module.exports.user = userData;
          User.findOne({firstName:userData.displayName.split(' ')[0]}, (err,user) =>{
			if(err) throw err;
			if(!user){
        res.redirect(front.serverFront + '/signup?valid='+req.user.accessToken);
			}else{
        res.redirect(front.serverFront + '/index?valid='+req.user.accessToken);
      }});
    } else {
      console.log(err);
    }
  })});

router.get('/mainPage',(req,res) =>{
  if(userData == undefined){
    res.redirect('/login');
  }else{
  res.send('Hi bois, my name is: ' + userData.displayName.split(' ')[0] +  ' ' + userData.id);
  }
});


const self = this;
router.get('/disconnect', (req, res) => {
	userData=undefined;
  req.session.destroy(() => {
    req.logOut();
    res.clearCookie('graphNodeCookie');
    res.status(200);
	res.redirect(front.serverFront);
  });
});

// helpers
function hasAccessTokenExpired(e) {
  let expired;
  if (!e.innerError) {
    expired = false;
  } else {
    expired = e.forbidden &&
      e.message === 'InvalidAuthenticationToken' &&
      e.response.error.message === 'Access token has expired.';
  }
  return expired;
}

module.exports = router;
