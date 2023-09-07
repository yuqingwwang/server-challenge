const express = require("express");

const server = express();

server.get("/", (request, response) => {
  response.send("<h1>Hello Express</h1>");
});

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

server.post("/cheese", express.urlencoded({ extended: true }), (req, res) => {
  const { name, rating } = req.body;
  cheeseRatings.push({ name, rating });
  res.redirect("/cheese");
});

module.exports = server;
