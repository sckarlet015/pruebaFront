import Card from '../Card/Card';
import style from './Cards.module.css';
import { useState, useEffect } from 'react';
import { order } from './orderFilter';
import SearchBarSec from './SearchBar/SearchBarSec';
import { useDispatch } from 'react-redux';
import { get_contacts } from '../../redux/actions/actions';
import axios from 'axios';

export default function Cards(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const { usuario } = props
  const [sortOrder, setSortOrder] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const dispatch = useDispatch()
  const [contactos, setContactos] = useState([])
  const [dataBool, setDataBool] = useState(true)

  const getContactos = async () => {
    try {
      let response = await axios.get(`https://backend-31q5.onrender.com/contacto/allContacts/${usuario.id}`);
      if(response.data.length === 0) setDataBool(false)
      setContactos(response = response.data);
      dispatch(get_contacts(response.data))
    } catch (error) {
      alert(error.response.message)
    }
  }
  useEffect(() => {
    if (contactos.length === 0 && usuario.id.length > 0 && dataBool === true) {
      getContactos()
    }
  }, [contactos]);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const pageSize = 8;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const orderChange = (orderQuery) => {
    setSortOrder(orderQuery)
  }
  const handleSearch = (query) => {
    setSearchQuery(query)
  }
  const handleReset = () => {
    setSearchQuery("");
    setSortOrder("");
    setCurrentPage(1);
  };

  const orderContact = order(contactos, sortOrder, searchQuery)
  const noContactFound = orderContact.length === 0;
  return (
    <div className={style.DivCards}>
      <div>
        <SearchBarSec
          orderChange={orderChange}
          handleSearch={handleSearch}
          handleReset={handleReset}
        />
      </div>
      <div className={style.conteinerCards}>
        {noContactFound && (
          <div>
            <h2>No hay contactos que coincidan</h2>
          </div>
        )}
        {!noContactFound &&
          orderContact?.slice(startIndex, endIndex)?.map((ele) => (
            <Card
              nombre={ele.nombre}
              id={ele.id}
              key={ele.id}
              vida={ele.vida}
              apellido={ele.apellido}
              alias={ele.alias}
              celular={ele.celular}
              correo={ele.correo}
              foto={ele.foto}
              getContactos={getContactos}
            />
          ))}
      </div>
      <div className={style.btns}>
        <button className={style.btn} onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <button className={style.btn} onClick={handleNextPage} disabled={endIndex >= contactos.length}>
          Siguiente
        </button>
      </div>
    </div>
  );
}