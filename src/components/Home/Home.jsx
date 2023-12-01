import axios from "axios"
import style from "./Home.module.css"
import { useState } from "react"
import {  useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { get_user } from "../../redux/actions/actions";

export default function Home(){
    const [correo, setCorreo] = useState("")
    const [contrasena, setContrasena] = useState("")

    const navigate = useNavigate();
    let dispatch = useDispatch()

    const onChanceInputs = (e) => {
        if(e.target.name === "correo"){
            setCorreo(e.target.value)
        }
        if(e.target.name === "contrasena"){
            setContrasena(e.target.value)
        }
    }
    const sesion = async() => {
        try {
            let data = {
                correo: correo,
                contrasena: contrasena
            }
            const res = await axios.post("https://backend-31q5.onrender.com/usuario/login", data)
            dispatch(get_user(res.data))
            navigate("/agenda")
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const onClickRegistro = () => {
        navigate("/register")
      }

    return(
        <div className={style.fondo}>
            <div className={style.sesion}>
            <h2 className={style.title}>Iniciar Sesion</h2>
           <div className={style.inputs}>
           <input placeholder="Correo" type="text" className={style.inp} name="correo" onChange={onChanceInputs}></input>
            <input type="password" placeholder="Contraseña" className={style.inp} name="contrasena" onChange={onChanceInputs}/>
           </div>
            <button onClick={() => sesion()} className={style.btn}>
                Entrar
            </button>
            <span className={style.linked} onClick={() => onClickRegistro()}>
                Registrarse
            </span>
            </div>
        </div>
    )
}