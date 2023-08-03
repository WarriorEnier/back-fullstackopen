require("./connection");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Note = require("./models/Note");

let notes = require("./db");
const notFound = require("./middleware/notFound");
const handleErrors = require("./middleware/handleErrors");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hola Mundo</h1>");
});

app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => res.json(notes));
});

app.get("/api/notes/:id", (req, res, next) => {
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

app.delete("/api/notes/:id", (req, res, next) => {
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

app.post("/api/notes", (req, res, next) => {
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

app.put("/api/notes/:id", (req, res, next) => {
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

app.use(notFound);
app.use(handleErrors);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor corriendo ene l puerto ${PORT}`);
});
