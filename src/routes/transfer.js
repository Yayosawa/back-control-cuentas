const express = require("express");
const { verifyToken } = require("../commons/auth");
const transferSchema = require("../models/transfer");

const router = express.Router();

// Crear Transferencia
router.post('/transfer', (req,res) => {
  const newTransfer = transferSchema(req.body);
  newTransfer
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

// Listar Transferencias
router.get('/transfer', verifyToken, (req,res) => {
  transferSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

// Buscar Transferencia
router.get('/transfer/:id', (req,res) => {
  const { id } = req.params;
  transferSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

// Actualizar Transferencia
router.put('/transfer/:id', (req,res) => {
  const { id } = req.params;
  const { user_id, contact_id, contact_name, amount } = req.body;
  transferSchema
    .updateOne({ _id: id }, { $set: { user_id, contact_id, contact_name, amount }})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

// Eliminar Transferencia
router.delete('/transfer/:id', (req,res) => {
  const { id } = req.params;
  transferSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

module.exports = router;