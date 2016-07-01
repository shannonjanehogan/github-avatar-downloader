var request = require('request');
var fs = require("fs");
var dotenv = require('dotenv').config({path: './secure-variables.env'});
var targetDirectory = "./avatars/"

var repositoryOwner = process.argv[2];
var repositoryName = process.argv[3];

if (process.argv.length !== 4) {
  console.log("Please enter the correct number of arguments");
  return false;
}

var username = process.env.username;
var password = process.env.password;


fs.mkdir(targetDirectory, function(err) {
 if (err) {
   return err;
  }
});

function getRepoContributors(repositoryOwner, repositoryName, callback) {
  var host = "@api.github.com/repos/";
  var url = "https://" + username + ":" + password + host + repositoryOwner + "/" + repositoryName + "/contributors";

  request(
    {
      url: url,
      headers: {
        'User-Agent': username,
      }
    },
    function (error, response, body) {
      if (error) { throw(error); }
      console.log(body);
      var parsedBody = JSON.parse(body);
      if (parsedBody.message === "Bad credentials") {
        console.log("Please enter the correct credentials or use an .env file");
        return false; }
      else if (parsedBody.message === "Not Found") {
        console.log("Please enter an existing owner or repo");
        return false; }
      callback(parsedBody);
  });
};

function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath));
};

getRepoContributors(repositoryOwner, repositoryName, function (contributors) {
  for (var contributor of contributors) {
    downloadImageByURL(contributor.avatar_url, "./avatars/" + contributor.login + ".png");
  }
});