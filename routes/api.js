const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const graphHelper = require('../config/graphHelper.js');
const passport = require('passport');
const path = require('path');
const front = require('../config/serverConfig');
let User = require('../models/user');
let Project = require('../models/project');
let userData = require('./users');
let filePath = path.join(__dirname, '\\..\\uploads\\');
const fs = require('fs');
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

router.post('/checkUser',(req,res) => {
  User.findOne({firstName:req.body.user.displayName.split(' ')[0]}, (err,user) =>{
    if(err) throw err;
    if(user){
      res.send(true);
	  }else{
      res.send(false);
    }
  });
});

router.post('/getDepartment',(req,res) =>{
  User.findOne({firstName:req.body.user.displayName.split(' ')[0]}, (err,user) =>{
    if(err) throw err;
    if(user){
      res.send(user.department);
	  }else{
      console.log('aaaaaa');
    }
  });
});

router.post('/createProject',(req,res) =>{
  User.findOne({firstName:req.body.user.displayName.split(' ')[0]}, (err,user) =>{
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
              res.redirect('/projectPage');
            }
      });
	  }
  });
});

router.post('/signup',(req,res) =>{
  let newUser = new User({
  firstName:req.body.firstName,
  lastName:req.body.lastName,
  email:req.body.email,
  staffID:req.body.staffID,
  department:req.body.position
  });

  newUser.save((err) =>{
     if(err){
        console.log(err);
        res.send(false);
        return;
      }else {
        console.log('Created');
        res.send(true);
      }
  });
});

router.post('/getProjects',(req,res) =>{
  User.findOne({firstName:req.body.user.displayName.split(' ')[0]}, (err,user) =>{
    if(err) throw err;
    if(user){
      Project.find({researcherStaffID:user.staffID}, (err,projects) =>{
        //if you don't give a staff id then you get all of them
        if(err) throw err;
        if(projects){
          res.json(projects);
        }
      });
    }
  });
});

//should return all projects that have been readied for RIS
router.post('/getRISNewProjects', (req,res) =>{
  User.findOne({firstName:req.body.user.displayName.split(' ')[0]}, (err,user) =>{
    if(err) throw err;
    if(user){
      Project.find({readyForRIS:true, RISSigned:undefined, RISStaff:undefined}, (err,project) =>{
          if(err) throw err;
          if(project){
          res.json(project);
          }
      });
    }
  });
});

router.post('/getProject',(req,res) =>{
  User.findOne({firstName:req.body.user.displayName.split(' ')[0]}, (err,user) =>{
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
  User.findOne({firstName:req.body.user.displayName.split(' ')[0]}, (err,user) =>{
    if(err) throw err;
    if(user){
      if(user.staffID == req.body.signiture){
        //Refactor when we have time
        Project.findOne({researcherStaffID:user.staffID,_id:req.body.idOfTheProject},(err,proj) =>{

        if(user.department=='researcher' && proj.readyForRIS != undefined && proj.RISSigned == true)
        Project.findOneAndUpdate({researcherStaffID:user.staffID,_id:req.body.idOfTheProject},{researcherSigned:true}, function (err){
        });
        if(user.department=='researcher' && proj.readyForRIS == undefined && proj.RISSigned == undefined)
        Project.findOneAndUpdate({researcherStaffID:user.staffID,_id:req.body.idOfTheProject},{readyForRIS:true}, function (err){
        });
        if(user.department=='RIS')
        Project.findOneAndUpdate({researcherStaffID:user.staffID,_id:req.body.idOfTheProject},{RISSigned:true}, function (err){
        });
        if(user.department=='associateDean')
        Project.findOneAndUpdate({researcherStaffID:user.staffID,_id:req.body.idOfTheProject},{associateDeanSigned:true}, function (err){
        });
        if(user.department=='dean')
        Project.findOneAndUpdate({researcherStaffID:user.staffID,_id:req.body.idOfTheProject},{deanSigned:true}, function (err){
        });
        console.log(proj.readyForRIS + ':' + proj.RISSigned + ':' + proj._id);
      });
    }
    }
  });
});

router.post('/addComment',(req,res) =>{
  User.findOne({firstName:req.body.user.split(' ')[0]}, (err,user) =>{
    if(err) throw err;
    if(user){
      console.log(req.body.comment);
        Project.findOneAndUpdate({researcherStaffID:user.staffID,_id:req.body.idOfTheProject},{$push: {comments: {name:req.body.user, date:new Date(),comment:req.body.comment}}}, function (err){
          });
    }
});
});

//Upload to server functionality
router.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
    let uploadedFile = req.files.sampleFile;
	//console.log(uploadedFile.mimetype);
	if(!uploadedFile){
		return res.send('Please select a file to upload.');
	}
	if (uploadedFile.mimetype != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
		return res.send('Wrong file format.');
	}
	else{
		let now = new Date();
		let pathname = './routes/uploads/' + req.body.projectID + '@' + now.getFullYear() + "-"+ (now.getMonth()+1) + "-" + now.getDate() + "_" + now.getHours() + "-" + now.getMinutes() + "-" + now.getSeconds() +'.xlsx';
		uploadedFile.mv(pathname, function(err) {
		//uploadedFile.mv('./routes/uploads/' + req.files.sampleFile.name, function(err) {
		if (err)
		return res.status(500).send(err);
		else{
			Project.findOneAndUpdate({_id:req.body.projectID},{$push: {paths: {path: pathname}}}, function (err){
			});
			return res.send('File uploaded!');
		}
		});
	}
});

//Delete file functionality
router.post('/delete', function(req, res) {
	let deletePath = path.join(__dirname, './uploads/');
    deletePath = path.join(deletePath , req.body.nameOfFile);
	fs.unlinkSync(deletePath);
    res.send('File deleted!');
});

router.get('/download', function(req, res) {
	if(req.query.projectID != null && req.query.projectID != undefined){
		Project.findOne({_id:req.query.projectID},(err,proj) =>{
		res.send(proj.paths);
		});
	}
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
