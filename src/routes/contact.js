const express = require("express");
const { verifyToken } = require("../commons/auth");
const contactSchema = require("../models/contact");

const router = express.Router();

// Crear Contacto
router.post('/contact', verifyToken, (req,res) => {
  const newContact = contactSchema(req.body);
  newContact
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

// Listar Contactos
router.get('/contact', (req,res) => {
  contactSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

// Buscar Contacto
router.get('/contact/:id', (req,res) => {
  const { id } = req.params;
  contactSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

// Actualizar Contacto
router.put('/contact/:id', (req,res) => {
  const { id } = req.params;
  const { rut, nombre, correo, telefono, cuenta, banco_destino } = req.body;
  contactSchema
    .updateOne({ _id: id }, { $set: { rut, nombre, correo, telefono, cuenta, banco_destino }})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

// Eliminar Contacto
router.delete('/contact/:id', (req,res) => {
  const { id } = req.params;
  contactSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

module.exports = router;