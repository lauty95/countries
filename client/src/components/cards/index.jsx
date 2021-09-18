import React from "react";
import Card from "../card";

export default function Cards({paises}) {
    return (
        paises.map( country =>
            <Card 
                nombre = {country.nombre}
                continente = {country.continente}
                bandera = {country.bandera}
                capital = {country.capital}
                poblacion = {country.poblacion}
                key= {country.id}
            />
        )
    )
}