import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get_contacts } from '../../redux/actions/actions';
import { useNavigate } from 'react-router-dom'
import styles from "./Forulario.module.css"
import axios from 'axios';
import { validarCorreo, validarStrings } from '../Register/functions';

const Formulario = () => {
    const usuario = useSelector(state => state.usuario)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        usuarioId: usuario.id,
        nombre: "",
        segundoNombre: "",
        apellido: "",
        segundoApellido: "",
        alias: "",
        relacion: "",
        celular: "",
        telefono: "",
        correo: "",
        foto: "",
        fechaNacimiento: null,
        vialidad: "",
        exterior: "",
        interior: "",
        cargo: "",
        sitioWeb: "",
        facebook: "",
        linkedin: "",
        organizacion: "",
        categoria: ""
    });
    const updateContacts = async () => {
        try {
            const response = await axios.get(`https://backend-31q5.onrender.com/contacto/allContacts/${usuario.id}`)
            dispatch(get_contacts(response.data))
        } catch (error) {
            alert(error.response.data)
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: new Date(value)
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        if (validarStrings(formData.nombre) === false || formData.nombre.length === 0) alert("El nombre no puede quedar vacio o contener numeros o simbolos")
        else if (formData.celular.length !== 10) alert("El celular debe contener 10 digitos")
        else if (validarCorreo(formData.correo) === false || formData.correo.length === 0) alert("el correo no es valido")
        else {
            try {
                const response = await axios.post("https://backend-31q5.onrender.com/contacto/newContact", formData)
                if (response.data.nombre.length > 0) {
                    updateContacts()
                    alert(`${response.data.nombre} fue guardado en tus contactos con exito`)
                    navigate("/agenda")
                }
            } catch (error) {
                alert(error.response.data.message)
            }
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Nuevo Contacto</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.part}>
                    <div className={styles.sub}>
                        <h3 className={styles.subTitle}>Nombre del Contacto</h3>
                        <p className={styles.msg}>* Campos obligatorios</p>
                    </div>
                    <div className={styles.subPart}>
                        <label className={styles.camp}>
                            *Nombre:
                            <input className={styles.inp} type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                        </label >
                        <label className={styles.camp}>
                            Segundo Nombre:
                            <input className={styles.inp} type="text" name="segundoNombre" value={formData.segundoNombre} onChange={handleChange} />
                        </label>
                    </div>
                    <div className={styles.subPart}>
                        <label className={styles.camp}>
                            Apellido Paterno:
                            <input className={styles.inp} type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
                        </label>
                        <label className={styles.camp}>
                            Apellido Materno:
                            <input className={styles.inp} type="text" name="segundoApellido" value={formData.segundoApellido} onChange={handleChange} />
                        </label>
                    </div>
                    <div className={styles.subPart}>
                        <label className={styles.camp}>
                            Alias:
                            <input className={styles.inp} type="text" name="alias" value={formData.alias} onChange={handleChange} />
                        </label>
                        <label className={styles.camp}>
                            Relacion:
                            <input className={styles.inp} type="text" name="relacion" value={formData.relacion} onChange={handleChange} />
                        </label>
                    </div>
                    <div className={styles.subPart}>
                        <label className={styles.camp}>
                            Foto:
                            <input className={styles.inp} type="text" name="foto" value={formData.foto} onChange={handleChange} />
                        </label>
                        <label className={styles.camp}>
                            Fecha de Nacimiento:
                            <input className={styles.inp} type="date" name="fechaNacimiento" value={formData.fechaNacimiento ? formData.fechaNacimiento.toISOString().split('T')[0] : ''} onChange={handleDateChange} />
                        </label>
                    </div>
                </div>
                <div className={styles.part}>
                    <div className={styles.sub}>
                        <h3 className={styles.subTitle}>Datos del Contacto</h3>
                        <p className={styles.msg}>* Campos obligatorios</p>
                    </div>
                    <div className={styles.subPart}>
                        <label className={styles.camp}>
                            *Celular:
                            <input className={styles.inp} type="text" name="celular" value={formData.celular} onChange={handleChange} />
                        </label>
                        <label className={styles.camp}>
                            Telefono Local:
                            <input className={styles.inp} type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
                        </label>
                    </div>
                    <div className={styles.subPart}>
                        <label className={styles.camp}>
                            *Correo:
                            <input className={styles.inp} type="text" name="correo" value={formData.correo} onChange={handleChange} />
                        </label>
                        <label className={styles.camp}>
                            Facebook:
                            <input className={styles.inp} type="text" name="facebook" value={formData.facebook} onChange={handleChange} />
                        </label>
                    </div>
                    <div className={styles.subPart}>
                        <label className={styles.camp}>
                            Linkedin:
                            <input className={styles.inp} type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} />
                        </label>
                        <label className={styles.camp}>
                            Sitio Web:
                            <input className={styles.inp} type="text" name="sitioWeb" value={formData.sitioWeb} />
                        </label>
                    </div>
                </div>

                <div className={styles.part}>
                    <div className={styles.subPart}>
                        <h3 className={styles.subTitle}>Domicilio y Ocupacion</h3>
                    </div>
                    <div className={styles.subPart}>
                        <label className={styles.camp}>
                            Vialidad:
                            <input className={styles.inp} type="" name="vialidad" value={formData.vialidad} onChange={handleChange} />
                        </label>
                        <label className={styles.camp}>
                            Ext:
                            <input className={styles.inp} type="text" name="interior" value={formData.interior} onChange={handleChange} />
                        </label>
                        <label className={styles.camp}>
                            Int:
                            <input className={styles.inp} type="text" name="interior" value={formData.interior} onChange={handleChange} />
                        </label>
                    </div>
                    <div className={styles.subPart}>
                        <label className={styles.camp}>
                            Cargo:
                            <input className={styles.inp} type="text" name="cargo" value={formData.cargo} onChange={handleChange} />
                        </label>
                        <br />
                        <label className={styles.camp}>
                            Organizacion:
                            <input className={styles.inp} type="text" name="organizacion" value={formData.organizacion} onChange={handleChange} />
                        </label>
                        <label className={styles.camp}>
                            Categoria:
                            <input className={styles.inp} type="text" name="categoria" value={formData.categoria} onChange={handleChange} />
                        </label>
                    </div>
                </div>
                <button className={styles.btn} type="submit">Guardar</button>
            </form>
        </div>
    );
};

export default Formulario;
