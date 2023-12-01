import { Routes, Route, useLocation, Navigate, useNavigate  } from 'react-router-dom'
import './App.css';
import React from 'react'
import { useSelector } from 'react-redux';
import Cards from './components/Cards/Cards';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import Detail from './components/detail/Detail';
import Register from './components/Register/Register';
import Formulario from './components/Formulario/Formulario';
import UserDetail from './components/User/UserDetail';


function App() {

  const location = useLocation();
  const usuario = useSelector(state => state.usuario)

  return (
    <div className="App">
      {location.pathname !== '/' && location.pathname !== '/register' && <Nav />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route
          path='/agenda'
          element={usuario && usuario.id && usuario.id.length > 0 ? <Cards usuario={usuario} /> : <Navigate to="/" replace={true} />}
        />
        <Route
          path='/user'
          element={usuario && usuario.id && usuario.id.length > 0 ? <UserDetail usuario={usuario} /> : <Navigate to="/" replace={true} />}
        />
        <Route
          path='/create'
          element={usuario && usuario.id && usuario.id.length > 0 ? <Formulario /> : <Navigate to="/" replace={true} />}
        />
        <Route path='/detail/:id' element={usuario && usuario.id && usuario.id.length > 0 ? <Detail /> : <Navigate to="/" replace={true} />} />
      </Routes>
    </div>
  );
}

export default App;

