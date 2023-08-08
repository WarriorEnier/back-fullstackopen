require("./connection");
const express = require("express");
const app = express();
const cors = require("cors");
const notesRouter = require("./controllers/note");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);

app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

module.exports = app;
