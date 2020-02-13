'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const axios = require('axios');
const router = express.Router();

const BASE_API_URL =
  'https://api.github.com/repos/springdo/openpracticelibrary/contents/content/practice?ref=master';

const OPL_BASE_URL = 'https://openpracticelibrary.com/practice/'

const options = {
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`
  }
};


router.get('/qrcode', (req, res) => {

  let qrCodeLinks = [];
  axios.get(BASE_API_URL, options).then(fileLocations => {
      fileLocations.data.forEach(file => {
        let name = file.name.substring(0, file.name.length - 3)
        let link = `${OPL_BASE_URL}${name}/`
        let size = req.params.size || '[100]x[100]'
        qrCodeLinks.push(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(link)}&size=${size}`)
      })
      res.status(200).send(qrCodeLinks);
    })
    .catch(error => {
      // return error
      console.log(error);
      res.send(error);
    });

});

app.use('/.netlify/functions/qr', router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);