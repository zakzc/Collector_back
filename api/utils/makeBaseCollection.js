async function makeBaseCollection(userID) {
    logger.info('Creates base collection item for: ', userID);
    ///
    const currentDate = new Date().toISOString().slice(0, 10);

    let newItem = new MediaCollection({
        collector: userID,
        typeOfMedia: 'Book',
        title: 'Sample record',
        author: 'System',
        subType: 'Novel',
        mediaID: `baseRecord001-${userID}`,
        quantity: 1,
        sellable: false,
        dateOfPurchase: currentDate,
        price: 0.01,
        details: 'This is the base record that is created when you register your account',
        notes: 'Its goal is to serve as a template to your future registers.',
    });
    await newItem.save();
}

export default makeBaseCollection;
