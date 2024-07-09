import React from 'react'

function BotonSalida({ texto, esBotonSalida, id }){
    return(
        <button
        id        = { id }
        className = { esBotonSalida ? 'boton-registro boton-salida-refrigerio' : 'boton-registro boton-salida-labores' } 
        >
        { texto }
    </button>
    );
}

export default BotonSalida;