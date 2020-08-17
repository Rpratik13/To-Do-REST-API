// Import Files
const API_ROUTE = require('./api.route');
const CONFIG    = require('./configs');

// Import Modules
const BODY_PARSER       = require('body-parser');
const EXPRESS           = require('express');
const EXPRESS_VALIDATOR = require('express-validator');
const EXPRESS_SESSION   = require('express-session');
const PATH              = require('path');
const CORS              = require('cors');

const APP = EXPRESS();

// For using PUGs
APP.set('views', PATH.join(__dirname, 'views'));
APP.set('view engine', 'pug');

// For taking data from forms
APP.use(BODY_PARSER.urlencoded({extended : false }));
APP.use(BODY_PARSER.json());

// For checking entered formed data is valid
APP.use(EXPRESS_VALIDATOR());
APP.use(EXPRESS_SESSION({secret : 'thisIsAExpressSecret', expires: new Date(Date.now() + (86400 * 1000))}));
APP.use(EXPRESS.static(PATH.join(__dirname, 'css')));


APP.use(CORS());

APP.use('/api', API_ROUTE);

APP.use(function(req, res, next) {
  next({
    message : 'Not Found',
    status  : 404
  });
});

APP.use(function(err, req, res, next) {
  res.status(err.status || 400).send({
    message : err.message || err,
    status  : err.status || 400,
  });
});

APP.listen(CONFIG.port, function() {
  console.log(`Server listening at port ${CONFIG.port}`);
});