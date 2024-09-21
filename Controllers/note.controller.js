const createHttpError = require("http-errors");
const mongoose = require("mongoose");

const noteModel = require("../Models/note.model");
const verifHandler = require("../Middleware/verifHandler")

//  CRUD Operarions 
//  Creating a note 
exports.create = async (req, res, next) =>{
  const title = req.body.title
  const text = req.body.text
  try {
    verifHandler.verifEmpty(title, "A Note most have a Title", next)
    const note = await noteModel.findOne({title: title})
    if (note) {
      next (createHttpError[403]("This Note Title is already been used by another Note"))    
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
    verifHandler.verifEmpty(titl, "Enter the Note's Title for the research", next)
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
  const id = req.body.Id
  try {
    verifHandler.verifEmpty(id, "Enter the ID of the Note you are looking for", next)
    verifHandler.verifID(id, next)
    const note = await noteModel.findById(id)
    if (note == null) {
      res.status(404).json("The note do not exist")
    }
    res.status(302).json(note)
  } catch (error) {
    next(error)
  }
}

//  Getting all notes
exports.getAll = async (req, res, next) => {
  try {
    // throw Error()
    const notes = await noteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) { 
    next(createHttpError.InternalServerError("An error was encountered when getting All Notes"))
  }
};

//  Updating a Note 
exports.updateNote = async (req, res, next) =>{
  const nTitle = req.body.newTitle
  const nText = req.body.newText
  const id =req.body.Id
  try {
    verifHandler.verifID(id, next)
    verifHandler.verifEmpty(nTitle, "Enter the Note's New Title", next)
    const note = await noteModel.findById(id)
    verifHandler.verifEmpty(note, "Note to be updated wasn't found", next)
    note.title = nTitle
    note.text = nText
    const updatedNote = await note.save()
    res.status(200).json(updatedNote)
  } catch (error) {
    next(createHttpError.InternalServerError("An Error was face while updating the Note"))
  }
}

//  Deleting note using Id
exports.deleteById = async (req, res, next) =>{
  const id = req.body.Id
  try {
    verifHandler.verifEmpty(id, "Enter the ID of the Note you want to delete", next)
    verifHandler.verifID(id, next)
    const note = await noteModel.findById(id)
    verifHandler.verifEmpty(note, "Note to be deleted wasn't found", next)
    await noteModel.deleteOne({_id : id})
    res.status(200).json({message: "The note with ID: "+id+" was successfully deleted"})
  } catch (error) {
    next(error)
  }
}

//  Deleting note using Title
exports.deleteByTitle = async (req, res, next) =>{
  const titl = req.body.title
  try {
    verifHandler.verifEmpty(titl, "Enter the Note's Title to be deleted", next)
    const delNote = await noteModel.deleteOne({title: titl}).exec()
    if (delNote.deletedCount == 0) {
      res.status(404).json("The note was not deleted because it does not exist")
    }
    res.status(200).json({message : "The note with title: "+titl+" was successfully deleted"})
  } catch (error) {
    next(error)
  }
}

//  Deleting All notes
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