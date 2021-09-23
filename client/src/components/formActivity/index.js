//import s from './form.module.css'
import React from "react";
import * as actionCreators from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';


function FormActivity({ postActivity }) {
    const [formData, setFormData] = React.useState({ name: "", dificultad: 1, duracion: 0, temporada: "Verano", pais: "" });
    const [error, setError] = React.useState({});

    function handleSubmit(e) {
        e.preventDefault();
        let data = { nombre: formData.name, dificultad: formData.dificultad, duracion: formData.duracion, temporada: formData.temporada, pais: formData.pais }
        postActivity(data)
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
        <form onSubmit={handleSubmit}>
            <FormItem label="Nombre de la Actividad:" name="name" value={formData.name} handleChange={handleChange} error={error.name} clase={"inputs"} />
            <FormItem label="Duración:" name="duracion" value={formData.duracion} handleChange={handleChange} error={error.duracion} clase={"inputs"} />
            <div className="inputs">
                <label>Dificultad</label>
                <input type="range" name="dificultad" min="1" max="5" step="1" value={formData.dificultad} onChange={handleChange} />
            </div>
            <div className="inputs">
                <label>Temporada:</label>
                <select name="temporada" onChange={handleChange}>
                    <option>Verano</option>
                    <option>Otoño</option>
                    <option>Invierno</option>
                    <option>Primavera</option>
                </select>
            </div>
            <FormItem label="Pais/es:" name="pais" value={formData.pais} handleChange={handleChange} error={error.pais} clase={"inputs"} />
            <input type="submit" value="Guardar" />
        </form>
    )
}

function FormItem({ label, name, value, handleChange, error, clase }) {
    return (
        <>
            <div className={clase}>
                <label>{label}</label>
                <input name={name} value={value} onChange={handleChange} />
            </div>
            <span>{error}</span>
        </>
    )
}

function validate(data) {
    const error = {}
    if (!data.name) error.name = "Debe ingresar el nombre de la actividad"
    if (!data.duracion) error.duracion = "Debe ingresar la duracion"
    return error;
}

function mapStateToProps(state) {
    return {
        country_id: state.country_id
    }
}

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FormActivity)
