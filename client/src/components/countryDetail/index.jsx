import React from "react";
import { useState, useEffect } from 'react';

export default function CountryDetails ({id}) {

    const [country, setCountry] = useState({});
  
    useEffect(() => {
      fetch(`http://localhost:3001/api/countries/${id}`)
        .then(res => res.json())
        .then(data => setCountry(data))
    }, [id]); 

    function area (valor) {
        if (!valor) return 
        if (valor > 1000000){
          return Math.round(valor / 1000000 *100) /100 + " Millones de Km cuadrados"
        } else if (valor > 100000){
          return (valor / 1000 + " Km cuadrados")
        } else if (valor > 10000) {
          return valor / 1000 + " Km cuadrados"
        } else {
          return valor + "metros cuadrados"
        }
      }

      function numerar (valor) {
          if (!valor) return
        let res = []
        const newNumber = valor.toString().split('').reverse().join('')
        for (let i = 1; i <= newNumber.length; i++){
          if (i%3 -1 === 0) res.push('.')
          res.push(newNumber[i-1])
        }
        res.shift()
        res = res.reverse().join('')
        return res;
      }

    return (
        <>
            <h1>{country.nombre}</h1>
            <img type="image/svg+xml" alt="bandera nacional" src={country.bandera} />
            <p>His continent is called <b>{country.continente}</b> and his capital is <b>{country.capital}</b>.</p>
            <p>Belongs to the subregion of <b>{country.subregion}</b> which has an <b>area of {area(country.area)}</b></p>
            <p>In our las register, this Country has a population of <b>{numerar(country.poblacion)} </b></p>
        </>
    )

}