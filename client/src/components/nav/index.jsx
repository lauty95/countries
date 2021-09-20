import React, { useEffect } from 'react'
import estilo from './nav.css'
import * as actionCreators from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

function Nav(props) {

    const [continents, setContinents] = React.useState([])

    useEffect(() => {
        fetch('http://localhost:3001/api/continents')
            .then(res => res.json())
            .then(data => setContinents(data))
    }, [props.country]);

    const handleChange = function (e) {
        props.reset()
        props.filterBySearch(e.target.value)
    }

    const filterChange = function (e) {
        props.filterByAlph(e.target.value)
    }

    return (
        <nav className={estilo.nav}>
            <select name="Orden" className={estilo.orden} onChange={filterChange}>
                <option value="az">Alfabético A-Z</option>
                <option value="za">Alfabético Z-A</option>
                <option value="mayor">Mayor población</option>
                <option value="menor">Menor población</option>
            </select>
            <select name="Filtrar" className={estilo.orden}>
                {continents.map(c => <option key={c}>{c}</option>)}
            </select>
            <form>
                <input name="countrySearch" value={props.inputText} onChange={handleChange} placeholder="Buscador de  Paises" />
            </form>
        </nav>
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