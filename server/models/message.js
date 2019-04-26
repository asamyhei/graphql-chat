const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  content: String,
  userId: String,
  timestamp: Number
});

module.exports = mongoose.model('Message', messageSchema);
