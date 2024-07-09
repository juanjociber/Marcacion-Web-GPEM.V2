import React, { useState, useEffect } from 'react';

const HoraFecha = () => {

  const [ hourCurrent, setHourCurrent ] = useState('');
  const [ dateCurrent, setDateCurrent ] = useState('');

  const obtenerHoraActual = () => {
    const ahora = new Date();
    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    const ampm = horas >= 12 ? 'p.m.' : 'a.m.';
    horas = horas % 12;
    horas = horas ? horas : 12; // las 0 horas se convierten a 12
    minutos = minutos < 10 ? '0' + minutos : minutos;
    return horas + ':' + minutos + ' ' + ampm;
  }

  const obtenerFechaActual = () => {
    const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('es-ES', opcionesFecha);
  }

  useEffect(() => {
    const actualizarHoraFecha = () => {
      setHourCurrent(obtenerHoraActual());
      setDateCurrent(obtenerFechaActual());
    }
    //LLAMANDO FUNCIÓN INICIALMENTE
    actualizarHoraFecha();
    //ACTUALIZAR HORA Y FECHA CADA SEGUNDO
    const intervalo = setInterval(actualizarHoraFecha, 1000);
    //LIMPIAR EL INTERVLO AL DESMONTAR EL COMPONENTE PARA EVITAR PÉRDIDAS DE MEMORIA
    return () =>{
      clearInterval(intervalo);
    }
  }, []); //EL ARRAY VACIO ASEGURA QUE useEffect SE EJECUTE UNA SOLA VEZ AL MONTAR EN EL COMPONENTE
  
  return (
    <div className="seccion-hora-fecha">
      <time id="horaActual">{ hourCurrent }</time>
      <time id="fechaActual">{ dateCurrent }</time>
    </div>
  );
}

export default HoraFecha;
