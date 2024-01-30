const notesRouter = require("express").Router();
const { readFromFile, readAndAppend } = require("../helper/fsUtils");
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
    const newTip = {
      title,
      note,
      notes_id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Tip added successfully`);
  } else {
    res.error('Error in adding tip');
  }
});


module.exports = notesRouter;