import React from 'react'
import { Link } from 'react-router-dom'
import Botones from '../botones'
import s from './inicio.module.css'
function Inicio() {
    return (
        <div className={s.botonInicio}>
            <Link to="/api"><Botones prop="Inicio" /></Link>
        </div>
    )
}

export default Inicio
