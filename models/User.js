const mongoose = require("mongoose");
const md5 = require("md5");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
    unique: true,
    trim: true
  },
  employee: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);
