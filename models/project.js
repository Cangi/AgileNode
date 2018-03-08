const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    name:{//Name of the project
      type : String,
      required: true
    },//Date when the project was created
    date:{
      type : Date,
      requiered: true
    },//Staff id of the researcher
    researcherStaffID:{
      type : String,
      required: true
    },//marks the project as ready to be checked by RIS
    readyForRIS:{
      type: Boolean,
      required: false
    },//holds the signiture of the Researcher
    researcherSigned:{
      type: Boolean,
      required: false
    },//Hold the excel sheet for the RIS
    RISSheet:{
      type : String,
      required : false
    },//holds the signiture of the RIS
    RISSigned:{
      type : Boolean,
      required : false
    },//holds the signiture of the associate Dean
    associateDeanSigned:{
      type : Boolean,
      required : false
    },//holds the signiture of the Dean
    deanSigned:{
      type : Boolean,
      required : false
    },//holds the coments of the project as an array
    comments:{
      type : [],
      required : false
    }
  });

  const project = module.exports = mongoose.model('Project',projectSchema);
