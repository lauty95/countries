import React from "react";
import { useState, useEffect } from 'react';
//import { Link, Route } from 'react-router-dom'

import Cards from '../components/cards'


export default function ApiPages() {
    const [country, setCountry] = useState([]);
    const [page, setPage] = useState(0);
  
    const nextPage = function () {
        setPage(page + 10)
    }
    const prevPage = function () {
        if (page > 0) setPage(page - 10)
    }
    
    useEffect(() => {
      fetch(`http://localhost:3001/api/countries`)
        .then(res => res.json())
        .then(data => setCountry(data))
    }, []);

    
    return (
        <>
        <Cards paises={country.slice(page,page + 10)}/>
        <button onClick={prevPage}>Anterior</button>
        <button onClick={nextPage}>Siguiente</button>
        </>
    )
}