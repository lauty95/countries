import React from "react";
import { useState, useEffect } from 'react';
import s from './countryDetail.module.css'
import Botones from './../botones'
import { Link } from 'react-router-dom'

export default function CountryDetails({ nombre }) {
  const [country, setCountry] = useState({});
  const [activity, setActivity] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3001/api/countries/name/${nombre}`)
      .then(res => res.json())
      .then(data => setCountry(data[0]))

    fetch(`http://localhost:3001/api/mixin/?idCountry=${country.id}`)
      .then(data => data.json())
      .then(data => setActivity(data))
  }, [country.id, nombre]);


  function area(valor) {
    if (!valor) return
    if (valor > 1000000) {
      return Math.round(valor / 1000000 * 100) / 100 + " Millones de Km cuadrados"
    } else if (valor > 100000) {
      return (valor / 1000 + " Km cuadrados")
    } else if (valor > 10000) {
      return valor / 1000 + " Km cuadrados"
    } else {
      return valor + "metros cuadrados"
    }
  }

  function numerar(valor) {
    if (!valor) return
    let res = []
    const newNumber = valor.toString().split('').reverse().join('')
    for (let i = 1; i <= newNumber.length; i++) {
      if (i % 3 - 1 === 0) res.push('.')
      res.push(newNumber[i - 1])
    }
    res.shift()
    res = res.reverse().join('')
    return res;
  }

  return (
    <div className={s.container}>
      <div className={s.volver}><Link to="/api"> <Botones prop="Volver" /></Link></div>
      <h1>{country.nombre}</h1>
      <img className={s.bandera} type="image/svg+xml" alt="bandera nacional" src={country.bandera} />
      <h3>Código del pais: {country.id}</h3>
      <p>Pertenece al continente de <b>{country.continente}</b>, y su capital se llama <b>{country.capital}</b>.</p>
      <p>Pertenece a la subregión de <b>{country.subregion}</b>, y posee un área de <b>area of {area(country.area)}</b></p>
      <p>Según nuestros registros, este pais posee una población de <b>{numerar(country.poblacion)}</b> personas.</p>
      <hr></hr>
      {activity.length > 0 ? activity.map((act) => <Actividad key={act.id} props={act} />) : <h2>No hay actividades</h2>}

    </div>
  )

}

function Actividad({ props }) {
  return (
    <div className={s.actividad}>
      <h2>Actividad {props.nombre}</h2>
      <p>Se recomienda hacer en {props.temporada}</p>
      <p>Dura {props.duracion} minutos</p>
      <p>Dificultad (del 1 al 5) {props.dificultad}</p>
    </div>
  )
}