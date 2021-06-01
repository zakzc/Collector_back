const mongoose = require("mongoose");

const BookCollectionSchema = new mongoose.Schema({
  collector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  typeOfMedia: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1,
    uppercase: true,
    trim: true,
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
  genre: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  edition: { type: Number },
  mediaID: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  quantity: { type: Number, required: true },
  sellable: { type: Boolean, required: true },
  dateOfPurchase: { type: String },
  yearOfRelease: { type: Number },
  price: {
    purchasePrice: { type: Number },
    estimatedCurrentMarketPrice: { type: Number },
    tendency: { type: Boolean },
  },
  details: {
    type: String,
    minlength: 3,
    maxlength: 250,
    trim: true,
  },
  notes: {
    type: String,
    minlength: 3,
    maxlength: 250,
    trim: true,
  },
});

// Type: A=audio, B=book, G=graphic, E=equipment
// Other collectibles are a different schema
// Tendency: true for upwards, false for downwards

module.exports = mongoose.model("Book", BookCollectionSchema);
