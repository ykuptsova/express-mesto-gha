const mongoose = require('mongoose');
module.exports = mongoose.model('user', userSchema);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  owner: {
    type: ObjectId,
    required: true,
  },

  likes: {
    type: ObjectId,
    default: Array,
  },

  createdAt: {
    date: Date,
    default: Date.now,
  },
});
