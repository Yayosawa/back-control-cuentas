const express = require("express");
const mongoose = require("mongoose")
require("dotenv").config();
const cors = require('cors');
const userRoutes = require("./routes/user");
const contactRoutes = require("./routes/contact");
const transferRoutes = require("./routes/transfer");
const loginRoute = require("./routes/login");

const app = express();
const port = process.env.PORT || 9000;
app.use(cors());

// MIDDLEWARE
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', contactRoutes);
app.use('/api', transferRoutes);
app.use(loginRoute);

// RUTAS
/* app.get("/", (req,res,next) => {
  res.send("Prueba api")
}) */

// Conecion Mongo atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("CONEXIÓN MONGODB OK"))
  .catch((error) => console.error(error))

app.listen(port, () => console.log('SERVIDOR EN PUERTO ', port))