const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    name:{
      type : String,
      requiered: true
    },
    date:{
      type : Date,
      requiered: true
    },//Maybe we need to add description field
    researcherStaffID:{
      type : String,
      requiered: true
    },
    RISSheet:{
      type : String,
      required : false
    },
    RISSigned:{
      type : Boolean,
      requiered : false
    },
    associateDeanSigned:{
      type : Boolean,
      requiered : false
    },
    dean:{
      type : Boolean,
      requiered : false
    }
  });

  const project = module.exports = mongoose.model('Project',projectSchema);
