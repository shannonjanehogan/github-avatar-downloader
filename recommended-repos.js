var request = require('request');
var dotenv = require('dotenv').config({path: './secure-variables.env'});
var username = process.env.username;
var password = process.env.password;


var repoList = {

};

function recommendedRepos(usersStarredRepos, user) {
  var endpoint = "https://" + username + ":" + password + "@api.github.com/users/" + user + "/starred";
  var options = {
    url: endpoint,
    headers: {
      'User-Agent': username,}
    }

  request(options, endpoint, function(err, response, body) {
    if (err) {
      console.log("Error", err);
      return false;
    }
    var repoInfo = JSON.parse(body);
     repoInfo.forEach((repo) => {
        if (repoList[repo.name]) {
          return repoList[repo.name] += 1;
        } else {
          return repoList[repo.name] = 1;
        }
      })
     getMax(repoList);
     // console.log(repoList);
  });
}


function getMax(object) {
  var array = []
  for (var name in object) {
    console.log(name);
    array.push(name);
  }
   console.log(array);
   // callback function
   //use customsorting.js to compare each value in array and find the max
}


    // var starredRepoID = repoInfo.id

    // for (var i = 0; i < repoInfo.length; i++)

    //   repoName[starredRepoID[i]] = (repoName[starredRepoID[i]] + 1) || 1;

    //   console.log(repoList);

  //   //   if (repo.full_name === undefined) {
  //   //     repoList.numberStarred = 1;
  //   //   } else {
  //   //     repoList.push(repoInfo.numberStarred);
  //   //   }
  //   // });
  //    // console.log(repoList);
//   // return repoList;
//   });
// };

// function recommendedRepos(url) {
//   var repoList = {
//     star: []
//   };
//   repoList.star.push(url);

  // request
  // .get(url)
  //   .on('response', function(response) {
  //   console.log(response.statusCode) // 200
  //   console.log(response.headers['content-type']) // 'image/png'
  // })
  // .pipe(request.put(repoList))

  // request(url).pipe(fs.createWriteStream(filePath));


//   for (var listNumber in repoList) {

//     if (repoList.star[listNumber] === undefined) {
//       repoList.star[listNumber] = 1;
//     } else {
//       repoList.star[listNumber] += 1;
//     }
//   }

//    // console.log(repoList);
//    // console.log(repoList.star);
// return repoList.star

// }

// function processRequest(err, response, body) {
//     if (err) {
//       console.log("Error", err);
//       return false;
//     } else {
//       var list = JSON.parse(body);
//       list.data.forEach(function(beer) {
//         console.log(beer.name);
//       });
//     }
// }



module.exports = recommendedRepos;


