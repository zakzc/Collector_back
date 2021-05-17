const mongoose = require("mongoose");

let testUser = require("../baseData/collection.json");

async function getUserData(req, res) {
  res.status(200).send(testUser);
}
