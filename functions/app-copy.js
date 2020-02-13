'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const axios = require('axios');
const fontMatter = require('parser-front-matter');
const router = express.Router();
// const { parse } = require('json2csv');

const BASE_URL =
  'https: //api.github.com/repos/openpracticelibrary/openpracticelibrary/contents/content/practice';

let allFilePaths = [];

const fields = [
  'title',
  'subtitle',
  'area',
  'people',
  'time',
  'difficulty',
  'participants',
  'url'
];
const opts = {
  fields
};

const options = {
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`
  }
};

const someurls = [
  'https://api.github.com/repos/openpracticelibrary/openpracticelibrary/contents/content/practice/usability-testing.md',
  'https://api.github.com/repos/openpracticelibrary/openpracticelibrary/contents/content/practice/user-story-mapping.md',
  'https://api.github.com/repos/openpracticelibrary/openpracticelibrary/contents/content/practice/usr.md',
  'https://api.github.com/repos/openpracticelibrary/openpracticelibrary/contents/content/practice/visualisation-of-work.md',
  'https://api.github.com/repos/openpracticelibrary/openpracticelibrary/contents/content/practice/vsm-and-mbpm.md',
  'https://api.github.com/repos/openpracticelibrary/openpracticelibrary/contents/content/practice/whole-product-plotting.md',
  'https://api.github.com/repos/openpracticelibrary/openpracticelibrary/contents/content/practice/yes-and.md'
];

router.get('/data', (req, res) => {
  // allFilePaths.push(axios.get(`https://api.github.com/repos/openpracticelibrary/openpracticelibrary/contents/content/practice/${element.name}`, options))
  someurls.forEach(name => {
    allFilePaths.push(axios.get(`${name}`, options));
  });
  axios
    .all(allFilePaths)
    .then(allFileContents => {
      let response = [];
      allFileContents.forEach(item => {
        const fileContent = new Buffer(item.data.content, 'base64').toString(
          'ascii'
        );
        fontMatter.parse(fileContent, function (err, file) {
          if (err) {
            console.log(err);
            res.send(err);
          }
          // trim extra stuff from the metadata
          delete file.data.date;
          delete file.data.authors;
          delete file.data.icon;
          delete file.data.jumbotron;
          delete file.data.jumbotronAlt;
          delete file.data.perspectives;
          file.data.participants = file.data.participants ?
            file.data.participants.join('#') :
            '';
          // add url
          // TODO - FIX URL with correct filename
          file.data.url = `https://openpracticelibrary.com/practice/${file.data.title}`;
          response.push(file.data);
        });
        // response.push(fileContent);
      });
      req.query.type == 'json' ? res.send(response) : '';
      // // TODO - add parser for CSV
      // const csv = parse(response, opts);
      // console.log(csv);
      // res.header('Content-Type', 'text/csv');
      // res.status(200).send(csv);
    })
    .catch(error => {
      // return error
      console.log(error);
      res.send(error);
    });

  // allFilePaths.push(axios.get(`https://api.github.com/repos/openpracticelibrary/openpracticelibrary/contents/content/practice/${element.name}`, options))
});

app.use('/.netlify/functions/app-copy', router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);