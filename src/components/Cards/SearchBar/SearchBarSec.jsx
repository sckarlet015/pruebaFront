import React from 'react';
import style from "./SearchBar.module.css"


const SearchBarSec = ({ orderChange, handleSearch, handleReset }) => {

  const handleSearchChange = (event) => {
    handleSearch(event.target.value);
  };

  return (
    <div className={style.conteiner}>  
      <input
        className={style.inp}
        type="text"
        id="searchQuery"
        placeholder="Nombre"
        onChange={handleSearchChange}
      />
      <button className={style.btn} onClick={handleReset}>Reset</button>
      <button className={style.btn} onClick={() => orderChange('AtoZ')}>Nombre &#8593;</button>
      <button className={style.btn} onClick={() => orderChange('ZtoA')}>Nombre &#8595;</button>

    </div>
  );
};

export default SearchBarSec;
