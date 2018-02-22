const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const graphHelper = require('../config/graphHelper.js');
const passport = require('passport');
let User = require('../models/user');
let userData = undefined;

// Get the home page.
router.get('/', (req, res) => {
  // check if user is authenticated
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  } else {
    //renderSendMail(req, res);
    res.redirect('/mainPage');
  }
});


// Authentication request.
router.get('/login',
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/');
    });
	
router.get('/userdata', (req, res) => {
	if(userData!=undefined){
		res.send(userData);
		console.log("SENDING DATA");
	} else {
		res.send(undefined);
	}
});


// Authentication callback.
// After we have an access token, get user data and load the sendMail page.
router.get('/token',
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }),
    (req, res) => {
      graphHelper.getUserData(req.user.accessToken, (err, user) => {
        if (!err) {
          userData = user.body;
		  module.exports.user = userData;
          User.findOne({firstName:userData.displayName.split(' ')[0]}, (err,user) =>{
			if(err) throw err;
			if(!user){
			  let newUser = new User({
			  firstName:userData.displayName.split(' ')[0],
			  lastName:userData.displayName.split(' ')[1],
			  email:userData.mail,
			  //change when we can get input from the react app
			  staffID:'150007237',

			});
			newUser.save((err) =>{
            if(err){
              console.log(err);
              return;
            }else {
              //add when react app ready
              //req.flash('success','You are now registered and can log in');
			  console.log('p k mi');
            }
          });
      }});
      res.redirect("http://ec2-35-160-181-71.us-west-2.compute.amazonaws.com:3006/index");
    } else {
      console.log(err);
    }
      });
    });

router.get('/mainPage',(req,res) =>{
  if(userData == undefined){
    res.redirect('/login');
  }else{
  res.send('Hi bois, my name is: ' + userData.displayName.split(' ')[0] +  ' ' + userData.id);
  }
});
router.get('/disconnect', (req, res) => {
  req.session.destroy(() => {
    req.logOut();
    res.clearCookie('graphNodeCookie');
    res.status(200);
    res.redirect('/');
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

