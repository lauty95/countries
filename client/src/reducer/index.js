import { FILTER_BY_POPULATION, FIND_COUNTRY, GET_POST, NEXT_PAGE, PREV_PAGE, RESET, FILTER_BY_SEARCH, FILTER_BY_ALPH, FILTER_BY_CONTINENT, FILTER_BY_ACTIVITY, LAST } from "../actions/types";

const initialState = {
    inputText: "",
    page: 0,
    order: 'az',
    country: [],
    countryToShow: [],
    countryFiltered: [],
    loading: false,
};

function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case FIND_COUNTRY:
            return {
                ...state,
                loading: false,
                country: payload,
                countryToShow: payload
            }
        case RESET:
            return {
                ...state,
                page: 0
            }
        case LAST:
            return {
                ...state,
                page: Math.floor(state.country.length / 10) * 10
            }
        case NEXT_PAGE:
            return {
                ...state,
                page: state.page + 10
            }
        case PREV_PAGE:
            if (state.page > 0) {
                return {
                    ...state,
                    page: state.page - 10
                }
            } else {
                return {
                    ...state
                }
            }
        case GET_POST:
            return {
                ...state,
                loading: true,
            }
        case FILTER_BY_SEARCH:
            state.country = state.countryToShow
            state.countryFiltered = state.country.filter(p => p.nombre.includes(payload))
            return {
                ...state,
                country: state.countryFiltered
            }
        case FILTER_BY_CONTINENT:
            state.country = state.countryToShow
            state.countryFiltered = state.country.filter(p => p.continente.includes(payload))
            return {
                ...state,
                country: state.countryFiltered
            }
        case FILTER_BY_ACTIVITY:
            if (payload.length > 0) {
                state.country = state.countryToShow
                state.countryFiltered = []
                payload.forEach(element => {
                    state.countryFiltered.push((state.country.filter(p => p.nombre.includes(element)))[0])
                });
            } else {
                state.countryFiltered = state.countryToShow
            }
            return {
                ...state,
                country: state.countryFiltered
            }
        case FILTER_BY_ALPH:
            if (payload === 'az')
                state.country.sort((a, b) => {
                    if (a.nombre < b.nombre) return -1;
                    if (a.nombre > b.nombre) return 1;
                    return 0;
                })
            if (payload === 'za')
                state.country.sort((a, b) => {
                    if (a.nombre > b.nombre) return -1;
                    if (a.nombre < b.nombre) return 1;
                    return 0;
                })
            return {
                ...state,
                order: payload,
            }
        case FILTER_BY_POPULATION:
            if (payload === 'mayor')
                state.country.sort((a, b) => {
                    if (a.poblacion > b.poblacion) return -1;
                    if (a.poblacion < b.poblacion) return 1;
                    return 0;
                })
            if (payload === 'menor')
                state.country.sort((a, b) => {
                    if (a.poblacion < b.poblacion) return -1;
                    if (a.poblacion > b.poblacion) return 1;
                    return 0;
                })
            return {
                ...state,
                order: payload
            }
        default:
            return state;
    }
}

export default reducer;