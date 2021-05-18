const mongoose = require("mongoose");

const BookCollectionSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250,
    trim: true,
  },
  author: [
    {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 150,
      trim: true,
    },
  ],
  typeOfMedia: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  mediaID: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  quantity: { type: Number, required: true },
  sellable: Boolean,
  dates: [
    { originalReleaseDate: { type: Date } },
    { currEditDate: { type: Date } },
  ],
  price: [
    {
      dateOfEval: { type: Date },
      marketValue: { type: Number },
      estimated: { type: Number },
      tendency: Boolean,
    },
  ],
  details: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250,
    trim: true,
  },
  personalNotes: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250,
    trim: true,
  },
});

// Tendency: true for upwards, false for downwards

module.exports = mongoose.model("Book", BookCollectionSchema);
