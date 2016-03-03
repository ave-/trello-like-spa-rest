var jwt = require('jsonwebtoken');

// With this method we generate a new token based on payload we want to put on it
module.exports.createToken = function (payload)
{
  return jwt.sign(payload, process.env.TOKEN_SECRET || "oursecret");
};

// Here we verify that the token we received on a request hasn't be tampered with.
module.exports.verifyToken = function (token, verified)
{
  return jwt.verify(token, process.env.TOKEN_SECRET || "oursecret", {}, verified);
};
