import React from 'react'
import { AiOutlineUserSwitch, AiOutlineApple } from "react-icons/ai";

// OBJETO QUE MAPEA LOS TEXTOS A LOS ICONOS CORRESPONDIENTES
const iconByText = {
    'Asistencia' : AiOutlineUserSwitch,
    'Refrigerio' : AiOutlineApple
};

function Boton({ texto, esBotonAsistencia, manejarClic, id , btnAsistencia }){
    // SELECCIONA EL ICONO BASADO EN EL TEXTO
    const Icono = iconByText[texto] || AiOutlineUserSwitch;
    return(
        <button
            id          = { id }
            className   = { esBotonAsistencia ? 'boton-asistencia' : 'boton-refrigerio' }
            onClick     = { manejarClic }
            >
            <Icono />     { texto } 
        </button>
    );
}

export default Boton;