import React from "react";
import card from './card.module.css'

export default function Card (props) {
    return (
            <div key = {props.nombre} className = {card.tarjeta}>
                <h1>{props.nombre}</h1>
                <h2>{props.continente}</h2>
                <img type="image/svg+xml" alt="bandera nacional" src={props.bandera} />
            </div>
    )
}