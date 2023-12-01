import axios from "axios";
import style from "./Register.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { validarCorreo, validarContrasena, compararContraseña, validarStrings } from './functions'

export default function Register() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [nombre, setNombre] = useState("");
  const [errors, setErrors] = useState({ correo: "No puede quedar vacio", contrasena: "No puede quedar vacio", nombre: "No puede quedar vacio", repetirContrasena: "No puede quedar vacio" })
  const [hasErrors, setHasErrors] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const tieneErrores = Object.values(errors).some((error) => error !== "");
    setHasErrors(tieneErrores);
  }, [errors]);

  const onChanceInputs = (e) => {
    if (e.target.name === "nombre") {
      const nuevoNombre = e.target.value;
      setNombre(nuevoNombre);
      const nombreError = validarStrings(nuevoNombre) ? "" : "El Nombre no puede estar vacío o contener caracteres especiales o números";
      setErrors((prevErrors) => ({ ...prevErrors, nombre: nombreError }));
    }
    if (e.target.name === "correo") {
      const nuevoCorreo = e.target.value;
      setCorreo(nuevoCorreo);
      const correoError = validarCorreo(nuevoCorreo) ? "" : "El Correo no es Valido";
      setErrors((prevErrors) => ({ ...prevErrors, correo: correoError }));
    }
    if (e.target.name === "contrasena") {
      const nuevaContrasena = e.target.value;
      setContrasena(nuevaContrasena);
      const contrasenaError = validarContrasena(nuevaContrasena) ? "" : "La contraseña debe contener 8 caracteres, mayúscula, minúscula y número";
      setErrors((prevErrors) => ({ ...prevErrors, contrasena: contrasenaError }));
    }
    if (e.target.name === "repetirContrasena") {
      const nuevaRepetirContrasena = e.target.value;
      const repetirContrasenaError = compararContraseña(nuevaRepetirContrasena, contrasena) ? "" : "La contraseña no coincide";
      setErrors((prevErrors) => ({ ...prevErrors, repetirContrasena: repetirContrasenaError }));
    }
  
    const tieneErrores = Object.values(errors).some((error) => error !== "");
    setHasErrors(tieneErrores);
  };
  
  const onClickSesion = () => {
    navigate("/")
  }

  const registro = async () => {
    try {
      let data = {
        nombre: nombre,
        correo: correo,
        contrasena: contrasena,
      };

      const res = await axios.post("https://backend-31q5.onrender.com/usuario/newUser", data);
      navigate("/")
    } catch (error) {
        alert(error.response.data.message);
      }
    };
  return (
    <div className={style.fondo}>
      <div className={style.sesion}>
        <h2 className={style.title}>Registro</h2>
        <div className={style.inputs}>
          <input placeholder="Nombre" type="text" className={style.inp} name="nombre" onChange={onChanceInputs}></input>
          <p className={style.aviso}>{errors.nombre}</p>
          <input placeholder="Correo" type="text" className={style.inp} name="correo" onChange={onChanceInputs}></input>
          <p className={style.aviso}>{errors.correo}</p>
          <input type="password" placeholder="Contraseña" className={style.inp} name="contrasena" onChange={onChanceInputs} />
          <p className={style.aviso}>{errors.contrasena}</p>
          <input type="password" placeholder="Repetir contraseña" className={style.inp} name="repetirContrasena" onChange={onChanceInputs} />
          <p className={style.aviso}>{errors.repetirContrasena}</p>
        </div>
        <button onClick={() => registro()} className={style.btn} disabled={hasErrors}>
          Registrar
        </button>
        <span className={style.linked} onClick={() => onClickSesion()}>Iniciar Sesión</span>
      </div>
    </div>
  );
}
