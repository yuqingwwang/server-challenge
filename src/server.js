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
/*
Create a new route GET /cheese.
It should return an HTML response containing a form for submitting new cheeses.
The form should send POST requests to the same page.
It should include a text input for the cheese name and a range input for the cheese's rating (from 0 to 5).
*/
const cheeseRatings = [];
server.get("/cheese", (req, res) => {
  const cheeseList = cheeseRatings.map((cheese) => `<li>${cheese.name} - ${cheese.rating}</li>`);

  const html = `
    <form method="POST">
      <label for="name">Cheese name</label>
      <input type="text" name="name">
      <label for="rating">Rating</label>
      <input type="range" name="rating" min="0" max="5">
      <button type="submit">Add cheese</button>
    </form>
    <ul>
      ${cheeseList.join("")}
    </ul>
  `
  res.send(html);
})

/*
Create a new route POST /cheese. It should receive the POST request from the previous form and use the built-in Express middleware to read the url-encoded request body.

It should store each cheese rating in an array outside of the handler function, so other routes can access this information. Once the new rating is pushed to this array it should redirect back to the same page.

Submitting the form should result in the page reloading and displaying the newly added cheese in the list.
*/

server.post("/cheese", express.urlencoded({ extended: true }), (req, res) => {
  const { name, rating } = req.body;
  cheeseRatings.push({ name, rating });
  res.redirect("/cheese");
});


module.exports = server;
