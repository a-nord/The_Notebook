const notesRouter = require("express").Router();
const { readFromFile, readAndAppend, writeToFile } = require("../helpers/fsUtils");
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

// DELETE Route for a specific note
notesRouter.delete('/:notes_id', (req, res) => {
  const notesId = req.params.notes_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all tips except the one with the ID provided in the URL
      const result = json.filter((note) => note.notes_id != notesId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${notesId} has been deleted 🗑️`);
    });
});


module.exports = notesRouter;