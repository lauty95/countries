import { ADD_ACTIVITY, FIND_COUNTRY } from "../actions/types";

const initialState = [];

function reducer(state = initialState, { type, payload }) {
    switch(type) {
        case ADD_ACTIVITY:
            return [...state, {...payload}];
        case FIND_COUNTRY:
            return [...state]
        default:
            return state;
    }
}

export default reducer;