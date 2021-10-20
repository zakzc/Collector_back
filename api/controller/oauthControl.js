const mongoose = require('mongoose');
// model
const User = require('../models/userModel');
// utils
const hashFunc = require('../utils/hashFunc');
const tokenFunc = require('../utils/tokenFunc');
const logger = require('../utils/logger');
const makeBaseCollection = require('../utils/makeBaseCollection');

async function OAuthUser(req, res) {
    logger.info('OAuth user request. Received:\n ', req.body);
    const doesUserExist = await User.exists({ email: req.body.data.email });
    // exists?
    if (doesUserExist) {
        // exist = true
        const registeredUser = await User.findOne({ email: req.body.data.email });
        const token = tokenFunc({ _id: registeredUser._id, name: registeredUser.name });
        return res
            .header('x-auth-token', token)
            .status(200)
            .send({
                success: true,
                message: { name: registeredUser.name, password: registeredUser.password, id: registeredUser._id },
            });
    } else {
        // exist = false, create user
        const hashedPsw = await hashFunc(req.body.data.googleId);
        let addNewUser = new User({
            name: req.body.data.name,
            email: req.body.data.email,
            password: hashedPsw,
            userCollections: [],
        });
        // save
        await addNewUser.save();
        // make sample record
        await makeBaseCollection(addNewUser._id);
        // get token
        const token = tokenFunc({ _id: addNewUser._id, name: addNewUser.name });
        // set header and send response
        res.header('x-auth-token', token)
            .status(201)
            .send({
                success: true,
                message: {
                    user: newUser.name,
                    email: newUser.email,
                    id: newUser.id,
                },
            });
    }
}

exports.OAuthUser = OAuthUser;
