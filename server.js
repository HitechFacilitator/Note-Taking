// importing dependencies
const express = require("express");
const dotenv = require("dotenv");

// importing files
const connection = require("./config/db.config");
const NoteModel = require("./model/note.model");

// setting up the dependencies for use
const app = express();
dotenv.config();

const port = process.env.PORT;
app.get("/", async (req, res) => {
  try {
    // throw Error("Moise");

    //  Getting all notes
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error encountered", error);
    let errorMessage = "An unknown error was encountered";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({ error: errorMessage });
  }
});

// app listener
app.listen(port, () => {
  console.log("App running on http://localhost:" + port);
});
