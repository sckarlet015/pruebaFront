export const GET_USUARIO = "GET_USUARIO";
export const GET_CONTACTOS = "GET_CONTACTOS"

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


