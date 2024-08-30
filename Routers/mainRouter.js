const express = require("express");
var router = express.Router();

// importing secondary route files
const notes = require("./notes.route");

router.get("", (req, res) => {
  res.json({message: "WELCOME TO YOUR NOTE_TAKING APP"})
});

// redirectiong to other routes
router.use("/note", notes);

module.exports = router;
