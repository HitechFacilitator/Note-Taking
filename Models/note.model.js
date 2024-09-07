const mongoose = require('mongoose')
const { Schema} = require("mongoose");
const connection = require("../Config/db.config");

// defining our note schema 
const noteSchema = new Schema({
  title : {
    type: String,
    required: true
  },
  text : {
    type: String
  }
}, {timestamps: true});//timestamps to add the "created at" and "modified at" fields

// creating our schema  
const Note = mongoose.model("Note", noteSchema);

module.exports = Note