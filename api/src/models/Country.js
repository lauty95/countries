const { DataTypes, Op } = require('sequelize');

module.exports = (sequelize) => {
  const Pais = sequelize.define('pais', {
    id: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    bandera: { type: DataTypes.TEXT, allowNull: false },
    continente: { type: DataTypes.STRING, allowNull: false },
    capital: { type: DataTypes.STRING, allowNull: false },
    subregion: { type: DataTypes.STRING },
    area: { type: DataTypes.DOUBLE },
    poblacion: { type: DataTypes.INTEGER }
  });

  const Actividad = sequelize.define('actividad', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    nombre: { type: DataTypes.STRING },
    dificultad: { type: DataTypes.INTEGER, [Op.between]: [1, 5] },
    duracion: { type: DataTypes.INTEGER },
    temporada: { type: DataTypes.ENUM('Verano', 'Otoño', 'Primavera', 'Invierno') }
  })
};
