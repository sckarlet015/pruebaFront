export const GET_USUARIO = "GET_USUARIO";
export const GET_CONTACTOS = "GET_CONTACTOS"
export const GET_CATEGORIAS = "GET_CATEGORIAS"
export const GET_ORGANIZACIONES = "GET_ORGANIZACIONES"

export function get_user(payload){
    return{
        type: GET_USUARIO,
        payload: payload
    }
};

export function get_contacts(payload){
    return{
        type: GET_CONTACTOS,
        payload: payload
    }
}

export function get_categorias(payload){
    return{
        type: GET_CATEGORIAS,
        payload: payload
    }
}

export function get_organizacones(payload){
    return{
        type: GET_ORGANIZACIONES,
        payload: payload
    }
}

