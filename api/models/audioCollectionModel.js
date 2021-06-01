const mongoose = require("mongoose");

const AudioCollectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250,
    trim: true,
  },
  artist: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 150,
    trim: true,
  },
  typeOfMedia: "LP",
  genre: "Rock",
  mediaID: "124q45",
  quantity: { type: Number, required: true },
  sellable: Boolean,
  dateOfPurchase: { type: String },
  yearOfRelease: { type: number },
  price: {
    purchasePrice: { type: number },
    estimatedCurrentMarketPrice: { type: number },
    tendency: { type: boolean },
  },
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
