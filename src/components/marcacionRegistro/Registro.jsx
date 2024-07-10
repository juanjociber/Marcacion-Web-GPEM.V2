import React, {useEffect} from 'react';
import BotonIngreso from './BotonIngreso';
import BotonSalida from './BotonSalida';
import { AiOutlineFieldTime } from "react-icons/ai";

const Registro = ({ entradaFecha, entradaHorario, controlBotones}) => {

  return (
    <div className='box-registro'>
      <h2 className="titulo-seccion">Registro de actividades <AiOutlineFieldTime /></h2>
      <div className="seccion-registro">
        <div className="contenedor-fecha-horario">
          <p className="etiqueta-fecha">Fecha <span>:</span></p>
          <input className="entrada-fecha" id="entrada-fecha" disabled value={ entradaFecha } />
          <p className="etiqueta-horario">Horario <span>:</span></p>
          <input className="entrada-horario" id="entrada-horario" disabled value={ entradaHorario } />
        </div>
        <div className="grupo-botones-registro">
          {controlBotones[0] && (
            <BotonIngreso
              texto='Ingreso labores'
              esBotonIngreso={true}
              id='btnIngresoLabores'
            />
          )}

          {controlBotones[2] && (
            <BotonIngreso
              texto='Ingreso refrigerio'
              esBotonIngreso={false}
              id='btnIngresoRefrigerio'
            />
          )}
          {controlBotones[3] && (
            <BotonSalida
              texto='Salida refrigerio'
              esBotonSalida={true}
              id='btnSalidaRefrigerio'
            />
          )}

          {controlBotones[1] && (
            <BotonSalida
              texto='Salida labores'
              esBotonSalida={false}
              id='btnSalidaLabores'
            />
          )}
          
        </div>
      </div>
    </div>
  );
}

export default Registro;
