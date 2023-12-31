const express = require('express');

const api = require('./routes/api');

const app = express();

app.use(express.json());

app.use('/api', api);

app.get('/', (req, res) => {
  res.send('<h1>Hello from KidoVerse powerful server.</h1>');
});

module.exports = app;
