import { useEffect, useState } from "react";
import style from './UserDatel.module.css';  // Asegúrate de tener los estilos CSS adecuados
import iconEdit from "../../assets/edit.svg";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import userDefaul from "../../assets/user-defaul.svg"
import { useDispatch, useSelector } from "react-redux";
import { get_user } from "../../redux/actions/actions";
import { validarStrings, validarContrasena, validarCorreo, compararContraseña } from '../Register/functions';

const UserDetail = () => {
    const usuario = useSelector(state => state.usuario);
    const [newUsuario, setNewUsuario] = useState({});
    const [editBool, setEditBool] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClickEdit = () => {
        setEditBool(!editBool);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUsuario(prevState => ({
            ...prevState,
            [name]: value,
        }));
        console.log(newUsuario);
    };

    const cerrarSesion = () => {
        dispatch(get_user({}));
        navigate("/");
    };

    const updateUser = async () => {
    if (newUsuario.nombre !== null || newUsuario.nombre !== undefined) {
        const nombreBool = validarStrings(newUsuario.nombre)
        console.log(nombreBool);
        if (newUsuario.nombre !== undefined && validarStrings(newUsuario.nombre) === false) {
            alert("El nombre no debe contener números o símbolos");
            return;
        }
        if (newUsuario.celular !== undefined && newUsuario.celular.length !== 10) {
            alert("El celular debe contener 10 dígitos");
            return;
        }
    }
    try {
        const response = await axios.put(`https://backend-31q5.onrender.com/usuario/edit/${usuario.id}`, newUsuario);
        setEditBool(true);
        dispatch(get_user(response.data));
        setNewUsuario({});
        alert(`Los datos de ${response.data.nombre} se actualizaron con éxito`);
    } catch (error) {
        alert(error.response.data);
    }
};

    return (
        <div className={style.container}>
            <div className={style.title}>
                <h2>Detalles del Usuario</h2>
                <img className={style.icon} src={iconEdit} alt="" onClick={onClickEdit} />
            </div>
            {editBool ? (
                <img className={style.foto} src={usuario.foto || userDefaul} alt="" />
            ) : (
                <input
                    type="text"
                    className={style.foto}
                    name="foto"
                    placeholder={usuario.foto || "url de la foto"}
                    value={newUsuario.foto}
                    onChange={(e) => handleInputChange(e)}
                />
            )}
            <div className={style.space}>
                <div className={style.camp}>
                    <label className={style.inp}>{"Nombre(s):"}</label>
                    {editBool ? (
                        <div className={style.value}>{usuario.nombre.toUpperCase()}</div>
                    ) : (
                        <input
                            type="text"
                            className={style.inp}
                            name="nombre"
                            placeholder={usuario.nombre}
                            value={newUsuario.nombre || ""}
                            onChange={handleInputChange}
                        />
                    )}
                </div>

                <div className={style.camp}>
                    <label className={style.inp}>{"Apellido(s)"}</label>
                    {editBool ? (
                        <div className={style.value}>{usuario.apellido?.toUpperCase() || "No disponible"}</div>
                    ) : (
                        <input
                            type="text"
                            className={style.inp}
                            name="apellido"
                            placeholder={usuario.apellido || "sin datos"}
                            value={newUsuario.apellido || ""}
                            onChange={handleInputChange}
                        />
                    )}
                </div>
                <div className={style.camp}>
                    <label className={style.inp}>{"Telefono:"}</label>
                    {editBool ? (
                        <div className={style.value}>{usuario.telefono || "No disponible"}</div>
                    ) : (
                        <input
                            type="text"
                            className={style.inp}
                            name="telefono"
                            placeholder={usuario.telefono || "sin datos"}
                            value={newUsuario.telefono || ""}
                            onChange={handleInputChange}
                        />
                    )}
                </div>
                <div className={style.camp}>
                    <label className={style.inp}>Celular:</label>
                    {editBool ? (
                        <div className={style.value}>{usuario.celular || "No disponible"}</div>
                    ) : (
                        <input
                            type="text"
                            className={style.inp}
                            name="celular"
                            autoComplete="off"
                            placeholder={usuario.celular || "sin datos"}
                            value={newUsuario.celular || ""}
                            onChange={handleInputChange}
                        />
                    )}
                </div>
            </div>
            {editBool ? (
                <div>
                    <button className={style.btn} onClick={cerrarSesion}>Cerrar Sesion</button>
                </div>
            ) : (
                <div>
                    <button className={style.btn} onClick={updateUser}>Actualizar</button>
                </div>
            )}
        </div>
    );
};

export default UserDetail;
