const request = require("supertest");
const mongoose = require("mongoose");
// Models
const DB_Data = require("../../models/userModel");
// const tokenFunc = require("../../utils/tokenFunc");

let server;
const baseURL = "/collectors/";

const goodEntry = {
  name: "Thor",
  email: "thor@asgard.org",
  password: "hammer",
};

const badEntry = {
  name: "Loki",
  email: "",
  password: "horns",
};

describe("\nIntegration test: User controller", () => {
  ///
  beforeAll(() => {
    // jest.spyOn(console, "log").mockImplementation(jest.fn());
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
  describe("Register a user", () => {
    const call = async (payload) => {
      let URL = baseURL + "register";
      return await request(server).post(URL).send(payload);
    };
    it("Should work for correct data", async () => {
      const res = await call(goodEntry);
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
    });
    it("Should fail for incorrect data", async () => {
      const res = await call(badEntry);
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
