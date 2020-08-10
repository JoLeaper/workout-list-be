const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  muscles: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Workout', schema);
