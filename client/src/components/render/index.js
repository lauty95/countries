import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../../actions";
import s from './render.module.css'
import Cards from '../cards'
import Botones from "../botones";
import planeta from "./../../img/tierra.gif"


const ApiPages = ({ country, page, nextPage, prevPage, fetchCountry, reset, last }) => {

    var xIni;

    useEffect(() => {
        fetchCountry();
    }, [fetchCountry])

    function paginaSiguiente() {
        if (page / 10 < country.length / 10 - 1) {
            nextPage()
        }
        return
    }

    function inicioToque(e) {
        xIni = e.targetTouches[0].pageX
    }

    function cambiarPagina(e) {
        if (e.targetTouches[0].pageX + 5 > xIni) {
            prevPage();
        }
        if (e.targetTouches[0].pageX - 5 < xIni) {
            paginaSiguiente();
        }
    }
    return (
        <div className={s.container} onTouchStart={inicioToque} onTouchMove={cambiarPagina}>
            <div className={s.botonesDireccion}>
                <div>
                    <Botones prop="<< Primera" action={reset} />
                    <Botones prop="Ultima >>" action={last} />
                </div>
                <div>
                    <Botones prop="< Anterior" action={prevPage} />
                    <Botones prop="Siguiente> " action={paginaSiguiente} />
                </div>
            </div>
            <div className={s.lista}>
                {
                    country.length > 0 ?
                        <Cards paises={country.slice(page, page + 10)} />
                        :
                        <img src={planeta} alt="planeta girando" />
                }
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