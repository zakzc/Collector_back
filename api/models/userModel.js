const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    trim: true,
    unique: true,
  },
  userCollection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MediaCollection",
    },
  ],
});

module.exports = mongoose.model("Users", userSchema);
