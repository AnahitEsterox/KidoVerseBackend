const mongoose = require('mongoose');

const wordsSchema = new mongoose.Schema({
  original: {
    type: String,
    required: true
  },
  kido: {
    type: String,
    required: true,
  },
  kidId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kid',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});

module.exports = mongoose.model('Word', wordsSchema);
