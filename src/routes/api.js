const express = require('express');

const usersRouter = require('./users.router');
const kidsRouter = require('./kids.router');
const wordsRouter = require('./words.router');

const api = express.Router();

api.use('/users', usersRouter);
api.use('/kids', kidsRouter);
api.use('/words', wordsRouter);

module.exports = api;
