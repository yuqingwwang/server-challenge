const express = require("express");

const server = express();

// Create a new route for the homepage at GET /.
// It should return an HTML body including a <h1>Hello Express</h1>.
server.get("/", (request, response) => {
  response.send("<h1>Hello Express</h1>");
});


//Create a new route at GET /colour.
//It should check the URL's search parameters for a hex property.
//If present the returned HTML page should have its <body> element's background-color set to the hex value.
//E.g. this request GET /colour?hex=ff0000 should result in an HTML page with a red background.
//If hex is not present the background should be white.

server.get("/colour", (request, response) => {
  const hex = request.query.hex;
  if (hex) {
    response.send(`<body style="background-color: #${hex}">`);
  } else {
    response.send(`<body style="background-color: #ffffff">`);
  }
});

module.exports = server;
