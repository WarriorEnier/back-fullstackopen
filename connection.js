const config = require("./utils/config")
const mongoose = require("mongoose");
const logger = require('./utils/logger')
const conection = `mongodb+srv://guerreroenier:${config.PASS}@cluster0.jh4yiyw.mongodb.net/app-notes-fullstackopen?retryWrites=true&w=majority`;

//conexion a mongoose
mongoose
  .connect(conection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Todo va bien");
  })
  .catch((err) => logger.error("todo va mal", err));



