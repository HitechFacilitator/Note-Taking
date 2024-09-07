const express = require("express");

const noteModel = require("../Models/note.model");

//  Getting all notes
exports.getAll = async (req, res, next) => {
  try {
    // throw Error("Hello Error")
    const notes = await noteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) { 
    next(error)
  }
};
