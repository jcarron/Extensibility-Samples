'use strict';

const https = require('https'),
  app = require('./server'),
  path = require('path'),
  fs = require('fs');

const httpsPort = process.env.HTTPS_PORT || 3434;
/*const options = {
    key: selfSigned.key,
    cert: selfSigned.cert
};*/

const options = {
  cert: fs.readFileSync(path.resolve(__dirname, "../../ssl.cert")),
  ca: fs.readFileSync(path.resolve(__dirname, "../../ssl.ca")),
  key: fs.readFileSync(path.resolve(__dirname, "../../ssl.key"))
};

https.createServer(options, app).listen(httpsPort);
console.log(`HTTPS started on port ${httpsPort}`);
console.log(`Navigate to https://jcarron.ca/bsi:${httpsPort}`);
console.log(options);
