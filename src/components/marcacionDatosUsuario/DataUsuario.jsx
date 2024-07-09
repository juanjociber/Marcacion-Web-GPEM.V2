import React from 'react';
import { AiOutlineUser } from "react-icons/ai";

const DataUsuario = ({ usuario }) => {

  return (
    <div className='box-usuario'>
      <h2 className="titulo-seccion">Información del usuario<AiOutlineUser /></h2>      
      <div className="seccion-informacion">
        <div className="contenedor-foto">
        <img src={`http://192.168.40.70/gpemsac/intranet/modulos/descargas/descargar-foto.php?idfoto=${usuario?.personal?.id}`} alt="Foto del usuario" />
        </div>
        <div className="contenedor-datos">
          <article className="dato">
            <label htmlFor="codigo">Código</label>
            <input type="text" id="codigo" value={usuario?.personal?.id || ''} disabled />
          </article>
          <article className="dato">
            <label htmlFor="nombre">Nombres</label>
            <input type="text" id="nombre" value={usuario?.personal?.nombres || ''} disabled />
          </article>
          <article className="dato">
            <label htmlFor="apellido">Apellidos</label>
            <input type="text" id="apellido" value={usuario?.personal?.apellidos || ''} disabled />
          </article>
          <article className="dato">
            <label htmlFor="dni">DNI</label>
            <input type="text" id="dni" value={usuario?.personal?.dni || ''} disabled />
          </article>
          <article className="dato">
            <label htmlFor="cargo">Cargo</label>
            <input type="text" id="cargo" value={usuario?.personal?.cargo || ''} disabled />
          </article>
        </div>
      </div>
    </div>
  );
}

export default DataUsuario;
