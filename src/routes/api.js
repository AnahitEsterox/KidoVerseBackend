const express = require('express');

const usersRouter = require('./users.router');
const kidsRouter = require('./kids.router');

const api = express.Router();

api.use('/users', usersRouter);
api.use('/kids', kidsRouter);

module.exports = api;