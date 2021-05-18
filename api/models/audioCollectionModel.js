const mongoose = require("mongoose");

const AudioCollectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250,
    trim: true,
  },
  author: {
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
  dates: [{ originalReleaseDate: "1972" }, { currEditDate: "1976" }],
  price: [
    {
      dateOfEval: "13/4/20",
      market: "1",
      estimated: "2",
      tendency: "up",
    },
    {
      dateOfEval: "13/2/21",
      market: "1.5",
      estimated: "2.2",
      tendency: "up",
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
