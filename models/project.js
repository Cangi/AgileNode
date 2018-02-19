const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    name:{
      type : String,
      requiered: true
    },
    date:{
      type : Date,
      requiered: true
    },
    researcherName:{
      type : String,
      requiered: true
    },
    RISSheet:{
      type : String,
      required : true
    },
    RISSigned:{
      type : Boolean,
      requiered : false
    },
    associateDeanSigned:{
      type : Boolean,
      requiered : false
    }
    dean:{
      type : Boolean,
      requiered : false
    }
  });

  const project = module.exports = mongoose.model('Project',projectSchema);
