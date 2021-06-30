const mongoose = require("mongoose");

const MediaCollectionSchema = new mongoose.Schema({
  collector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  typeOfMedia: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 15,
    trim: true,
  },
  subType: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 15,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 150,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 150,
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
  sellable: { type: Boolean, required: true },
  dateOfPurchase: { type: Date, required: true },
  price: { type: Number, required: true },
  details: {
    type: String,
    minlength: 0,
    maxlength: 250,
    trim: true,
    required: false,
  },
  notes: {
    type: String,
    minlength: 0,
    maxlength: 250,
    trim: true,
    required: false,
  },
});

module.exports = mongoose.model("Media_Collection", MediaCollectionSchema);
