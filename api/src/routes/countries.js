const { Pais } = require('../db');
const express = require('express');
const { Op } = require('sequelize');
const router = express();

var continentes = function (arr) {
    let continente = []
    for (let i = 0; i < arr.length; i++) {
        let valor = arr[i].continente;
        if (continente.indexOf(valor) === -1) {
            continente.push(valor)
        }
    }
    continente.pop()
    return continente;
}

router.get("/countries", async (req, res) => {
    var paises = await Pais.findAll({
        attributes: ['nombre', 'bandera', 'continente']
    })
    res.json(paises);
});

router.get("/countriesOrderByPopulation", async (req, res) => {
    var paises = await Pais.findAll({
        attributes: ['nombre', 'bandera', 'continente'],
        order:['poblacion']
    })
    res.json(paises);
});

router.get("/continents", async (req, res) => {
    const paises = await Pais.findAll({
        attributes: ['continente']
    });
    var respuesta = continentes(paises);
    res.json(respuesta);
});

router.get("/countries/:idPais", async (req, res) => {
    const { idPais } = req.params;
    const pais = await Pais.findByPk(idPais);
    res.json(pais || 'Country not found')
});

router.get("/countries/name/:name", async (req, res) => {
    const { name } = req.params;
    const condition = name ?
        {
            where: {
                nombre: {
                    [Op.iLike]: `${name}%`
                }
            }
        }
        : {}
    const results = await Pais.findAll(condition);
    res.json(results.length ? results : 'Country not found');
})

module.exports = router;