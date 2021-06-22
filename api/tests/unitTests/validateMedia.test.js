const mongoose = require("mongoose");
const validateMedia = require("../../utils/validateMedia");

const badEntry = {
  collector: new mongoose.Types.ObjectId().toHexString(),
  typeOfMedia: "Book",
  title: "Tales of the Jazz Age",
  author: "F",
  subType: "novel",
  edition: "5",
  mediaID: "1234gas5",
  quantity: 3,
  sellable: true,
  dates: "1997-10-02",
  price: 4900,
  details: "In good state",
  notes: "Hardcover edition with dust cover",
};

const goodEntry = {
  collector: new mongoose.Types.ObjectId().toHexString(),
  typeOfMedia: "Book",
  title: "Tales of the Jazz Age",
  author: "F. Scott Fitzgerald",
  subType: "Novel",
  mediaID: "1234gas5",
  quantity: 3,
  sellable: true,
  dateOfPurchase: "1972-01-01",
  price: 34.5,
  details: "In good state",
  notes: "Hardcover edition with dust cover",
};

describe("\nValidation test: media validation", () => {
  beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(jest.fn());
    jest.spyOn(console, "debug").mockImplementation(jest.fn());
    jest.spyOn(console, "warn").mockImplementation(jest.fn());
  });
  ///
  it("Should return false for correct entry.", () => {
    expect(validateMedia(goodEntry).valid).toBe(true);
  });
  it("Should return error for incorrect entry", () => {
    expect(validateMedia(badEntry).valid).toBe(false);
  });
});
