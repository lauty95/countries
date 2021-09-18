import React from "react";
import b from './botones.module.css'
import { Link } from 'react-router-dom'

export default function Botones({ num }) {
    let botones = []
    for (let i = 1; i <= num; i++) {
        botones.push(
            <Link to={`/api/page/${i}`} key = {i}>
                <button key={i} className={b.num}>{i}</button>
            </Link>
        )
    }
    return (
        botones
    )
}