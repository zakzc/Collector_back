const mongoose = require("mongoose");
const User = require("../models/userModel");
/// utils
// const validateUser = require("../utils/validateUser");
const _ = require("lodash");
// const hashFunc = require("../utils/hashFunc");
// const bcrypt = require("bcrypt");
// const tokenFunc = require("../utils/tokenFunc");
// const auth = require("../middleware/auth");
// logs
const logger = require("../utils/logger");

async function registerUser(req, res) {
  // validation
  //   const validationError = validateUser(req.body);
  //   if (validationError) return res.status(400).send(validationError);
  //   // assign local
  const newUser = _.pick(req.body, ["name", "email", "password", "isAdmin"]);
  logger.info("registration for: ", newUser);
  // check
  const doesUserExist = await User.exists({ email: newUser.email });
  logger.info(doesUserExist);
  if (doesUserExist)
    return res
      .status(400)
      .json({ access: false, message: "This user already exists" });
  // psw
  //   const hashedPsw = await hashFunc(newUser.password);
  // assign db
  addNewUser = new User({
    name: newUser.name,
    email: newUser.email,
    // password: hashedPsw,
    password: newUser.password,
    isAdmin: newUser.isAdmin,
  });
  // save
  await addNewUser.save();
  // get token
  //   const token = tokenFunc({ _id: newUser._id, isAdmin: existingUser.isAdmin });
  // set header and send response
  try {
    res
      .header("x-auth-token", token)
      .status(201)
      .json({ success: true, user: newUser.name, email: newUser.email });
  } catch (err) {
    log.error("Adding item failed. Error:\n", err);
    res.status(400).json({ success: false, message: "Add user failed" });
  }
}

async function logIn(req, res) {
  // validation
  //   const validationError = validateUser(req.body);
  //   if (validationError) return res.status(400).send(validationError);
  // assign local
  const requestingUser = _.pick(req.body, [
    "name",
    "email",
    "password",
    "isAdmin",
  ]);
  // check
  const existingUser = await User.findOne({ email: requestingUser.email });
  if (!existingUser) return res.status(400).send("This user doesn't exist ");
  // psw check
  //   const validPass = bcrypt.compare(
  //     requestingUser.password,
  //     existingUser.password
  //   );
  //   if (!validPass) {
  //     return res.status(400).send("Invalid credential");
  //   }

  //   const token = tokenFunc({
  //     _id: existingUser._id,
  //     isAdmin: existingUser.isAdmin,
  //   });
  return res.status(200).json({ login: true });
  // return res.header("x-auth-token", token).status(200).json({ login: true });
}

// to get the current logged in user
async function getCurrentUser(req, res) {
  //   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  //     return res.status(404).send("Invalid ID requested");
  //   }
  const existingUser = await User.findOne({
    _id: req.user._id,
  }).select("-password");
  return res.status(200).send(existingUser);
}

exports.registerUser = registerUser;
exports.logIn = logIn;
exports.getCurrentUser = getCurrentUser;
