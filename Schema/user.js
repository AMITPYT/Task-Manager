const mongoose = require("mongoose")
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        min: 10
    },

  });

  const User = mongoose.model('User',UserSchema);
  module.exports = User