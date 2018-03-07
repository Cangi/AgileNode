const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    name:{
      type : String,
      required: true
    },
    date:{
      type : Date,
      requiered: true
    },//Maybe we need to add description field
    researcherStaffID:{
      type : String,
      required: true
    },
    readyForRIS:{
      type: Boolean,
      required: true
    },
    researcherSigned:{
      type: Boolean,
      required: true
    },
    RISSheet:{
      type : String,
      required : false
    },
    RISSigned:{
      type : Boolean,
      required : false
    },
    associateDeanSigned:{
      type : Boolean,
      required : false
    },
    deanSigned:{
      type : Boolean,
      required : false
    }
  });

  const project = module.exports = mongoose.model('Project',projectSchema);
