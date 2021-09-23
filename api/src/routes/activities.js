const { Actividad, Pais } = require('../db');
const express = require('express');
const router = express();
const { Op } = require('sequelize')

var idActividad = 1

router.post("/activity", async (req, res) => {
    const { nombre, dificultad, duracion, temporada, idPais } = req.body
    try {
        const newActivity = await Actividad.create({
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

router.get("/activity", async (req, res) => {
    let listaID = []
    let activities = []
    let paises = []
    var pais = []
    activities = await Actividad.findAll({ raw: true })
    activities.map(a => listaID.push({ id: a.idPais }))

    paises = await Pais.findAll({
        where: {
            [Op.or]: listaID
        },
        raw: true
    })
    for (let i = 0; i < activities.length; i++) {
        pais = (paises.filter(p => p.id === activities[i].idPais))
        activities[i]["pais"] = pais[0].nombre
    }

    res.json(activities)
})

router.get("/mixin", async (req, res) => {
    const { idCountry } = req.query;
    const actividad = await Actividad.findAll({
        where: {
            idPais: idCountry
        }
    })
    res.json(actividad)
})

module.exports = router;