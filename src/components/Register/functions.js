export const validarCorreo = (correo) => {
    const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (regexCorreo.test(correo)) {
        return true; 
    } else {
        return false;
    }
}

export const validarContrasena = (contrasena) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(contrasena);
}

export const compararContraseña = (contrasena, repetircontrasena) => {
    return contrasena === repetircontrasena;
}

export function validarStrings(nombre) {
    const regex = /^[A-Za-z]+$/;
    return regex.test(nombre);
}

export function validarTelefono(telefono) {
    const regex = /^[0-9]{9,10}$/;
    return regex.test(telefono);
}