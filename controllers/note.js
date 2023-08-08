const notesRouter = require("express").Router();
const Note = require("../models/Note");

notesRouter.get("/", (req, res) => {
  Note.find({}).then((notes) => res.json(notes));
});

notesRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Note.findById(id)
    .then((note) =>
      note
        ? res.json(note)
        : res.status(404).json({ error: "Note not found" }).end()
    )
    .catch((err) => {
      next(err);
    });
});

notesRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Note.findOneAndDelete({ _id: id })
    .then((note) =>
      note
        ? res.status(204).json(note).end()
        : res.status(404).json({ error: "Note not found" }).end()
    )
    .catch((err) => {
      next(err);
    });
});

notesRouter.post("/", (req, res, next) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: Date.now(),
  });
  note
    .save()
    .then((saveNote) => res.json(saveNote))
    .catch((err) => {
      next(err);
    });
});

notesRouter.put("/:id", (req, res, next) => {
  const id = req.params.id;
  Note.findByIdAndUpdate(id, req.body, { new: true })
    .then((note) =>
      note
        ? res.json(note)
        : res.status(404).json({ error: "Note not found" }).end()
    )
    .catch((err) => {
      next(err);
    });
});

module.exports = notesRouter;
