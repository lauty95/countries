import React, { useEffect } from "react";
import * as actionCreators from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import s from './form.module.css'
import Botones from './../botones'
import { Link } from 'react-router-dom'
import Select from 'react-select'

function FormActivity({ postActivity, country }) {
    const [formData, setFormData] = React.useState({ name: "", dificultad: 1, duracion: 0, temporada: "Verano", pais: [] });
    const [error, setError] = React.useState({name: "", duracion: ""});
    const [options, setOptions] = React.useState([]);
    const [paisesSeleccionados, setPaisesSeleccionados] = React.useState([]);

    useEffect(() => {
        let opciones = [];
        country.forEach(el => {
            opciones.push({ value: el.nombre, label: el.nombre })
        })
        setOptions(opciones);
    }, [country])

    function handleSubmit(e) {
        e.preventDefault();
        let lista = paisesSeleccionados;
        if (!lista) return alert("Seleccione al menos un pais")
        if (lista.length > 0 && error.name === "" && error.duracion === "") {
            for(let i = 0; i < lista.length; i++){
                //  if(lista[i].selected){
                    let data = { nombre: formData.name, dificultad: formData.dificultad, duracion: formData.duracion, temporada: formData.temporada, pais: lista[i].value }
                    postActivity(data)
                //  }
            }
            setFormData({ name: "", dificultad: 1, duracion: 0, temporada: "Verano", pais: [] })
            setPaisesSeleccionados([])
            alert('Actividades guardadas exitosamente')
        } else {
            alert("Hubo un error")
        }
    }

    function handleChange(e) {
        setFormData((prevData) => {
            const state = { ...prevData, [e.target.name]: e.target.value }
            const validations = validate(state);
            setError(validations);
            return state;
        })
    }

    return (
        <>
            <form className={s.formulario} onSubmit={handleSubmit}>
                <div className={s.inputs}>
                    <label>Nombre de la Actividad</label>
                    <input name={"name"} value={formData.name} onChange={handleChange} />
                </div>
                <span>{error.name}</span>
                <div className={s.inputs}>
                    <label>Duración (minutos)</label>
                    <input className={s.inputDuracion} type="number" name={"duracion"} value={formData.duracion} onChange={handleChange} />
                </div>
                <span>{error.duracion}</span>
                <div className={s.inputs}>
                    <label>Dificultad</label>
                    <input type="range" name="dificultad" min="1" max="5" step="1" value={formData.dificultad} onChange={handleChange} />
                </div>
                <div className={s.inputs}>
                    <label>Temporada</label>
                    <select className={s.input} name="temporada" onChange={handleChange}>
                        <option>Verano</option>
                        <option>Otoño</option>
                        <option>Invierno</option>
                        <option>Primavera</option>
                    </select>
                </div>
                <input className={s.boton} type="submit" value="Guardar" />
                <Link to="/api"> <Botones prop="Volver" /> </Link>
            </form>

            <form className={s.formulario}>
                <h2>Seleccione el/los paises</h2>
                {/* <select multiple className={s.lista} onChange={setPaisesSeleccionados}>
                    {options.map( op => <option key={op.value} value={op.label}>{op.label}</option>)}
                </select> */}
                <Select className={s.listado} value={paisesSeleccionados} options={options} isMulti onChange={setPaisesSeleccionados} />
            </form>
        </>
    )
}

function validate(data) {
    const error = {name: "", duracion: ""}
    if (!data.name) error.name = "Debe ingresar el nombre de la actividad"
    if (!data.duracion || data.duracion === 0) error.duracion = "Debe ingresar la duracion"
    return error;
}

function mapStateToProps(state) {
    return {
        country: state.country
    }
}

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FormActivity)
