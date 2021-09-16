const { Actividad, Pais } = require('../db');
const express = require('express');
const router = express();

var idActividad = 1

router.post("/activity", async (req, res) => {
    const { id, nombre, dificultad, duracion, temporada, idPais } = req.body
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

module.exports = router;