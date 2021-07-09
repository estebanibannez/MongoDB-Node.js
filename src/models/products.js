const mongoose = require("mongoose");

const schema = mongoose.Schema({
  nombre: { type: String, required: true, max: 100 },
  descripcion: { type: String, required: true, max: 300 },
  codigo: { type: Number, unique: true },
  precio: { type: Number },
  foto: { type: String },
  stock: { type: Number },
});

module.exports = mongoose.model("Productos", schema);
