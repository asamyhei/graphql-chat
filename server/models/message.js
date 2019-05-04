const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
   content: String,
   timestamp: Number,
   userId: String,
   conversationId: String
});

module.exports = mongoose.model("Message", messageSchema);
