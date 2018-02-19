const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName:{
      type : String,
      requiered : true
    },
  lastName:{
    type : String,
    required : true
  },
  email:{
    type : String,
    requiered : true
  },
  staffID:{
    type : String,
    requiered : true
  }
  });

  const user = module.exports = mongoose.model('User',userSchema);
