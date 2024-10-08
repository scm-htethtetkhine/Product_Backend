// tokenUtility.js
const jwt = require("jsonwebtoken");
const secretKey = "I am SuperMan";

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username, email: user.email }, secretKey, {
    expiresIn: "1m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username, email: user.email }, secretKey, {
    expiresIn: "2m",
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken
};
