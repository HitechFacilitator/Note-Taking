// importing dependencies
const express = require("express");
const dotenv = require("dotenv");

// importing files
const connection = require("./Config/db.config");
const NoteModel = require("./Models/note.model");
const router = require("./Routers/mainRouter")

// setting up the dependencies for use
const app = express();
dotenv.config();

const port = process.env.PORT;

app.use("/", router)

// setting port and listenning for http request
app.listen(port, () => {
  console.log("App running on http://localhost:" + port);
});
