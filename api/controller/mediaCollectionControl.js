const mongoose = require('mongoose');
// utils
const _ = require('lodash');
const duplicate = require('../utils/duplicate');
const logger = require('../utils/logger');
const validateMedia = require('../utils/validateMedia');
// model
const MediaCollection = require('../models/MediaCollectionModel');

function getMediaData(data) {
    const item = _.pick(data, [
        'collector',
        'typeOfMedia',
        'title',
        'author',
        'subType',
        'mediaID',
        'quantity',
        'sellable',
        'dateOfPurchase',
        'price',
        'details',
        'notes',
    ]);
    return item;
}

async function addNewItem(req, res) {
    logger.info('Add item: ', req.body);

    const isDuplicate = await duplicate(req.body);
    if (isDuplicate === true) {
        logger.info('Duplicated item');
        return res.status(200).send({
            success: false,
            message: 'Duplicated item',
        });
    }
    ///
    const validation = validateMedia(req.body);
    if (validation.valid === false)
        return res.status(400).send({
            success: false,
            message: 'Validation error',
            data: validation.message,
        });

    const itemToAdd = getMediaData(req.body);
    newItem = new MediaCollection({
        collector: itemToAdd.collector,
        typeOfMedia: itemToAdd.typeOfMedia,
        title: itemToAdd.title,
        author: itemToAdd.author,
        subType: itemToAdd.subType,
        mediaID: itemToAdd.mediaID,
        quantity: itemToAdd.quantity,
        sellable: itemToAdd.sellable,
        dateOfPurchase: itemToAdd.dateOfPurchase,
        price: itemToAdd.price,
        details: itemToAdd.details,
        notes: itemToAdd.notes,
    });
    await newItem.save();
    // logger.info("item saved" + newBook);
    return res.status(201).send({ success: true, data: newItem });
}

async function getAll(req, res) {
    const collectionOfItems = await MediaCollection.find().sort();
    logger.info('Get all data');
    return res.status(200).send({ success: true, data: collectionOfItems });
}

async function getByAuthor(req, res) {
    logger.info('Get all books by author');
    const authorToSeek = req.body.author;
    const authorCollection = await MediaCollection.find({ author: authorToSeek });
    if (!authorCollection) {
        return res.status(404), send({ success: false, message: 'No item found' });
    }
    return res.status(200).send({ success: true, data: authorCollection });
}

async function getByCollectorId(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).send('invalid Id requested');
    }
    logger.info('Get all media owned by id:', req.params.id);
    const collectorCollection = await MediaCollection.find({
        collector: req.params.id,
    });
    if (!collectorCollection) {
        return res.status(404), send({ success: true, message: 'No item found' });
    }
    return res.status(200).send({ success: true, data: collectorCollection });
}

async function getOneItem(req, res) {
    logger.info('Get menu item');
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).send({ success: false, message: 'invalid Id requested' });
    }
    const bookToSearch = await MediaCollection.findById(req.params.id);
    if (!bookToSearch) {
        return res.status(404).send({ success: false, message: 'No item found' });
    }
    return res.status(200).send({ success: true, data: bookToSearch });
}

// You can't update the owner of the collection
async function updateItem(req, res) {
    logger.info('Call for update:', req.params.id, ' for ', req.body);
    let validation = validateMedia(req.body);
    // returns false if valid
    if (validation.valid === true)
        return res.status(400).send({
            success: false,
            message: 'Validation error',
            data: validation,
        });
    logger.info('Update item');
    let itemToUpdate = await MediaCollection.findById(req.params.id);
    if (!itemToUpdate) {
        return res.status(400).send({ success: false, message: 'No item found' });
    }
    newItemData = getMediaData(req.body);
    try {
        itemToUpdate.typeOfMedia = newItemData.typeOfMedia;
        itemToUpdate.title = newItemData.title;
        itemToUpdate.author = newItemData.author;
        itemToUpdate.subType = newItemData.subType;
        itemToUpdate.mediaID = newItemData.mediaID;
        itemToUpdate.quantity = newItemData.quantity;
        itemToUpdate.sellable = newItemData.sellable;
        itemToUpdate.dateOfPurchase = newItemData.dateOfPurchase;
        itemToUpdate.price = newItemData.price;
        itemToUpdate.details = newItemData.details;
        itemToUpdate.notes = newItemData.notes;
    } catch (err) {
        return res.status(404), send({ success: false, message: 'Error on update process' });
    }
    itemToUpdate.save();
    logger.info('data update' + itemToUpdate);
    return res.status(201).send({ success: true, data: itemToUpdate });
}

async function deleteItem(req, res) {
    logger.info('Delete item: ', req.params.id);
    await MediaCollection.findByIdAndRemove(req.params.id);
    return res.status(201).send({ success: true, message: `Deleted: ${req.params.id}` });
}

exports.getAll = getAll;
exports.getOneItem = getOneItem;
exports.addNewItem = addNewItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
exports.getByAuthor = getByAuthor;
exports.getByCollectorId = getByCollectorId;
