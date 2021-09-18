import React from "react";
import { useState, useEffect } from 'react';
//import { Link, Route } from 'react-router-dom'

import Cards from '../components/cards'


export default function ApiPages() {
    const [country, setCountry] = useState([]);
    const [page, setPage] = useState(1);
  
    useEffect(() => {
      fetch(`http://localhost:3001/api/countries/page/${page}`)
        .then(res => res.json())
        .then(data => setCountry(data))
    }, []);
  
    // function previous() {
    //   if (page > 1) setPage(page - 1)
    //   console.log(page)
    // }
  
    // function next() {
    //   if (page < 25) setPage(page + 1)
    // }

    return (
        <Cards paises={country}/>
    )
}