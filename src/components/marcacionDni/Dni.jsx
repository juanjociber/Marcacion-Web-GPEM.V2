import React from 'react';
import Boton from './Boton';
import { AiOutlineSearch } from "react-icons/ai";

const Dni = ({ inputRef, handleKeyDown, nroDni, handleChange, handleButtonClick, objetoNuevo}) => {
  
  return (
    <div className='box-dni'>
      <h2 className="titulo-seccion">Ingresar DNI <AiOutlineSearch /> </h2>
      <div className="seccion-dni">
        <div className="contenedor-input">
          <label htmlFor="nroDni">Nro. DNI</label>
          <input
            type      = "tel"
            id        = "nroDni"
            ref       = { inputRef }
            value     = { nroDni }
            onChange  = { handleChange }
            onKeyDown = { handleKeyDown }
            autoComplete = "off"
          />
        </div>

        <div className="grupo-botones">
          <Boton
            id                = 'btnAsistencia'
            texto             = 'Asistencia'
            esBotonAsistencia = { true }
            manejarClic       = { () => handleButtonClick('asistencia') }
            objetoNuevo       = {objetoNuevo}
          />
          <Boton
            id                = 'btnRefrigerio'
            texto             = 'Refrigerio'
            esBotonAsistencia = { false }
            manejarClic       = { () => handleButtonClick('refrigerio') }
            disabled          = { false }
            objetoNuevo       = {objetoNuevo}
          />
        </div>
      </div>
    </div>
  );
};

export default Dni;
