import React, { useEffect } from 'react'
import estilo from './nav.module.css'
import * as actionCreators from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import s from './nav.module.css'
import Botones from './../botones'

function Nav(props) {

    const [continents, setContinents] = React.useState([])
    const [activities, setActivities] = React.useState([])

    useEffect(() => {
        fetch('http://localhost:3001/api/continents')
            .then(res => res.json())
            .then(data => setContinents(data))
        fetch('http://localhost:3001/api/activity')
            .then(res => res.json())
            .then(data => setActivities(data))

    }, []);


    function capitalize(str) {
        const lower = str.toLowerCase()
        return str.charAt(0).toUpperCase() + lower.slice(1)
    }

    const handleChange = function (e) {
        props.reset()
        props.filterBySearch(capitalize(e.target.value))
    }

    const filterChange = function (e) {
        props.filterByAlph(e.target.value)
    }

    const filterContinent = function (e) {
        props.reset()
        props.filterByContinent(e.target.value)
    }

    const filterActivity = function (e) {
        props.reset()
        let res = []
        let actividad = e.target.value
        let filtrado = activities.filter(a => a.nombre === actividad)
        filtrado.map(f => res.push(f.pais))
        props.filterByActivity(res)
    }

    const OrderByPopulation = function (e) {
        props.reset()
        props.orderByPopulation(e.target.value);
    }

    const renderizarActividades = function(){
        var newArray = [];
        var lookupObject  = {};

        for(var i in activities) {
            lookupObject[activities[i].nombre] = activities[i];
        }

        for(i in lookupObject) {
            newArray.push(lookupObject[i]);
        }

        return(newArray.map(el => <option key={el.id*10}>{el.nombre}</option>))
    }


    return (<>
        <nav>
            <label className={s.logo}>Paises</label>
            <input id={s.check} type="checkbox" />
            <ul className={s.links}>
                <li> <select name="OrderByAlph" className={estilo.orden} onChange={filterChange}>
                    <option value="">Ordenar Alfabéticamente</option>
                    <option value="az">Alfabético A-Z</option>
                    <option value="za">Alfabético Z-A</option>
                </select></li>
                <li><select name="OrderByPopulation" className={estilo.orden} onChange={OrderByPopulation}>
                    <option value="">Ordenar por Poblacion</option>
                    <option value="mayor">Mayor población</option>
                    <option value="menor">Menor población</option>
                </select> </li>
                <li><select name="FilterByContinent" className={estilo.orden} onChange={filterContinent}>
                    <option value="">Continentes</option>
                    {continents.map(c => <option key={c}>{c}</option>)}
                </select></li>
                <li><select name="FilterByActivity" className={estilo.orden} onChange={filterActivity}>
                    <option value="">Actividades</option>
                    {renderizarActividades()}
                </select></li>
                <li>
                    <input name="countrySearch" value={props.inputText} onChange={handleChange} placeholder="Buscador de  Paises" />
                </li>
                <li>
                    <Link to="/activity"><Botones prop="+ Actividad" /></Link>
                </li>
            </ul>
            <label htmlFor={s.check} className={s.icon}>
                <div className={s.line}></div>
                <div className={s.line}></div>
                <div className={s.line}></div>
            </label>
        </nav>
    </>
    )
}

const mapStateToProps = function (state) {
    return {
        page: state.page,
        country: state.country,
        input: state.inputText
    }
}

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);