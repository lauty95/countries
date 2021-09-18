import { ADD_ACTIVITY, FIND_COUNTRY } from "./types";

export function addActivity(nombre, dificultad, duracion, temporada, pais) {
    return {
        type: ADD_ACTIVITY,
        payload: {
            nombre,
            dificultad,
            duracion,
            temporada,
            pais
        }
    }
};

export function findCountry(name) {
    return {
        type: FIND_COUNTRY,
        payload: name
    }
};