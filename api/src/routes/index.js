const express = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Pais } = require('../db');
const countries = require("./countries");
const activities = require("./activities")
const router = express();
const axios = require("axios").default;

axios.get("https://restcountries.com/v2/all")
    .then(async response => {
        await Pais.sync({ force: true })
        response.data.map(async pais => {
            if(pais.capital){
                await Pais.create({
                    id: pais.alpha3Code,
                    nombre: pais.name,
                    bandera: pais.flags[0],
                    continente: pais.continent,
                    capital: pais.capital,
                    subregion: pais.region,
                    area: pais.area,
                    poblacion: pais.population
                })
            }
        })
    });

router.use("/api", countries);
router.use("/api", activities);

module.exports = router;