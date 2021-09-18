import React from "react";
import Card from "../card";
import { Link } from "react-router-dom";

export default function Cards({paises}) {
    return (
        paises.map( country =>
            <Link key={country.id} to= {`/api/country/${country.id}`}>
                <Card 
                    nombre = {country.nombre}
                    continente = {country.continente}
                    bandera = {country.bandera}
                    capital = {country.capital}
                    poblacion = {country.poblacion}
                    key= {country.id}
                />
            </Link>
        )
    )
}