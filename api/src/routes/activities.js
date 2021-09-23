const { Actividad, Pais } = require('../db');
const express = require('express');
const router = express();

var idActividad = 1

router.post("/activity", async (req, res) => {
    const { nombre, dificultad, duracion, temporada, idPais } = req.body
    try {
        const newActivity = await Actividad.create ({
            id: idActividad++,
            nombre,
            dificultad,
            duracion,
            temporada,
            idPais
        });
        newActivity.addPais(idPais)
        res.json(newActivity)
    } catch (e) {
        res.send(e);
    }
})

router.get("/mixin", async (req, res) => {
    const { idCountry} = req.query;
    const actividad = await Actividad.findAll({
        where: {
            idPais: idCountry
        }
    })
    res.json(actividad)
})

module.exports = router;