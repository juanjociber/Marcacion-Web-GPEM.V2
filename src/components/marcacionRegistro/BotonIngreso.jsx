import React from 'react'

function BotonIngreso({ texto, esBotonIngreso, id }){
    return(
        <button
        id        = { id }
        className = { esBotonIngreso ? 'boton-registro boton-ingreso-labores' : 'boton-registro boton-ingreso-refrigerio'} 
        >
        { texto }
    </button>
    );
}

export default BotonIngreso;