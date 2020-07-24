const Zombie = require('zombie');
const fs = require('fs');
const http = require('http');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

Zombie.site = 'http://localhost:25599';
const browser = new Zombie();

const IndexPage = require('./helper/index-page');
const GliderRiderPage = require('./helper/glider-rider-page');
const ExportPage = require('./helper/export-page');

const config = require('getconfig');

require('../bin/www'); // This starts the web server, and ensures it is only
// started once. It is a misuse of "require", and
// should be improved.

function removeFile(filename) {
  if (fs.existsSync(filename)) {
    fs.unlinkSync(filename);
  }
}

function downloadFromUrl(url, dest) {
  const file = fs.createWriteStream(dest);
  return new Promise((resolve, reject) => {
    http.get(Zombie.site + url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          resolve();
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function compareImages(imageAFilename, imageBFilename) {
  const imageA = PNG.sync.read(fs.readFileSync(imageAFilename));
  const { width, height } = imageA;
  const imageB = PNG.sync.read(fs.readFileSync(imageBFilename));

  pixelmatch(imageA.data, imageB.data, null, width, height, { threshold: 0 });
}

module.exports = {
  indexPage: new IndexPage(browser),
  gliderRiderPage: new GliderRiderPage(browser),
  exportPage: new ExportPage(browser),
  browser,
  config,
  removeFile,
  downloadFromUrl,
  compareImages
};

