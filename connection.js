//require("dotenv").config();
const mongoose = require("mongoose");
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



