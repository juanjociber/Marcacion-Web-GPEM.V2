import React from 'react'

function BotonIngreso({ texto, esBotonIngreso, id }){
    return(
        <button
        id        = { id }
        className = { esBotonIngreso ? 'boton-registro boton-ingreso-labores inactivo' : 'boton-registro boton-ingreso-refrigerio inactivo'} 
        >
        { texto }
    </button>
    );
}

export default BotonIngreso;