const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const graphHelper = require('../config/graphHelper.js');
const passport = require('passport');
const path = require('path');
let User = require('../models/user');
let Project = require('../models/project');
let userData = require('./users');
let filePath = path.join(__dirname, '\\..\\uploads\\');
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

router.get('/getProjects',(req,res) =>{
  User.findOne({firstName:userData.user.displayName.split(' ')[0]}, (err,user) =>{
    if(err) throw err;
    if(user){
  Project.find({researcherStaffID:user.staffID}, (err,projects) =>{
    if(err) throw err;
    if(projects){

    res.json(projects);
  }
  });
}
});
});

router.post('/getProject',(req,res) =>{
  User.findOne({firstName:userData.user.displayName.split(' ')[0]}, (err,user) =>{
    if(err) throw err;
    if(user){
  Project.findOne({researcherStaffID:user.staffID , _id:req.body.idOfTheProject}, (err,project) =>{
    if(err) throw err;
    if(project){
    res.json(project);
  }
  });
}
});
});

router.post('/signProject',(req,res) => {
  User.findOne({firstName:userData.user.displayName.split(' ')[0]}, (err,user) =>{
    if(err) throw err;
    if(user){
		let userDepartment = user.department+'Signed';
      Project.findOneAndUpdate({researcherStaffID:user.staffID},{userDepartment:true}, function (err){
        if(err)
        {
          console.log('Didn\'t update');
        }else{
          console.log('Updated');
        }
  });
}
});
});

//Upload to server functionality
router.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  let uploadedFile = req.files.sampleFile;
  uploadedFile.mv('./uploads/' + req.files.sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);
    res.send('File uploaded!');
  });
});

router.get('/download', function(req, res) {
    const fileloc = './routes/uploads/';
    const fs = require('fs');
    var arr = [];
    fs.readdirSync(fileloc).forEach(file => {
      arr.push(file);
    });
    var json = JSON.stringify(arr);
    res.json(json);
});

router.post('/download2', function(req, res){
    filePath = path.join(__dirname, './uploads/');
    filePath = path.join(filePath , req.body.nameOfFile);
    res.send('File found!');
});

router.get('/download3', function(req, res){
    res.download(filePath);
});

module.exports = router;
