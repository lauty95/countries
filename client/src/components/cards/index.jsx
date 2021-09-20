import React from "react";
import Card from "../card";
import { Link } from "react-router-dom";

export default function Cards({paises}) {
    return (
        paises.map( country =>
            <Link key={country.nombre} to= {`/api/country/${country.nombre}`}>
                <Card 
                    nombre = {country.nombre}
                    continente = {country.continente}
                    bandera = {country.bandera}
                    key= {country.nombre}
                />
            </Link>
        )
    )
}