import React from 'react'

function BotonRefrigerio( { texto, esBotonIngreso, manejarClic, id }){

    return(
        <button
            id          = { id }
            className   = { esBotonIngreso ? 'boton-ingreso boton-ingreso-ref' : 'boton-salida boton-salida-ref' }
            onClick     = { manejarClic } 
            >
            { texto }
        </button>
    );
}

export default BotonRefrigerio;