import React from "react";
import b from './botones.module.css'

export default function Botones({prop, action}) { 
    if (!action) {
        action = () => {}
    }
    return (
        <button key={prop} className={b.boton} onClick={action}>{prop}</button>
    )
}