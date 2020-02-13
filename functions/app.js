'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const axios = require('axios');
const fm = require('front-matter');
const router = express.Router();
const {
  parse
} = require('json2csv');

const BASE_API_URL =
  'https://api.github.com/repos/springdo/openpracticelibrary/contents/content/practice?ref=master';
const OPL_BASE_URL = 'https://openpracticelibrary.com/practice/'

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

  let allFileLocations = [];
  axios.get(BASE_API_URL, options).then(fileLocations => {
      // console.log(fileLocations)
      allFileLocations = fileLocations.data;
      allFileLocations.forEach(file => {
        allFilePaths.push(axios.get(`${file.url}`, options));
      })
      axios
        .all(allFilePaths)
        .then(allFileContents => {
          let response = [];
          allFileContents.forEach((item, index) => {
            const fileContent = new Buffer(item.data.content, 'base64').toString(
              'ascii'
            );
            let content = fm(fileContent);
            // trim extra stuff from the metadata
            delete content.attributes.date;
            delete content.attributes.authors;
            delete content.attributes.icon;
            delete content.attributes.jumbotron;
            delete content.attributes.jumbotronAlt;
            delete content.attributes.perspectives;
            content.attributes.participants = content.attributes.participants ?
              content.attributes.participants.join('#') :
              '';
            // add url
            // TODO - FIX URL with correct filename

            let name = allFileLocations[index].name.substring(0, allFileLocations[index].name.length - 3)
            content.attributes.url = `${OPL_BASE_URL}${name}/`;
            response.push(content.attributes);
          });
          // TODO - add parser for CSV
          const csv = parse(response, opts);
          // console.info(csv);
          req.query.type == 'json' ?
            res.header('Content-Type', 'application/json') : res.header('Content-Type', 'text/csv');
          req.query.type == 'json' ? res.status(200).send(response) : res.status(200).send(csv);
        })
        .catch(error => {
          // return error
          console.log(error);
          res.send(error);
        });

    })
    .catch(error => {
      // return error
      console.log(error);
      res.send(error);
    });

});

app.use('/.netlify/functions/app', router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);