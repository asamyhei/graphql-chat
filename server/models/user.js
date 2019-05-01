const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  picture_url: String,
  conversationIds: [String],
  password: String
});

module.exports = mongoose.model("User", userSchema);
