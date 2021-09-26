import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions";
import s from './render.module.css'

import Cards from '../components/cards'
import Botones from "../components/botones";


const ApiPages = ({ country, page, nextPage, prevPage, fetchCountry }) => {

    useEffect(() => {
        fetchCountry();
    }, [fetchCountry])

    return (
        <div className={s.container}>
            <Botones prop="Anterior" action={prevPage} />
            <Botones prop="Siguiente" action={nextPage} />
            <div className={s.lista}>
                <Cards paises={country.slice(page, page + 10)} />
            </div>
        </div>
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