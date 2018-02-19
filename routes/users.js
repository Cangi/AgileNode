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
    console.log("HI AUTHENTICATED BEAST U");
    res.redirect('/mainPage');
  }
});


// Authentication request.
router.get('/login',
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }),
    (req, res) => {

      res.redirect('/');
    });


// Authentication callback.
// After we have an access token, get user data and load the sendMail page.
router.get('/token',
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }),
    (req, res) => {
      graphHelper.getUserData(req.user.accessToken, (err, user) => {
        if (!err) {
          userData = user.body;
          User.findOne({staffID:req.body.staffID}, function(err, user){
    if(err) throw err;
    if(user){
      let newUser = new User({
      fistName:userData.displayName.split(' ')[0],
      lastName:userData.displayName.split(' ')[1],
      email:userData.mail,
      staffID:'150007237',

    });
    newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          }else {
            //req.flash('success','You are now registered and can log in');
          }
        });
    }});

          res.redirect('/mainPage');
        } else {
          console.log(err);
        }
      });
      //res.end(req.user.profile.displayName);

      //res.send('We are connected bois');
    });

router.get('/mainPage',function (req,res){
  if(userData == undefined){
    res.redirect('/login');
  }else{
  res.send('Hi bois, my name is: ' + userData.displayName + ' ' + userData.jobTitle + ' ' + userData.id);
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
module.exports = userData;
module.exports = router;
