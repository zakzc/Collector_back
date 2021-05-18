const mongoose = require("mongoose");
// utils
const _ = require("lodash");
const logger = require("../utils/logger");
// model
const Book = require("../models/bookCollectionModel");

let testUser = require("../baseData/collection.json");

function getBookData(data) {
  const item = _.pick(data, [
    "collector",
    "typeOfMedia",
    "title",
    "author",
    "genre",
    "mediaID",
    "quantity",
    "sellable",
    "dates",
    "price",
    "details",
    "notes",
  ]);
  return item;
}

async function addNewItem(req, res) {
  logger.info("Add item");
  itemToAdd = getBookData(req.body);
  newBook = new Book({
    collector: itemToAdd.collector,
    typeOfMedia: itemToAdd.typeOfMedia,
    title: itemToAdd.title,
    author: itemToAdd.author,
    genre: itemToAdd.genre,
    mediaID: itemToAdd.mediaID,
    quantity: itemToAdd.quantity,
    sellable: itemToAdd.sellable,
    dates: itemToAdd.dates,
    price: itemToAdd.price,
    details: itemToAdd.details,
    notes: itemToAdd.notes,
  });
  await newBook.save();
  // logger.info("item saved" + newBook);
  return res.status(201).send({ success: true, message: newBook });
}

async function getAll(req, res) {
  logger.info("Get all data");
  const collectionOfBooks = await Book.find().sort();
  return res.status(200).send({ success: true, message: collectionOfBooks });
}

// TODO: get books by author
// TODO: get books by Collector

async function getOneItem(req, res) {
  logger.info("Get menu item");
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send("invalid Id requested");
  }
  const bookToSearch = await Book.findById(req.params.id);
  if (!bookToSearch) {
    return res.status(404), send({ success: false, message: "No item found" });
  }
  return res.status(200).send({ success: true, message: bookToSearch });
}

async function updateItem(req, res) {
  logger.info("Update item");
  let itemToUpdate = await Book.findById(req.params.id);
  if (!itemToUpdate) {
    return res.status(400).send({ success: false, message: "No item found" });
  }
  newItemData = getBookData(req.body);
  try {
    if (newItemData.typeOfMedia) {
      itemToUpdate.typeOfMedia = newItemData.typeOfMedia;
    }
    if (newItemData.title) {
      itemToUpdate.title = newItemData.title;
    }
    if (newItemData.author) {
      itemToUpdate.author = newItemData.author;
    }
    if (newItemData.genre) {
      itemToUpdate.genre = newItemData.genre;
    }
    if (newItemData.mediaID) {
      itemToUpdate.mediaID = newItemData.mediaID;
    }
    if (newItemData.quantity) {
      itemToUpdate.quantity = newItemData.quantity;
    }
    if (newItemData.sellable) {
      itemToUpdate.sellable = newItemData.sellable;
    }
    if (newItemData.dates) {
      itemToUpdate.dates = newItemData.dates;
    }
    if (newItemData.price) {
      itemToUpdate.price = newItemData.price;
    }
    if (newItemData.details) {
      itemToUpdate.details = newItemData.details;
    }
    if (newItemData.notes) {
      itemToUpdate.notes = newItemData.notes;
    }
  } catch (err) {
    return (
      res.status(404),
      send({ success: false, message: "Error on update process" })
    );
  }
  itemToUpdate.save();
  logger.info("data update" + itemToUpdate);
  return res.status(201).send({ success: true, message: itemToUpdate });
}

async function deleteItem(req, res) {
  logger.info("Delete item");
  await Book.findByIdAndRemove(req.params.id);
  return res
    .status(201)
    .send({ success: true, message: `Deleted: ${req.params.id}` });
}

exports.getAll = getAll;
exports.getOneItem = getOneItem;
exports.addNewItem = addNewItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
