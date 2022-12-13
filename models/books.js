const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  Name: String,
  Author: String,
  Description: String,
  Image: String
});
module.exports = mongoose.model("books", bookSchema);