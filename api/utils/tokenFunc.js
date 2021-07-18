const jwt = require("jsonwebtoken");

function token(payload) {
  const token = jwt.sign(payload, process.env.JWT_Key, { expiresIn: 36000 });
  return token;
}
module.exports = token;
