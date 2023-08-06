const { Schema, model } = require("mongoose");
const noteSchema = new Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  date: Date,
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = model("Note", noteSchema);

module.exports = Note;
/* Note.find({}).then(res =>{
  console.log('---------');
  console.log(res);
  mongoose.connection.close()
}) */

/* const note = new Note({
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
 */
