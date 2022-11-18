const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { verifyToken } = require("../commons/auth");

// Crear Usuario
router.post('/user', (req, res) => {
  const {name, email, pass} = userSchema(req.body);

  bcrypt.hash(pass, Number(process.env.BCRYPT_SALT_ROUNDS), (err, hashedPassword) => {
    if(err){
      console.log(err)
      res.status(400).json({message: err})
    }
    else{
      const newUser = userSchema({name: name, email: email, pass: hashedPassword});
      newUser
      .save()
      .then(() => {
        const token = jwt.sign({_id: newUser._id}, 'secretkey');
        res.status(200).json({token});
      })
      .catch((error) => res.json({message: error}))
    }
  })

})

// Listar Usuarios
router.get('/user', verifyToken, (req,res,next) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

// Buscar Usuario
router.get('/user/:id', (req,res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

// Actualizar Usuario
router.put('/user/:id', (req,res) => {
  const { id } = req.params;
  const { name, email, pass} = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, email, pass }})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

// Eliminar Usuario
router.delete('/user/:id', (req,res) => {
  const { id } = req.params;
  userSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

module.exports = router;
