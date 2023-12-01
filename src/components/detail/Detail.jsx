import { useEffect, useState } from "react";
import style from './Detail.module.css';
import { useParams, useNavigate } from "react-router-dom";
import userDefaul from "../../assets/user-defaul.svg"
import iconEdit from "../../assets/edit.svg"
import axios from "axios";
import { validarCorreo, validarStrings } from '../Register/functions';

const Detail = () => {
  const [contacto, setContacto] = useState({});
  const [newContacto, setNewContacto] = useState();
  const [editBool, setEditBool] = useState(true)
  const { id } = useParams();

  useEffect(() => {
    getDetailContact();
  }, []);

  const onClickEdit = () => {
    if (editBool) {
      setEditBool(false)
    } else {
      setEditBool(true)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContacto({ ...newContacto, [name]: value });

    if (e.target.name === "organizacion") {
      const { name, value } = e.target;
      setNewContacto({ ...newContacto, [name]: value, organizacionId: contacto.Organizacions[0].id });
    }

    if (e.target.name === "categoria") {
      const { name, value } = e.target;
      setNewContacto({ ...newContacto, [name]: value, categoriaId: contacto.Categoria[0].id });
    }
  }


  const getDetailContact = async () => {
    try {
      const res = await fetch(`https://backend-31q5.onrender.com/contacto/contacDetails/${id}`);
      const data = await res.json();
      setContacto(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const actuzalizaContacto = async () => {
    if (newContacto.nombre !== null || newContacto.correo !== null) {
      if (newContacto.nombre && validarStrings(newContacto.nombre) === false){
        alert("El nombre no debe contener numeros o simbolos")
        return
      }
      else if(newContacto.correo && validarCorreo(newContacto.correo) === false){
        alert("El correo no es valido")
        return
      }
      else{
        try {
          const response = await axios.put(`https://backend-31q5.onrender.com/contacto/updateContac/${id}`, newContacto)
          setEditBool(true)
          setContacto(response.data)
          setNewContacto({})
          alert(`El contacto de ${response.data.nombre} se actualizo con exito`)
        } catch (error) {
          alert(error.response.data)
        }
      }
    }
  }

  const formatFechaHora = (fecha) => {
    if (!fecha) return "No disponible";
  
    const opciones = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };
  
    return new Date(fecha).toLocaleDateString("es-ES", opciones);
  };


  return (
    <div className={style.container}>
      <div className={style.title}>
        <h2>Detalles del Contacto</h2>
        <img className={style.icon} src={iconEdit} alt="" onClick={() => onClickEdit()} />
      </div>
      <div className={style.space}>
        <div className={style.camp}>
          {editBool ? (
            <img className={style.foto} src={contacto.foto || userDefaul} alt="" />
          ) : (
            <input
              type="text"
              className={style.foto}
              name="foto"
              placeholder={contacto.foto || "url de la foto"}
              value={newContacto?.foto}
              onChange={(e) => handleInputChange(e)}
            />
          )}

        </div>
        <div className={style.camp}>
          <label className={style.inp}>Nombre:</label>
          {editBool ? (
            <div className={style.value}>{`${contacto.nombre?.toUpperCase()} ${contacto.segundoNombre?.toUpperCase()} ${contacto.apellido?.toUpperCase()} ${contacto.segundoApellido?.toUpperCase()}`}</div>
          ) :
            (
              (
                <>
                  <input
                    type="text"
                    className={style.inp}
                    name="nombre"
                    placeholder={contacto.nombre}
                    value={newContacto?.nombre}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <input
                    type="text"
                    className={style.inp}
                    name="segundoNombre"
                    placeholder={contacto.segundoNombre || "Segundo nombre"}
                    value={newContacto?.segundoNombre}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <input
                    type="text"
                    className={style.inp}
                    name="apellido"
                    placeholder={contacto.apellido || "Apellido paterno"}
                    value={newContacto?.apellido}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <input
                    type="text"
                    className={style.inp}
                    name="segundoApellido"
                    placeholder={contacto.segundoApellido || "Apellido materno"}
                    value={newContacto?.segundoApellido}
                    onChange={(e) => handleInputChange(e)}
                  />
                </>
              )
            )
          }

        </div>
      </div>

      <div className={style.space}>
        <div className={style.camp}>
          <label className={style.inp}>Alias:</label>
          {editBool ? (
            <div className={style.value}>{contacto.alias}</div>
          ) : (
            <input
              className={style.inp}
              type="text"
              name="alias"
              placeholder={contacto.alias}
              value={newContacto?.alias}
              onChange={(e) => handleInputChange(e)} />
          )}
        </div>
        <div className={style.camp}>
          <label className={style.inp}>Relacion:</label>
          {editBool ? (
            <div className={style.value}>{contacto.relacion}</div>
          ) : (
            <input
              className={style.inp}
              type="text"
              placeholder={contacto.relacion || "sin datos"}
              name="relacion"
              value={newContacto?.relacion}
              onChange={(e) => handleInputChange(e)}
            />
          )}

        </div>
      </div>

      <div className={style.space}>
        <div className={style.camp}>
          <label className={style.inp}>Correo:</label>
          {editBool ? (
            <div className={style.value}>{contacto.correo}</div>
          ) : (
            <input
              type="text"
              className={style.inp}
              name="correo"
              placeholder={contacto.correo || "sin datos"}
              value={newContacto?.correo}
              onChange={(e) => handleInputChange(e)}
            />
          )}
        </div>
        <div className={style.camp}>
          <label className={style.inp}>Celular:</label>
          {editBool ? (
            <div className={style.value}>{contacto.celular}</div>
          ) : (
            <input
              type="text"
              className={style.inp}
              name="celular"
              placeholder={contacto.celular || "sin datos"}
              value={newContacto?.celular}
              onChange={(e) => handleInputChange(e)}
            />
          )}
        </div>
      </div>

      <div className={style.camp}>
        <label className={style.inp}>Dirección:</label>
        {editBool ? (
          <div className={style.value}>{`${contacto.vialidad} ${contacto.exterior} ${contacto.interior}`}</div>
        ) : (
          <>
            <input
              type="text"
              className={style.inp}
              name="vialidad"
              placeholder={contacto.vialidad || "calle - colonia - estado"}
              value={newContacto?.vialidad}
              onChange={(e) => handleInputChange(e)}
            />
            <input
              type="text"
              className={style.inp}
              name="exterior"
              placeholder={contacto.exterior || "sin datos"}
              value={newContacto?.exterior}
              onChange={(e) => handleInputChange(e)}
            />
            <input
              type="text"
              className={style.inp}
              name="interior"
              placeholder={contacto.interior || "sin datos"}
              value={newContacto?.interior}
              onChange={(e) => handleInputChange(e)}
            />
          </>
        )}
      </div>

      <div className={style.camp}>
        <label className={style.inp}>Cargo:</label>
        {editBool ? (
          <div className={style.value}>{contacto.cargo || "No disponible"}</div>
        ) : (
          <input
            type="text"
            className={style.inp}
            name="cargo"
            placeholder={contacto.cargo || "sin datos"}
            value={newContacto?.cargo}
            onChange={(e) => handleInputChange(e)}
          />
        )}
      </div>

      <div className={style.space}>
        <div className={style.camp}>
          <label className={style.inp}>Organización:</label>
          {editBool ? (
            <div className={style.value}>
              {contacto?.Organizacions && contacto.Organizacions[0].nombre || "Sin organización"}
            </div>
          ) : (
            <input
              type="text"
              className={style.inp}
              value={newContacto?.organizacion}
              placeholder={contacto.organizacion || "sin datos"}
              name="organizacion"
              onChange={(e) => handleInputChange(e)}
            />
          )}

        </div>
        <div className={style.camp}>
          <label className={style.inp}>Categoría:</label>
          {editBool ? (
            <div className={style.value}>
              {contacto?.Categoria && contacto?.Categoria[0]?.nombre || "Sin categoría"}
            </div>
          ) : (
            <input
              type="text"
              className={style.inp}
              value={newContacto?.categoria}
              placeholder={contacto.categoria || "sin datos"}
              name="categoria"
              onChange={(e) => handleInputChange(e)}
            />
          )}
        </div>
      </div>

      <div className={style.space}>
        <div className={style.camp}>
          <label className={style.inp}>Fecha de Nacimiento:</label>
          {editBool ?
            <div className={style.value}>
              {contacto.fechaNacimiento ?
                new Date(contacto.fechaNacimiento).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }) :
                "No disponible"
              }
            </div>
            :
            <input
              type="date"
              className={style.inp}
              name="fechaNacimiento"
              value={newContacto?.fechaNacimiento}
              onChange={(e) => handleInputChange(e)}
            />
          }
        </div>
        <div className={style.camp}>
          <label className={style.inp}>Género:</label>
          {editBool ?
            <div className={style.value}>
              {contacto.genero || "No disponible"}
            </div>
            :
            <select
              className={style.inp}
              value={newContacto?.genero || ""}
              name="genero"
              onChange={(e) => handleInputChange(e)}
            >
              <option value="">Seleccionar género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="No binario">No binario</option>
            </select>
          }
        </div>
      </div>

      <div className={style.space}>
        <div className={style.camp}>
          <label className={style.inp}>Sitio Web:</label>
          {editBool ?
            <div className={style.value}>{contacto.sitioWeb || "No disponible"}</div>
            :
            <input
              type="text"
              className={style.inp}
              name="sitioWeb"
              placeholder={contacto.sitioWeb || "sin datos"}
              value={newContacto?.sitioWeb}
              onChange={(e) => handleInputChange(e)}
            />
          }
        </div>
        <div className={style.camp}>
          <label>Facebook:</label>
          {editBool ?
            <div className={style.value}>{contacto.facebook || "No disponible"}</div>
            :
            <input
              type="text"
              name="facebook"
              placeholder={contacto.facebook || "sin datos"}
              value={newContacto?.facebook}
              onChange={(e) => handleInputChange(e)}
            />
          }

        </div>
        <div className={style.camp}>
          <label>LinkedIn:</label>
          {editBool ?
            <div className={style.value}>{contacto.linkedin || "No disponible"}</div>
            :
            <input
              type="text"
              name="linkedin"
              placeholder={contacto.linkedin || "sin datos"}
              value={newContacto?.linkedin}
              onChange={(e) => handleInputChange(e)}
            />
          }
        </div>
      </div>

      {editBool ? (
        <div className={style.space}>
        <div className={style.camp}>
          <label>Fecha de Creación:</label>
          <div className={style.value}>{formatFechaHora(contacto.fechaCreacion) || "No disponible"}</div>
        </div>
        <div className={style.camp}>
          <label>Fecha de Modificación:</label>
          <div className={style.value}>{formatFechaHora(contacto.fechaModificacion) || "No disponible"}</div>
        </div>
      </div>
      
      ) : (
        <div >
          <button className={style.btn} onClick={actuzalizaContacto} >Actualizar</button>
        </div>
      )}

    </div>
  );
};

export default Detail;
