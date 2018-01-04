const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  belongs_to: {
    type: Schema.Types.ObjectId,
    required: true
  },
  created_at: {
    type: Number,
    default: Date.now()
  },
  votes: {
    type: Number,
    default: 0
  },
  created_by: {
    type: String,
    required: true,
    default: 'northcoder'
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
