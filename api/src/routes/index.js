const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//const { Pais, Actividad } = require("../models")
const countries = require("./countries");
const router = Router();

router.use("/countries", countries)

module.exports = router;
