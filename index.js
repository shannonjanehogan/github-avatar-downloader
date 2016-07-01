var getRepoContributors = require("./get-repo-contributors.js");
var downloadImageByURL = require("./download-image-by-URL.js");
var recommendedRepos = require("./recommended-repos.js");
var targetDirectory = "./avatars/"
var fs = require("fs");

var repositoryOwner = process.argv[2];
var repositoryName = process.argv[3];

if (process.argv.length !== 4) {
  console.log("Please enter the correct number of arguments");
  return false;
}

fs.mkdir(targetDirectory, function(err) {
 if (err) {
   return err;
  }
});

getRepoContributors(repositoryOwner, repositoryName, function (contributors) {
  for (var contributor of contributors) {
    downloadImageByURL(contributor.avatar_url, "./avatars/" + contributor.login + ".png");
  }
});

getRepoContributors(repositoryOwner, repositoryName, function (contributors) {
  for (var contributor of contributors) {
    recommendedRepos(contributor.starred_url.full_name, contributor.login);
  }
});

