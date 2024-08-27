// importing dependencies
const express = require("express");
const dotenv = require("dotenv");

// importing files
const connection = require("./config/db.config");

// setting up the dependencies for use
const app = express();
dotenv.config();

const port = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Hello World !!");
});

app.listen(port, () => {
  console.log("App running on http://localhost:" + port);
});
