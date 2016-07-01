var http = require("http");

var requestOptions = {
  host: "example.com",
  path: "/"
};

http.get(requestOptions, (response) => {    // HTTP Response Callback

  response.setEncoding("utf8");             // Use UTF-8 encoding

  response.on("data", function print(data) {           // On Data Received
    console.log(data);
  });

  response.on("end", function (data) {                // On Data Completed
    console.log("Response stream complete.");
  });

});

function printExampleHTML(callback) {
  callback(print);
}