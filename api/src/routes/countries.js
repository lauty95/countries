const { Router } = require("express");
const axios = require("axios").default;
const router = Router();
const { Pais } = require("../db")

router.get("/", (req, res) => {
    axios.get("https://restcountries.eu/rest/v2/all")
        .then(response => res.json(response.data))
})

router.get("/CountriesInDB", (req, res) => {
    axios.get("https://restcountries.eu/rest/v2/all")
        .then(async response => {
            await Pais.sync({ force: true })
            response.data.map(async pais => {
                await Pais.create({
                    id: pais.alpha3Code,
                    nombre: pais.name,
                    bandera: pais.flag,
                    continente: pais.region,
                    capital: pais.capital,
                    subregion: pais.subregion,
                    area: pais.area,
                    poblacion: pais.population
                })
            })
        })
        .then(() => res.status(200).json({ msg: "Datos guardados en la Base de Datos Correctamente"}))
        .catch(() => res.status(404).json({msg: "Hubo un error"}))
})

module.exports = router;