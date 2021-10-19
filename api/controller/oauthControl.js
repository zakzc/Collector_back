const mongoose = require('mongoose');
const User = require('../models/userModel');
const hashFunc = require('../utils/hashFunc');
const tokenFunc = require('../utils/tokenFunc');
const logger = require('../utils/logger');

async function OAuthUser(req, res) {
    logger.info('OAuth user request: ', req.body);
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
            name: req.body.data.givenName,
            email: req.body.data.email,
            password: hashedPsw,
            userCollections: [],
        });
        // save
        await addNewUser.save();
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
