import React, { useEffect } from 'react'
import estilo from './nav.module.css'
import * as actionCreators from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import s from './nav.module.css'
import Botones from './../botones'
import axios from 'axios';
function Nav(props) {

    const [continents, setContinents] = React.useState([])
    const [activities, setActivities] = React.useState([])

    useEffect(() => {
        axios.get('/api/continents')
            .then(data => setContinents(data.data))
            axios.get('/api/activity')
            .then(data => setActivities(data.data))

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
        props.reset()
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
        props.orderCountry(e.target.value);
    }

    const renderizarActividades = function () {
        var newArray = [];
        var lookupObject = {};

        for (var i in activities) {
            lookupObject[activities[i].nombre] = activities[i];
        }

        for (i in lookupObject) {
            newArray.push(lookupObject[i]);
        }

        return (newArray.map(el => <option key={el.id * 10}>{el.nombre}</option>))
    }


    return (<>
        <nav>
            <label className={s.logo}>Paises</label>
            <input id={s.check} type="checkbox" />
            <ul className={s.links}>
                <li> <select name="OrderByAlph" className={estilo.orden} onChange={filterChange}>
                    <option value="">Ordenar Alfab??ticamente</option>
                    <option value="az">Alfab??tico A-Z</option>
                    <option value="za">Alfab??tico Z-A</option>
                </select></li>
                <li><select name="OrderByPopulation" className={estilo.orden} onChange={OrderByPopulation}>
                    <option value="">Ordenar por Poblacion</option>
                    <option value="mayor">Mayor poblaci??n</option>
                    <option value="menor">Menor poblaci??n</option>
                </select> </li>
                <li><select name="FilterByContinent" className={estilo.orden} onChange={filterContinent}>
                    <option value="">Continentes</option>
                    { continents ? continents.map(c => <option key={c}>{c}</option>) : <h1>Hubo un problema con la Ap"</h1>}
                </select></li>
                <li><select name="FilterByActivity" className={estilo.orden} onChange={filterActivity}>
                    <option value="">Actividades</option>
                    {renderizarActividades()}
                </select></li>
                <li>
                    <input className={estilo.buscador} name="countrySearch" value={props.inputText} onChange={handleChange} placeholder="Buscar por Nombre" />
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