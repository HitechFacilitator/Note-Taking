const express = require("express");
const rRouter = express.Router();

const note = require('../Controllers/note.controller')

rRouter.get("/", (req, res) => {
  res.json({ message: "Welcome in the NOTES Section" });
});

rRouter.get('/getAll', note.getAll)

module.exports = rRouter;
