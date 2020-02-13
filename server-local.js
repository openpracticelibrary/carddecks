'use strict';

const app = require('./functions/app');

app.listen(3000, () => console.log('Local DATA APP listening on port 3000!'));
const qr = require('./functions/qr');

qr.listen(3001, () => console.log('Local QR APP listening on port 3001!'));