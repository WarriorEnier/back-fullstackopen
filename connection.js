require("dotenv").config();
const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const conection = `mongodb+srv://guerreroenier:${process.env.PASS}@cluster0.jh4yiyw.mongodb.net/app-notes-fullstackopen?retryWrites=true&w=majority`;

//conexion a mongoose
mongoose
  .connect(conection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Todo va bien");
  })
  .catch((err) => console.log("todo va mal", err));

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = model("Note", noteSchema);

const note = new Note({
  content: "Probando con mongoDB",
  date: new Date(),
  important: true,
});

note
  .save()
  .then((res) => {
    console.log(res);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(err);
  });
