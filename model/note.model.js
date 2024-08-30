const mongoose = require('mongoose')
const { Schema} = require("mongoose");

// creating our note schema 
const noteSchema = new Schema({
  title : {
    type: String,
    required: true
  },
  text : {
    type: String
  }
}, {timestamps: true});//timestamps to add the "created at" and "modified at" fields

module.exports = mongoose.model("Note", noteSchema);