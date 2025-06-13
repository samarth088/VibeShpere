const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: "" // optional: post image URL
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);
