const CONFIG = require('../configs');

const B_CRYPT = require('bcrypt');
const JWT     = require('jsonwebtoken');
const ROUTER  = require('express').Router();


function createToken(data) {
  return JWT.sign({ ...data }, CONFIG.jwtSecret);
}

ROUTER.route('/')
  .post(function(req, res, next) {
    let sqlQuery = `SELECT * FROM users WHERE username = "${req.body.username.toLowerCase()}"`;
    CONFIG.db.query(sqlQuery, function(err, result) {
      if (err) {
        next(err);
      } 
      else if (result.length) {
        B_CRYPT.compare(req.body.password, result[0].password, function(err, compareResult) {
          if (err) {
            next(err);
          } 
          else if (compareResult) {
            token = createToken(result[0]);
            result = JSON.parse(JSON.stringify(result[0]));
            let data = {
              ...result,
              token,
              status : CONFIG.status.success,
            }
            res.send(data);
          }
          else {
            next({ 
              message : 'Invalid Username or Password', 
              status  : CONFIG.status.fail 
            });
          }
        });
      }

      else {
        next({ 
          message : 'Invalid Username or Password',
          status  : CONFIG.status.fail,
        });
      }
    });
  });

module.exports = ROUTER;