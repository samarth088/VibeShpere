const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true // removes extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,      // removes spaces
    lowercase: true  // standardizes to lowercase
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
