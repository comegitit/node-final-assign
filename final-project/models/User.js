
//bring in dependency
const mongoose = require("mongoose");

 //create schema
const UserSchema = new mongoose.Schema({
  //pass in object with all fields
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  adult: {
    type: Boolean,
    default: false
  }
});
//export the model
const User = mongoose.model("subscribers", UserSchema);
module.exports = User;