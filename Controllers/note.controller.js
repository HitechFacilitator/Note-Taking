const express = require("express");

const noteModel = require("../Models/note.model");

//  Getting all notes
exports.getAll = async (req, res) => {
  try {
    const notes = await noteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error encountered", error);
    let errorMessage = "An unknown error was encountered";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({ error: errorMessage });
  }
};
