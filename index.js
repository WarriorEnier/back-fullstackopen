require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

let notes = require("./db");
app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
  res.send("<h1>Hola Mundo</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  note ? res.json(note) : res.status(400).end();
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(typeof id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    id: generateId(),
    content: body.content,
    important: body.important || false,
    date: Date.now(),
  };

  notes = [...notes, note];
  res.json(note);
});

app.put("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const noteIndex = notes.findIndex((note) => note.id === id);
  if (noteIndex !== -1) {
    const updateNote = { ...notes[noteIndex], ...req.body };
    notes[noteIndex] = updateNote;
    res.json(updateNote);
  } else {
    res.status(404).json({ error: "Note not found" });
  }
});
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor corriendo ene l puerto ${PORT}`);
});
