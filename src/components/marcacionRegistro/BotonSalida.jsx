import React from 'react'

function BotonSalida({ texto, esBotonSalida, id }){
    return(
        <button
        id        = { id }
        className = { esBotonSalida ? 'boton-registro boton-salida-refrigerio inactivo' : 'boton-registro boton-salida-labores inactivo' } 
        >
        { texto }
    </button>
    );
}

export default BotonSalida;