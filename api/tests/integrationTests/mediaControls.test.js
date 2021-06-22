const request = require("supertest");
const mongoose = require("mongoose");
// Models
const DB_Data = require("../../models/MediaCollectionModel");
// const User_Data = require("../../models/userModel");
// const tokenFunc = require("../../utils/tokenFunc");

let server;
const baseURL = "/collection/";

const goodEntry = {
  collector: new mongoose.Types.ObjectId().toHexString(),
  typeOfMedia: "B",
  title: "Tales of the Jazz Age",
  author: ["F. Scott Fitzgerald"],
  subType: "novel",
  edition: "5",
  mediaID: "1234gas5",
  quantity: 3,
  sellable: true,
  dates: "1922-01-01",
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

const badEntry = {
  collector: new mongoose.Types.ObjectId().toHexString(),
  typeOfMedia: "B",
  title: "",
  author: ["F. Scott Fitzgerald"],
  subType: "novel",
  edition: "5",
  mediaID: "1234gas5",
  quantity: 3,
  sellable: true,
  dates: "1922-01-01",
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

describe("\nIntegration test: Book controller", () => {
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
      const res = await request(server).get(baseURL + "/getAll");
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
