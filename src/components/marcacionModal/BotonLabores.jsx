import React from 'react'

function BotonLabores( { texto, esBotonIngreso, manejarClic, id }){

    return(
        <button
            id          = { id }
            className   = { esBotonIngreso ? 'boton-ingreso boton-ingreso-lab' : 'boton-salida boton-salida-lab' }
            onClick     = { manejarClic }
            >
            {texto}
        </button>
    );
}

export default BotonLabores;