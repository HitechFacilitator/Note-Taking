const mongoose = require("mongoose");

const noteModel = require("../Models/note.model");
const createHttpError = require("http-errors");

//  Getting all notes
exports.getAll = async (req, res, next) => {
  try {
    // throw Error("Hello Error")
    const notes = await noteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) { 
    next(createHttpError.InternalServerError("An error was encountered when getting All Notes"))
  }
};

//  Creating a note 
exports.create = async (req, res, next) =>{
  const title = req.body.title
  const text = req.body.text
  try {
    if (!title) {
      throw createHttpError(400, "A Note need a Title. Enter a Title")
    }
    const note = await noteModel.findOne({title: title})
    if (note) {
      console.log(note.title);
      return res.status(302).json("This Note Title is already been used by another Note")
    }
    const newNote = await noteModel.create({
      title: title,
      text: text
    })
    res.status(201).json(newNote)
  } catch (error) {
    next(error)
  }
}

//  Getting a node by it title 
exports.getByTitle = async (req, res, next) =>{
  const titl = req.body.title
  try {
    if (!titl) {
      throw createHttpError(400, "Enter the Note's Title you are looking for")
    }
    const note = await noteModel.findOne({title: titl}).exec()
    if (note == null) {
      res.status(404).json("The note do not exist")
    }
    res.status(302).json(note)
  } catch (error) {
    next(error)
  }
}

//  Getting a node by it ID
exports.getById = async (req, res, next) =>{
  const id = req.body.id
  try {
    if (!id) {
      throw createHttpError(400, "Enter the Note's ID you are looking for")
    }
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Enter a valid Note ID")
    }
    const note = await noteModel.findById(id)
    if (note == null) {
      res.status(404).json("The note do not exist")
    }
    res.status(302).json(note)
  } catch (error) {
    next(error)
  }
}

exports.deleteByTitle = async (req, res, next) =>{
  const titl = req.body.title
  try {
    const delNote = await noteModel.deleteOne({title: titl}).exec()
    if (delNote.deletedCount == 0) {
      res.status(404).json("The note was not deleted because it does not exist")
    }
    res.status(200).json({message : "The note with title: "+titl+" was successfully deleted"})
  } catch (error) {
    next(error)
  }
}

exports.deleteAll = async (req, res, next) =>{
  try {
    const delAll = await noteModel.deleteMany().exec()
    if (delAll.deletedCount == 0) {
      res.status(204).json("The note DB is empty")
    }
    res.status(200).json({message : "All notes where successfully deleted"})
  } catch (error) {
    next(error)
  }
}