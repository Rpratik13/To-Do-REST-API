const MY_SQL  = require('mysql');

const DB = MY_SQL.createConnection({
  database : 'nodemysql',
  host     : 'localhost',
  user     : 'root',
});

const STATUS = {
  success : 200,
  fail    : 300,
}

module.exports = {
  db         : DB,
  port       : 5000,
  saltRounds : 10,
  status     : STATUS,
  jwtSecret  : 'thisIsASecret'
};