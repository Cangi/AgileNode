const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const graphHelper = require('../config/graphHelper.js');
const passport = require('passport');
let User = require('../models/user');
let Project = require('../models/project');
let userData = require('./users');

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


router.post('/createProject',(req,res) =>{
  User.findOne({firstName:userData.user.displayName.split(' ')[0]}, (err,user) =>{
    if(err) throw err;
    if(user){
    let staffID = user.staffID;
  
  let newProject = new Project({
  name:req.body.nameOfTheProject,
  date: new Date(),
  researcherStaffID:staffID,

});
  newProject.save((err) =>{
        if(err){
          console.log(err);
          return;
        }else {
          //fix later
          res.redirect('/projectPage');
          //add when react app ready
          //req.flash('success','You are now registered and can log in');
        }
      });
	    }
  });
});

router.post('/getProject',(req,res) =>{
  Project.findOne({name:req.body.name}, (err,project) =>{
    if(err) throw err;
    if(project){
    res.json(project);
  }
  });
});


module.exports = router;
