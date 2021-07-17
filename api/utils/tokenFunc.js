const jwt = require("jsonwebtoken");

function token(payload) {
  const token = jwt.sign(payload, process.env.JWT_Key);
  return token;
}
module.exports = token;
