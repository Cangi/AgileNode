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

router.post('/getUserDisplayName', (req, res) => {
    User.findOne({ staffID: req.body.staffID}, (err, user) => {
        if (err) throw err;
        if (user) {
            console.log(user.name);
            console.log(req.body.staffID);
            res.status(200).send(user.name);
        } else {
            console.log('new flat mate');
            res.status(400).send(undefined);
        }
    });
});

router.post('/checkUser',(req,res) => {
  User.findOne({staffID:req.body.user.employeeId}, (err,user) =>{
    if(err) throw err;
    if(user){
        res.status(200).send(true);

	  }else{
		res.status(400).send(false);
    }
  });
});

router.post('/getDepartment',(req,res) =>{
  User.findOne({staffID:req.body.user.employeeId}, (err,user) =>{
    if(err) throw err;
    if(user){
      res.status(200).send(user.department);
	  }else{
      res.status(400).send(undefined);
    }
  });
});

router.post('/createProject',(req,res) =>{
      let newProject = new Project({
      name:req.body.nameOfTheProject,
      date: new Date(),
      researcherStaffID:req.body.user.employeeId,
      researcherName: req.body.user.displayName.split(' ')[0] + ' ' + req.body.user.displayName.split(' ')[1],
      });
      newProject.save((err) =>{
            if(err){
              console.log(err);
			  res.status(400);
              return;
            }else {
              res.status(200).redirect('/projectPage');
            }
      });
});

router.post('/signup',(req,res) =>{
  var fullName = req.body.user.displayName.split('(')[0];
  let newUser = new User({
  name:fullName,
  staffID:req.body.user.employeeId,
  department:req.body.position
  });

  newUser.save((err) =>{
     if(err){
        res.send(false);
        return;
      }else {
        res.send(true);
      }
  });
});

router.post('/getProjects',(req,res) =>{
      Project.find({researcherStaffID:req.body.user.employeeId}, (err,projects) =>{
        if(err) throw err;
        if(projects){
          res.json(projects);
        }
      });
});

//should return all projects that have been readied for RIS
router.get('/getRISNewProjects', (req, res) => {
      Project.find({readyForRIS:true, RISSigned:undefined, RISStaff:undefined}, (err,project) =>{
          if(err) throw err;
          if(project){
          res.json(project);
          }
      });
});

router.post('/getRISInProcessProjects', (req,res) =>{
      Project.find({readyForRIS:true, RISSigned:undefined, RISStaff:req.body.user.employeeId}, (err,project) =>{
          if(err) throw err;
          if(project){
          res.json(project);
          }
      });
});

//gets the projects that have been signed by RIS and the researcher and not signed by the staff member
router.post('/getDeanProjects', (req,res) =>{
//passed department in
  if(req.body.department == "dean") {
      Project.find({researcherSigned:true, RISSigned:true, deanSign:undefined }, (err,project) =>{
          if(err) throw err;
          if(project){
            console.log(project);
          res.json(project);
          }
      });
  }
  else if(req.body.department == "associateDean"){
    Project.find({researcherSigned:true, RISSigned:true, associateDeanSigned:undefined }, (err,project) =>{
        if(err) throw err;
        if(project){
        res.json(project);
        }
    });
  }
});

router.post('/getProject',(req,res) =>{
      Project.findOne({_id:req.body.idOfTheProject}, (err,project) =>{
          if(err) throw err;
          if(project){
          res.json(project);
          }
      });
});

router.post('/signProject',(req,res) => {
  User.findOne({staffID:req.body.user.employeeId}, (err,user) =>{
    if(err) throw err;
    if(user){
      if(user.staffID == req.body.signiture){
        //Refactor when we have time
        Project.findOne({_id:req.body.idOfTheProject},(err,proj) =>{

        if(user.department=='researcher' && proj.readyForRIS != undefined && proj.RISSigned == true)
        Project.findOneAndUpdate({_id:req.body.idOfTheProject},{researcherSigned:true}, function (err){
        });
        if(user.department=='researcher' && proj.readyForRIS == undefined && proj.RISSigned == undefined)
        Project.findOneAndUpdate({_id:req.body.idOfTheProject},{readyForRIS:true}, function (err){
        });
        if(user.department=='RIS')
        Project.findOneAndUpdate({_id:req.body.idOfTheProject},{RISSigned:true}, function (err){
        });
        if(user.department=='associateDean')
        Project.findOneAndUpdate({_id:req.body.idOfTheProject},{associateDeanSigned:true}, function (err){
        });
        if(user.department=='dean')
        Project.findOneAndUpdate({_id:req.body.idOfTheProject},{deanSigned:true}, function (err){
        });
        console.log(proj.readyForRIS + ':' + proj.RISSigned + ':' + proj._id);
      });
    }
    }
  });
});

router.post('/addComment',(req,res) =>{
    var name = req.body.user.displayName.split('(')[0];

        Project.findOneAndUpdate({
          _id:req.body.idOfTheProject},
          {$push: {comments: {name:name, date:new Date(),comment:req.body.comment}}},
          function (err){
             console.log(err);
			 res.status(400);
          });
		  res.status(200);
});

//Upload to server functionality
router.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
    let uploadedFile = req.files.sampleFile;
	//console.log(uploadedFile.mimetype);
	if(!uploadedFile){
		return res.status(401).send('Please select a file to upload.');
	}
	if (uploadedFile.mimetype != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
		return res.status(402).send('Wrong file format.');
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
			return res.status(200).send('File uploaded!');
		}
		});
	}
});

//Delete file functionality
router.post('/delete', function(req, res) {
	
	var file =req.body.file.split('/')[3];
	console.log(file);
	let deletePath = path.join(__dirname, './uploads/');
    deletePath = path.join(deletePath , file);
    Project.findOneAndUpdate({_id:req.body.projectID}, { $pull: {'paths':{ 'path':req.body.file} } }, function (err){
    	console.log(err);
	});

	fs.unlinkSync(deletePath);
    res.status(200).send('File deleted!');
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
    res.status(200).send('File found!');
});

router.get('/download3', function(req, res){
    res.status(200).download(filePath);
});

module.exports = router;
