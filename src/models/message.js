const mongoose = require("mongoose");

const schema = mongoose.Schema({
  mensaje: { type: String, max: 400 },
  autor: { type: String, max: 200 },
  email: { type: String, require: true, unique: true },
  timestamp: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Mensajes", schema);
