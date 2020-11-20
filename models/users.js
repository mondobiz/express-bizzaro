// dependencies ===============
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// post schema ==============
const userSchema = new Schema ({
  userName: String,
  password: String,
  profilePicture: String
})

// create mongoose model ==============
const User = mongoose.model('User', userSchema);

// exports ===============
module.exports = User;