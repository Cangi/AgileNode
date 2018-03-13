const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  staffID:{
    type : String,
    required : true
  },
  department:{
    type : String,
    required : false
  }
  });

  const user = module.exports = mongoose.model('User',userSchema);
