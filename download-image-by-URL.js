var fs = require("fs");
var request = require('request');

function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath));
  // console.log("Successfully downloaded image");
};

module.exports = downloadImageByURL