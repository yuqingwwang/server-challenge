const express = require("express");

const server = express();

// Create a new route for the homepage at GET /.
// return an HTML body including a <h1>Hello Express</h1>.
server.get("/", (request, response) => {
  response.send("<h1>Hello Express</h1>");
});


// Create a new route at GET /colour.
// check the URL's search parameters for a hex property.
// If present the returned HTML page should have its <body> element's background-color set to the hex value.
// If hex is not present the background should be white.

// server.get("/colour", (req, res) => {
//   const hex = req.query.hex || "ffffff";
//   const html = `
//     <style>
//       body {
//         background-color: #${hex};
//       }
//     </style>
//   `;
//   res.send(html);
// });

/*
Edit your GET /colour route to include a form in the HTML response.
This form should include an input for the user to type in a hex code.
When the form is submitted a GET request will be sent to the same route,
which will change the background of the page to whatever the user entered.
*/

server.get("/colour", (req, res) => {
  const hex = req.query.hex || "ffffff";
  const html = `
    <style>
      body {
        background-color: #${hex};
      }
    </style>
    <form>
      <label for="hex">Enter a hex colour code</label>
      <input type="text" name="hex" value="${hex}">
    </form>
  `;
  res.send(html);
});

module.exports = server;
