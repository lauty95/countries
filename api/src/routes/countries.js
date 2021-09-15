const { Pais } = require('../db');
const { Router } = require('express');
const axios = require("axios").default;
const router = Router();+



router.get("/countries", async(req, res) => {

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
    .then(() => res.status(200))
    .catch(() => res.status(404).json({ msg: "Hubo un error" }))

    Pais.findAll().then (data => {
        res.json(data);
    })
});

router.get("/countries/:idPais", async(req, res) => {
    const {idPais} = req.params;
    console.log(idPais)
    const pais = await Pais.findByPk(idPais);
    res.json(pais || 'Country not found')
});



module.exports = router;