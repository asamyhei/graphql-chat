const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  conversationIds: [String],
  name: String,
  picture_url: String,
});

module.exports = mongoose.model("User", userSchema);
