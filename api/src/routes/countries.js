const { Pais } = require('../db');
const express = require('express');
const { Op } = require('sequelize');
const router = express();

router.get("/countries", async (req, res) => {
    const paises = await Pais.findAll()
    res.json(paises);
});

router.get("/countries/:idPais", async (req, res) => {
    const { idPais } = req.params;
    const pais = await Pais.findByPk(idPais);
    res.json(pais || 'Country not found')
});

router.get("/countries/name/:name", async (req, res) => {
    const { name } = req.params;
    const condition = name ? 
    {where: {
        nombre: {
            [Op.iLike]: `${name}%`
        }
    }}
    : {}
    const results = await Pais.findAll(condition);
    res.json(results.length ? results : 'Country not found');
})

module.exports = router;