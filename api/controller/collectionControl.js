const mongoose = require("mongoose");
const logger = require("../utils/logger");

let testUser = require("../baseData/collection.json");

function getAll(req, res) {
  logger.info("Get all data");
  return res.status(200).send(testUser);
}

function getOneItem(req, res) {
  logger.info("Get menu item");
  return res.status(200).send("getOneItem: " + req.params.id);
}

function addNewItem(req, res) {
  logger.info("Add item");
  return res.status(201).send("Add new Item");
}

function updateItem(req, res) {
  logger.info("Update item");
  return res.status(201).send("Update Item" + req.params.id);
}

function deleteItem(req, res) {
  logger.info("Delete item");
  return res.status(201).send("Delete Item: " + req.params.id);
}

exports.getAll = getAll;
exports.getOneItem = getOneItem;
exports.addNewItem = addNewItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
