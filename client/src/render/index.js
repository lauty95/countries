import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions";
//import { Link, Route } from 'react-router-dom'

import Cards from '../components/cards'


const ApiPages = ({ country, page, nextPage, prevPage, fetchCountry }) => {

    useEffect(() => {
        fetchCountry();
    }, [fetchCountry])
    
    return (
        <>
            <Cards paises={country.slice(page, page + 10)} />
            <button onClick={prevPage}>Anterior</button>
            <button onClick={nextPage}>Siguiente</button>
        </>
    )
}

const mapStateToProps = (state) => ({
    page: state.page,
    country: state.country,
    order: state.order
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ApiPages)