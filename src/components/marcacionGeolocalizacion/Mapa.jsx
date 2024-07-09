import React, { useState } from 'react';


function Mapa({ }) {
    const [mapa, setMapa] =useState('');
    return (
        <div className="seccion-mapa">
            <h2 className="titulo-seccion">Ubicación</h2>
            <div id='mapa-container'>
                <div id="mapa" dangerouslySetInnerHTML={{ __html:mapa }}></div>
            </div>
        </div>
    );
}

export default Mapa;
