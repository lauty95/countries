import axios from "axios";
import { FILTER_BY_ALPH, FILTER_BY_CONTINENT, FILTER_BY_SEARCH, FIND_COUNTRY, GET_POST, NEXT_PAGE, PREV_PAGE, RESET, FILTER_BY_ACTIVITY } from "./types";

export function postActivity(data) {
    return function (dispatch) {
        dispatch(getPost());
        fetch(`http://localhost:3001/api/countries/name/${data.pais}`)
            .then(r => r.json())
            .then(r => data["idPais"] = r[0].id)
            .then(() => axios.post('http://localhost:3001/api/activity/', data))
    }
};

export function getPost() {
    return {
        type: GET_POST,
    }
}
export function findCountry(data) {
    return {
        type: FIND_COUNTRY,
        payload: data
    }
}
export function fetchCountry() {
    return function (dispatch) {
        dispatch(getPost());
        fetch(`http://localhost:3001/api/countries`)
            .then(res => res.json())
            .then(data => dispatch(findCountry(data)))
    }
};

export function filterBySearch(data) {
    return {
        type: FILTER_BY_SEARCH,
        payload: data
    }
}

export function nextPage(page) {
    return {
        type: NEXT_PAGE,
        payload: page
    }
}
export function prevPage(page) {
    return {
        type: PREV_PAGE,
        payload: page
    }
}
export function reset() {
    return {
        type: RESET
    }
}

export function filterByContinent(data) {
    return {
        type: FILTER_BY_CONTINENT,
        payload: data
    }
}

export function filterByActivity(data){
    return {
        type: FILTER_BY_ACTIVITY,
        payload: data
    }
}

export function filterByAlph(data) {
    return {
        type: FILTER_BY_ALPH,
        payload: data
    }
}