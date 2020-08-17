const CONFIG = require('../configs');

const JWT = require('jsonwebtoken');

module.exports = function(req, res, next) {
  let token;

  if (req.headers['authorization']) {
    token = req.headers['authorization'];
  }

  if (req.headers['x-access-token']) {
    token = req.headers['x-access-token'];
  }

  if (req.headers['token']) {
    token = req.headers['token'];
  }
  if (!token) {
    return next({
      message : "Token not provided",
      status  : 400,
    });
  }
  JWT.verify(token, CONFIG.jwtSecret, function(err, decoded) {
    if (err) {
      return next(err);
    }  else {
      req.username = decoded.username;
      next();
    }
  });
};