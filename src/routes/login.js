const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

router.post('/login', async (req, res) => {
  const { email, pass } = req.body;
  const user = await userSchema.findOne({email});
  if(!user) return res.status(401).send("El correo no existe");

  bcrypt.compare(pass, user.pass, (err, same) => {
    if(same){
      const token = jwt.sign({_id:user._id}, 'secretkey');
      return res.status(200).json({token: token, user_id: user._id});
    }
    else{
      return res.status(401).send("Contraseña incorrecta");
    }
  })
})

module.exports = router;