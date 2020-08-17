// Controllers
const LOGIN_ROUTE    = require('./controllers/login.controller');
const REGISTER_ROUTE = require('./controllers/register.controller');
const TODO_ROUTE     = require('./controllers/todo.controller');

// Middlewares
const AUTHENTICATE = require('./middlewares/authenticate');

const ROUTER = require('express').Router();

// Routes
ROUTER.use('/login', LOGIN_ROUTE);
ROUTER.use('/register', REGISTER_ROUTE);
ROUTER.use('/todo', AUTHENTICATE, TODO_ROUTE);

module.exports = ROUTER;