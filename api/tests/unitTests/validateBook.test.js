const mongoose = require("mongoose");
const validateBook = require("../../utils/validateBook");

const badEntry = {
  collector: new mongoose.Types.ObjectId().toHexString(),
  typeOfMedia: "B",
  title: "",
  author: ["F. Scott Fitzgerald"],
  genre: "novel",
  edition: "5",
  mediaID: "1234gas5",
  quantity: 3,
  sellable: true,
  dates: [{ originalReleaseDate: "1922-01-01" }, { editionDate: "1997-10-02" }],
  price: [
    {
      dateOfEval: "2001-10-08",
      marketValue: "4500",
      estimatedValue: "4900",
      priceTendency: false,
    },
  ],
  details: "In good state",
  notes: "Hardcover edition with dust cover",
};

const goodEntry = {
  collector: new mongoose.Types.ObjectId().toHexString(),
  typeOfMedia: "B",
  title: "Tales of the Jazz Age",
  author: ["F. Scott Fitzgerald"],
  genre: "novel",
  edition: "5",
  mediaID: "1234gas5",
  quantity: 3,
  sellable: true,
  dates: [{ originalReleaseDate: "1922-01-01" }, { editionDate: "1997-10-02" }],
  price: [
    {
      dateOfEval: "2001-10-08",
      marketValue: "4500",
      estimatedValue: "4900",
      priceTendency: false,
    },
  ],
  details: "In good state",
  notes: "Hardcover edition with dust cover",
};

describe("\nValidation test: book validation", () => {
  beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(jest.fn());
    jest.spyOn(console, "debug").mockImplementation(jest.fn());
    jest.spyOn(console, "warn").mockImplementation(jest.fn());
  });
  ///
  it("Should return false for correct entry.", () => {
    expect(validateBook(goodEntry)).toBe(false);
  });
  it("Should return error for incorrect entry", () => {
    expect(validateBook(badEntry)).toBe('"title" is not allowed to be empty');
  });
});
