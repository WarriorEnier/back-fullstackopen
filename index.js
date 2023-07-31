require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
let notes = require("./db");

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
    important: body.important || Math.random() > 0.5,
    date: Date.now(),
  };

  notes = [...notes, note];
  res.json(note);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor corriendo ene l puerto ${PORT}`);
});
