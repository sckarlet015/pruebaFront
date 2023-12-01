import { useNavigate } from 'react-router-dom'
import style from "./Card.module.css"
import userDefaul from "../../assets/user-defaul.svg"
import deleteIcon from "../../assets/delete.svg"
import axios from 'axios';

export default function Card(props) {
  const navigate = useNavigate();

  const onClickDetail = () => {
    navigate(`/detail/${props.id}`)
  }

  const clickDelete = async() => {
    try {
      const response = await axios.delete(`https://backend-31q5.onrender.com/contacto/destroyContac/${props.id}`)
      const succes = response.data
      if(succes === true){
       await props.getContactos()
        alert(" El usuario se elimino con exito")
      }
    } catch (error) {
      
    }
  }
  return (
    <div className={style.container}>
      <div className={style.card} onClick={() => onClickDetail()}>
        <div className={style.prin}>
          <div className={style.contImg}>
            <img src={props.foto.length > 0 && props.foto || userDefaul} alt="Pokemon" className={style.foto} />
          </div>

          <div className={style.name}>
            <h3 className={style.text}>{`${props.nombre.toUpperCase()} (${props.alias}) ${props.apellido.toUpperCase()}`}</h3>
          </div>
        </div>
        <div className={style.info}>
          <p className={style.stat}>Celular: {props.celular}</p>
          <p className={style.stat}>Correo: {props.correo}</p>
        </div>
      </div>
      <div>
        <img className={style.icon} src={deleteIcon} alt="" onClick={clickDelete}/>
      </div>
    </div>
  )
}