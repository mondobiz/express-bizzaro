// dependencies ===============
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// post schema ==============
const postSchema = new Schema ({
  title: String,
  image: String,
  description: String,
  dateMade: String,
  artistName: String,
})

// create mongoose model ==============
const Post = mongoose.model('Post', postSchema);

// exports ===============
module.exports = Post;