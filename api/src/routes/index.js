const express = require('express');
const { Pais } = require('../db');
const countries = require("./countries");
const activities = require("./activities")
const router = express();
const axios = require("axios").default;
const paises = require("./../countries.json")

function cargarDB(pais) {
    return {
        id: pais.alpha3Code,
        nombre: pais.name,
        bandera: pais.flags.svg,
        continente: pais.region,
        capital: pais.capital,
        subregion: pais.region,
        area: pais.area,
        poblacion: pais.population,
    }
}

// axios.get("https://restcountries.com/v2/all")
//     .then(async response => {
//         await Pais.sync({ force: false })
//         response.data.map(async pais => {
//             if(pais.flags && pais.capital){
//                 await Pais.create({
//                     id: pais.alpha3Code,
//                     nombre: pais.name,
//                     bandera: pais.flags.svg,
//                     continente: pais.region,
//                     capital: pais.capital,
//                     subregion: pais.region,
//                     area: pais.area,
//                     poblacion: pais.population,
//                 })
//             }
//         })
//     });

paises.map(async p => await Pais.create(cargarDB(p)))

router.use("/api", countries);
router.use("/api", activities);

module.exports = router;