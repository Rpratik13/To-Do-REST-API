// Import Files
const CONFIG = require('../configs');

// Import Modules
const ROUTER  = require('express').Router();

ROUTER.route('/')
  .get(function(req, res, next) {
      let sqlQuery = `SELECT * FROM todos WHERE username="${req.username.toLowerCase()}"`;
      CONFIG.db.query(sqlQuery, function(err, result) {
        if (err) {
          next(err);
        } 
        else {
          res.send({todo : result});
        }
      });
  });

ROUTER.route('/delete')
  .get(function(req, res, next) {
    let sqlQuery = `UPDATE todos SET deleted="1" WHERE id="${req.query.id}"`;
    CONFIG.db.query(sqlQuery, function(err, result) {
      if (err) {
        next({
          message : 'Delete Failed',
          status  : CONFIG.status.fail})
      } 
      else {
        res.send({
          message :'Delete Successful', 
          status  : CONFIG.status.success })
      }
    });
  });

ROUTER.route('/complete')
  .get(function(req, res, next) {
    let sqlQuery = `UPDATE todos SET status="completed" WHERE id="${req.query.id}"`;
    CONFIG.db.query(sqlQuery, function(err, result) {
      if (err) {
        next({
          message:'To Do task status change failed', 
          status : CONFIG.status.fail
        })
      } 
      else {
        res.send({
          message :'To Do task status changed',
          status  : CONFIG.status.success 
        });
      }
    });
  });



ROUTER.route('/add')
  .post(function(req, res, next) {
    
    req.checkBody('task', 'ToDo Title Required').notEmpty();
    // req.checkBody('date', 'ToDo Date Required').notEmpty();
    // req.checkBody('time', 'ToDo Time Required').notEmpty();
    
    let errors = req.validationErrors();
    if (errors) {
      res.send(errors[0]);
    } 
    else {
      let sqlQuery = 'INSERT INTO todos SET ?';
      let todo = {
        deadline_date  : '12/12/2012',
        deadline_time  : '12:12',
        status         : 'remaining',
        title          : req.body.task,
        username       : req.username
      };

      CONFIG.db.query(sqlQuery, todo, function(err, result) {
        if (err) {
          next(err);
        } 
        else {
          res.send({
            message : 'Succesful',
            status  : CONFIG.status.success
          });
        } 
      });
    }
  });

module.exports = ROUTER;