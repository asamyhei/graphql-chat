const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
   userIds: [String],
   timestamp: Number
});

module.exports = mongoose.model("Conversation", conversationSchema);
