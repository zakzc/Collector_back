const request = require("supertest");
const mongoose = require("mongoose");
// Models
const DB_Data = require("../../models/MediaCollectionModel");
// const User_Data = require("../../models/userModel");
// const tokenFunc = require("../../utils/tokenFunc");

let server;
const baseURL = "/collections/";

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
  price: 4500,
  details: " In good state",
  notes: "5th ed. Hardcover edition with dust cover",
};

const badEntry = {
  collector: new mongoose.Types.ObjectId().toHexString(),
  typeOfMedia: "Book",
  title: "Tales of the Jazz Age",
  author: "",
  subType: "novel",
  mediaID: "1234gas5",
  quantity: 3,
  sellable: true,
  dateOfPurchase: "1922-01-01",
  price: 4900,
  details: "In good state",
  notes: "Hardcover edition with dust cover",
};

describe("\nIntegration test: Media controller", () => {
  ///
  beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(jest.fn());
    jest.spyOn(console, "debug").mockImplementation(jest.fn());
    jest.spyOn(console, "warn").mockImplementation(jest.fn());
  });
  ///
  beforeEach(() => {
    server = require("../../../index");
  });

  afterEach(async () => {
    server.close();
    await DB_Data.deleteOne({});
  });
  ///
  describe("Get method for all", () => {
    it("should return complete collection of items", async () => {
      const res = await request(server).get(baseURL + "getAll");
      expect(res.status).toBe(200);
      expect(res.body.length).not.toBe(0);
      expect(res.body.success).toBe(true);
    });
  });
  describe("Get method for /:id", () => {
    it("should return specific item", async () => {
      const item = new DB_Data(goodEntry);
      await item.save();
      let URL = baseURL + "getOne/" + item._id;
      const res = await request(server).get(URL);
      expect(res.status).toBe(200);
      expect(res.body.length).not.toBe(0);
      expect(res.body.success).toBe(true);
    });
    it("should return 404 for invalid id", async () => {
      let URL = baseURL + "getOne/0000";
      const res = await request(server).get(URL);
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
  describe("Post method for new item", () => {
    beforeEach(async () => {
      //   const baseUser = await User_Data.findOne({ email: "kirk@fup.org" });
    });
    const call = async (payload) => {
      let URL = baseURL + "/addNewItem";
      return await request(server).post(URL).send(payload);
    };
    it("Should work for correct data", async () => {
      const res = await call(goodEntry);
      expect(res.status).toBe(201);
    });
    it("Should return error for incorrect data", async () => {
      const res = await call(badEntry);
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
