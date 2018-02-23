const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName:{
      type : String,
      required : true
    },
  lastName:{
    type : String,
    required : true
  },
  email:{
    type : String,
    required : true
  },
  staffID:{
    type : String,
    required : true
  },
  department:{
    type : String,
    required : true
  }
  });

  const user = module.exports = mongoose.model('User',userSchema);
