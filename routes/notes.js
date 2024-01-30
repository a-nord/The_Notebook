const notesRouter = require("express").Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const uuid = require('../helpers/uuid');

//GET Route for all notes
notesRouter.get("/", (req, res) => {
	readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//POST Route for new notes
notesRouter.post("/", (req, res) => {
	console.log(req.body);

  const { title, note } = req.body;

  if (req.body) {
    const newNote = {
      title,
      note,
      notes_id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});


module.exports = notesRouter;