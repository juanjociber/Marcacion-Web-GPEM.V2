import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { AiOutlineAim } from "react-icons/ai";

function Gps() {
  const [latitud, setLatitud] = useState(null);
  const [longitud, setLongitud] = useState(null);
  const [direccion, setDireccion] = useState('');
  const [mapa, setMapa] = useState('');

  /**====================================================================
   * MÉTODOS PARA OBTENER GEOLOCALIZACIÓN: LATITUD, LONTIGUD Y DIRECCIÓN 
   * ====================================================================
   */
  async function obtenerDireccion(latitud, longitud, setDireccion, setMapa) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitud}&lon=${longitud}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const address = data.display_name;
        setDireccion(address);
        
        setMapa(`
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d3903.8292716492524!2d${longitud}!3d${latitud}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e6!4m3!3m2!1d${latitud}!2d${longitud}!4m3!3m2!1d${latitud}!2d${longitud}!5e0!3m2!1ses-419!2spe!4v1717531069082!5m2!1ses-419!2spe" 
                width="600"
                height="250" 
                style="border:0;" 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        `);
    } catch (error) {
        console.error('Error al obtener la dirección:', error);
    }
  }

  async function obtenerGeolocalizacion(setLatitud, setLongitud, setDireccion, setMapa) {
    if (navigator.geolocation) {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            const latitud = position.coords.latitude;
            const longitud = position.coords.longitude;

            setLatitud(latitud);
            setLongitud(longitud);

            await obtenerDireccion(latitud, longitud, setDireccion, setMapa);

            // VERIFICACIÓN DE COORDENADAS
            console.log(`Latitud: ${latitud}, Longitud: ${longitud}`);
        } catch (error) {
            // MANEJADOR DE ERRORES
            switch (error.code) {
              case error.PERMISSION_DENIED:
                Swal.fire({
                  title : 'Aviso',
                  text  : 'El usuario ha denegado la solicitud de geolocalización.',
                  icon  : 'warning',
                  timer : '3000'
                });
                break;
              case error.POSITION_UNAVAILABLE:
                Swal.fire({
                  title : 'Aviso',
                  text  : 'La información de ubicación no está disponible.',
                  icon  : 'warning',
                  timer : '3000'
                });
                break;
              case error.TIMEOUT:
                Swal.fire({
                  title : 'Aviso',
                  text  : 'Se ha agotado el tiempo para obtener la ubicación del usuario.',
                  icon  : 'warning',
                  timer : '3000'
                });
                break;
              case error.UNKNOWN_ERROR:
                Swal.fire({
                  title : 'Aviso',
                  text  : 'Se ha producido un error desconocido.',
                  icon  : 'warning',
                  timer : '3000'
                });
                break;
              default:
                Swal.fire({
                  title : 'Aviso',
                  text  : 'Se ha producido un error.',
                  icon  : 'warning',
                  timer : '3000'
                });
                break;
            }
        }
    } else {
        Swal.fire({
          title : 'Aviso',
          text  : 'Geolocalización no soportada por este navegador.',
          icon  : 'warning',
          timer : '3000'
        });
    }
  }

  // SE MONTA LA GEOLOCALIZACIÓN CADA VEZ QUE ES CARGA LA PÁGINA
  useEffect(() => {
    obtenerGeolocalizacion(setLatitud, setLongitud, setDireccion, setMapa);
  }, []);
    
    return (
      <div className='box-gps'>
        <h2 className="titulo-seccion">Geolocalización de ingreso <AiOutlineAim /></h2>
        <div className="seccion-gps">
          <div className="contenedor-gps">
            <div className="info-gps">
            <p className="titulo-gps">Latitud <span className='puntos'> : </span></p>
            <span className="dato-gps" id="latitud">{latitud}</span>
            </div>
            <div className="info-gps">
            <p className="titulo-gps">Longitud <span className='puntos'> : </span></p>
            <span className="dato-gps" id="longitud"> {longitud}</span>
            </div>
            <div className="info-gps">
            <p className="titulo-gps">Dirección <span className='puntos'> : </span></p>
            <span className="dato-gps" id="direccion"> {direccion}</span>
            </div>
          </div>
          <div id='mapa-container'>
            <div id="mapa" dangerouslySetInnerHTML={{ __html: mapa }}></div>
          </div>
        </div>
      </div>
    );
}

export default Gps;

