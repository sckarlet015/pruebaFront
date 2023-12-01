import { GET_USUARIO, GET_CONTACTOS, GET_CATEGORIAS, GET_ORGANIZACIONES } from "../actions/actions";

const initialState = {
    usuario: {},
    contactos: [],
    categorias: [],
    organizaciones: []
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
        case GET_CATEGORIAS:
            return {
                ...state,
                categorias: payload
            }
            case GET_ORGANIZACIONES:
            return {
                ...state,
                organizaciones: payload
            }
        default:
            return state;
    }
};

export default rootReducer;
