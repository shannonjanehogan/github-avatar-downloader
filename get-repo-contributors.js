var request = require('request');
var dotenv = require('dotenv').config({path: './secure-variables.env'});

var username = process.env.username;
var password = process.env.password;


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

module.exports = getRepoContributors

