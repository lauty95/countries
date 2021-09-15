const { Router } = require("express");
const axios = require("axios").default;
const router = Router();

const listCountry = []

router.get("/", (req, res) => {
    axios.get("https://restcountries.eu/rest/v2/all")
        .then(response => res.json(response.data))
})

router.get("/test", (req, res) => {
    axios.get("https://restcountries.eu/rest/v2/all")
        .then(response => {
            response.data.map(pais => {
                listCountry.push({
                    id: pais.alpha3Code,
                    nombre: pais.name,
                    bandera: pais.flag,
                    continente: pais.region,
                    subregion: pais.subregion,
                    area: pais.area,
                    poblacion: pais.population
                })
            })
        })
        .then(res.json(listCountry))
})

module.exports = router;