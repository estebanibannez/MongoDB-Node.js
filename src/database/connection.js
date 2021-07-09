// module of connection to the database.
const config = require("../config/config.json");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

// obtengo el puerto del enviroment o lo seteo por defecto
const MONGO_URL = process.env.MONGO_URL || config.MONGO_URL;

const connection = mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log("conexion a la base de datos realizada!", MONGO_URL);
  })
  .catch((err) => {
    console.log("ocurrio un error!", err);
  });

// const connection = mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose.connection.on('connected', () => {
//     console.log('[Mongoose] - connected in:', MONGO_URL);
// });

// mongoose.connection.on("error", (err) => {
//   console.log("[Mongoose] - error:", err);
// });

module.exports = connection;
