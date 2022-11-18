const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  user_id:{
    type: String,
    required: true
  },
  rut: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true
  },
  telefono: {
    type: String,
    required: true
  },
  cuenta: {
    id: {
      type: Number,
      required: true
    },
    des: {
      type: String,
      required: true
    }
  },
  banco_destino:{
    id: {
      type: Number,
      required: true
    },
    nombre: {
      type: String,
      required: true
    }
  }
});

module.exports = mongoose.model('Contact', contactSchema)