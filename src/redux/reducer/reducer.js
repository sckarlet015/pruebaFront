import { GET_USUARIO, GET_CONTACTOS } from "../actions/actions";

const initialState = {
    usuario: {},
    contactos: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_USUARIO:
            return {
                ...state,
                usuario: payload,
            };
        case GET_CONTACTOS:
            return {
                ...state,
                contactos: payload
            }
        default:
            return state;
    }
};

export default rootReducer;
