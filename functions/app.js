'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({
  route: req.originalUrl
}));

app.use('/.netlify/functions/app', router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);