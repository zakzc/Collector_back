const mongoose = require("mongoose");
const User = require("../models/userModel");
/// utils
const validateUser = require("../utils/validateUser");
const _ = require("lodash");
const logger = require("../utils/logger");
// psw and hash
const hashFunc = require("../utils/hashFunc");
const bcrypt = require("bcryptjs");
const tokenFunc = require("../utils/tokenFunc");
const auth = require("../middleware/auth");

async function registerUser(req, res) {
  const validationError = validateUser(req.body);
  if (validationError)
    return res.status(400).send({ success: false, error: validationError });
  // get data
  const newUser = _.pick(req.body, ["name", "email", "password", "isAdmin"]);
  logger.info("registration for: ", newUser);
  // check data
  const doesUserExist = await User.exists({ email: newUser.email });
  logger.info(doesUserExist);
  if (doesUserExist)
    return res
      .status(400)
      .json({ success: false, message: "This user already exists" });
  // psw
  const hashedPsw = await hashFunc(newUser.password);
  // set data
  addNewUser = new User({
    name: newUser.name,
    email: newUser.email,
    password: hashedPsw,
    // password: newUser.password,
    isAdmin: newUser.isAdmin,
  });
  // save
  await addNewUser.save();
  // get token
  //   const token = tokenFunc({ _id: newUser._id, isAdmin: existingUser.isAdmin });
  // set header and send response
  try {
    res
      // .header("x-auth-token", token)
      .status(201)
      .json({ success: true, user: newUser.name, email: newUser.email });
  } catch (err) {
    log.error("Adding item failed. Error:\n", err);
    res.status(400).json({ success: false, message: "Add user failed" });
  }
}

async function logIn(req, res) {
  // const validationError = validateUser(req.body);
  // if (validationError) return res.status(400).send(validationError);
  // get data
  const requestingUser = _.pick(req.body, ["email", "password"]);
  // check
  const existingUser = await User.findOne({ email: requestingUser.email });
  if (!existingUser) return res.status(400).send("This user doesn't exist ");
  // psw and token check
  const validPass = bcrypt.compare(
    requestingUser.password,
    existingUser.password
  );
  if (!validPass) {
    return res.status(400).send("Invalid credential");
  }

  const token = tokenFunc({
    _id: existingUser._id,
    isAdmin: existingUser.isAdmin,
  });
  return res.header("x-auth-token", token).status(200).json({ login: true });

  //return res.status(200).json({ login: true });
}

// to get the current logged in user
async function getCurrentUser(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send("Invalid ID requested");
  }
  const existingUser = await User.findOne({
    _id: req.user._id,
  }).select("-password");
  return res.status(200).send(existingUser);
}

exports.registerUser = registerUser;
exports.logIn = logIn;
exports.getCurrentUser = getCurrentUser;
