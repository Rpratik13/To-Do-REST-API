// Import Files
const CONFIG = require('../configs');

// Import Modules
const B_CRYPT = require('bcrypt');
const ROUTER  = require('express').Router();

ROUTER.route('/')
  .post(function(req, res, next) {
    req.checkBody('fname')
      .notEmpty().withMessage('First Name is required')
      .matches(/^[A-Za-z\s]+$/).withMessage('Name must contain only alphabets');
    req.checkBody('lname')
      .notEmpty().withMessage('Last Name is required')
      .matches(/^[A-Za-z\s]+$/).withMessage('Name must contain only alphabets');
      
    req.checkBody('username')
      .notEmpty().withMessage('Username is required')
      .matches(/^[A-Za-z0-9\s]+$/).withMessage('Username must contain alphabets and numbers only');

    req.checkBody('password')
      .notEmpty().withMessage('Password is required')
      .isLength({min:8}).withMessage('Password must be atleast 8 characters')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
        .withMessage('Password must contain one lowercase character, one uppercase character, one number and one special character')
    
    let errors = req.validationErrors();
    if (errors) {
      res.send(errors[0]);
    }
    else {
      let user = {
        fname    : req.body.fname,
        lname    : req.body.lname,
        password : req.body.password,
        username : req.body.username.toLowerCase(),
      };
      
      B_CRYPT.genSalt(CONFIG.saltRounds, function(err, salt) {
        B_CRYPT.hash(user.password, salt, function (err, hash) {
          if (err) {
            next(err);
          }
          else {
            user.password = hash;
            let sqlQuery = 'INSERT INTO users SET ?';
            CONFIG.db.query(sqlQuery, user, function(err, result) {
              if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                  next({
                    message : 'Username already taken', 
                    status  : CONFIG.status.fail
                  });
                }
                else {
                  next(err);
                }
              }
              else {
                res.send({
                  message : 'Register successful', 
                  status  : CONFIG.status.success
                });
              }
            });
          }
        });
      });
    }
  });

module.exports = ROUTER;