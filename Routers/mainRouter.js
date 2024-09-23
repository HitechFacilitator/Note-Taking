const express = require("express");
var router = express.Router();

// importing secondary route files
const notes = require("./notes.route");
const users = require("./user.router");

router.get("", (req, res) => {
  res.json({message: "WELCOME TO YOUR NOTE_TAKING APP"})
});

// redirectiong to other routes
router.use("/note", notes);
router.use("/user", users)

module.exports = router;
