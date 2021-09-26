import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../../actions";
import s from './render.module.css'
import Cards from '../cards'
import Botones from "../botones";


const ApiPages = ({ country, page, nextPage, prevPage, fetchCountry, reset, last }) => {

    useEffect(() => {
        fetchCountry();
    }, [fetchCountry])

    function paginaSiguiente() {
        if (page / 10 < country.length / 10 - 1) {
            nextPage()
        }
        return
    }

    return (
        <div className={s.container}>
            <Botones prop="Primera" action={reset} />
            <Botones prop="Anterior" action={prevPage} />
            <Botones prop="Siguiente" action={paginaSiguiente} />
            <Botones prop="Ultima" action={last} />
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