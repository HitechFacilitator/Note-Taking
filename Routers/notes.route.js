const express = require("express");
const rRouter = express.Router();

const note = require('../Controllers/note.controller')

rRouter.get("/", (req, res) => {
  res.json({ message: "Welcome in the NOTES Section" });
});

rRouter.post('/create', note.create)
rRouter.get('/getByTitle', note.getByTitle)
rRouter.get('/getById', note.getById)
rRouter.get('/getAll', note.getAll)
rRouter.patch('/update', note.updateNote)
rRouter.delete('/deleteByTitle', note.deleteByTitle)
rRouter.delete('/deleteById', note.deleteById)
rRouter.delete('/deleteAll', note.deleteAll)

module.exports = rRouter;
