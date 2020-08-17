const MY_SQL  = require('mysql');

const DB = MY_SQL.createConnection({
  database : 'POTbVBDBLO',
  host     : 'remotemysql.com',
  user     : 'POTbVBDBLO',
  password : 'BLcIgeSXav',
  port     : 3306
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
