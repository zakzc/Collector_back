const mongoose = require('mongoose');
const User = require('../models/userModel');
/// utils
const _ = require('lodash');
const logger = require('../utils/logger');
const makeBaseCollection = require('../utils/makeBaseCollection');
const validateUser = require('../utils/validateUser');
// psw and hash
const hashFunc = require('../utils/hashFunc');
const bcrypt = require('bcryptjs');
const tokenFunc = require('../utils/tokenFunc');
const auth = require('../middleware/auth');

async function registerUser(req, res) {
    logger.info('Registration for: ', req.body);
    // validate req
    const validationError = validateUser(req.body, 'register');
    if (validationError === false || !validationError) {
        return res.status(400).send({ success: false, message: validationError });
    } else {
        // get data from req
        const newUser = _.pick(req.body, ['name', 'email', 'password']);
        logger.info('registration for: ', newUser);
        // check data exists
        const doesUserExist = await User.exists({ email: newUser.email });
        logger.info(doesUserExist);
        if (doesUserExist) {
            return res.status(400).json({ success: false, message: 'This user already exists' });
        } else {
            // psw
            const hashedPsw = await hashFunc(newUser.password);
            // set data
            let addNewUser = new User({
                name: newUser.name,
                email: newUser.email,
                password: hashedPsw,
                userCollections: [],
            });
            // save
            await addNewUser.save();
            // make sample record
            makeBaseCollection(newUser_id);
            // get token
            const token = tokenFunc({ _id: newUser._id, name: newUser.name });
            // set header and send response
            try {
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
            } catch (err) {
                log.error('Adding item failed. Error:\n', err);
                res.status(400).json({ success: false, message: 'Add user failed' });
            }
        }
    }
}

async function logIn(req, res) {
    logger.info('Log in for: ', req.body);
    // get data from req
    const requestingUser = _.pick(req.body, ['email', 'password']);
    // validate data
    const validationError = validateUser(req.body, 'login');
    if (validationError === false || !validationError) {
        logger.info('error on validation');
        return res.status(400).send({ success: false, message: 'Error on data validation' });
    } else {
        // check for existence
        const existingUser = await User.findOne({
            email: requestingUser.email,
        }).then((user) => {
            if (!user) {
                logger.info('error, no user');
                return res.status(400).send({ success: false, message: "This user doesn't exist " });
            } else {
                return { name: user.name, password: user.password, id: user._id };
            }
        });
        // check psw
        bcrypt.compare(requestingUser.password, existingUser.password).then((isMatch) => {
            if (!isMatch || isMatch === false) {
                logger.info("credentials don't match");
                return res.status(400).send({ success: false, message: 'Invalid credentials' });
            } else {
                // add token
                const token = tokenFunc({
                    id: existingUser.id,
                    name: existingUser.name,
                });
                logger.info('Log in for: ', existingUser);
                return res
                    .header('x-auth-token', token)
                    .status(200)
                    .send({
                        success: true,
                        message: {
                            id: existingUser.id,
                            name: existingUser.name,
                            userToken: token,
                        },
                    });
            }
        });
    }
}

// to get the current logged in user
async function getCurrentUser(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).send('Invalid ID requested');
    }
    const existingUser = await User.findOne({
        _id: req.user._id,
    }).select('-password');
    return res.status(200).send(existingUser);
}

exports.registerUser = registerUser;
exports.logIn = logIn;
exports.getCurrentUser = getCurrentUser;
