// model
const MediaCollection = require("../models/MediaCollectionModel");

async function duplicate(data) {
  const currentCollection = await MediaCollection.find().sort();
  const anyDuplicate = currentCollection.filter(
    (item) => item.mediaID === data.mediaID
  );
  if (anyDuplicate.length > 0) {
    return true;
  } else {
    return false;
  }
}

module.exports = duplicate;
