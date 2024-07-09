import React from 'react';
import ModalBotonLabores from './BotonLabores';
import ModalBotonRefrigerio from './BotonRefrigerio';

const Modal = ({ isVisible, handleClose, handleModalButtonClick }) => {
  return (
    <div id="modal" className="modal" style={{ display: isVisible ? 'flex' : 'none' }}>
      <div className="modal-contenido">
        <span className="cerrar" onClick={handleClose}>&times;</span>
        <div className="seccion-ingresar-salir">
          <div className="grupo-botones-registro modificador-botones">
            <ModalBotonLabores
              texto='Ingreso Labores'
              esBotonIngreso={true}
              manejarClic={(event) => handleModalButtonClick(event, 'ingreso')}
              id='modalBtnIngresoLabores' />

            <ModalBotonLabores
              texto='Salida Labores'
              esBotonIngreso={false}
              manejarClic={(event) => handleModalButtonClick(event, 'salida')}
              id='modalBtnSalidaLabores' />
          </div>
          <div className="grupo-botones-refrigerio modificador-botones">
            <ModalBotonRefrigerio
              texto='Ingreso Refrigerio'
              esBotonIngreso={true}
              manejarClic={(event) => handleModalButtonClick(event, 'ingreso')}
              id='modalBtnIngresoRefrigerio' />

            <ModalBotonRefrigerio
              texto='Salida Refrigerio'
              esBotonIngreso={false}
              manejarClic={(event) => handleModalButtonClick(event, 'salida')}
              id='modalBtnSalidaRefrigerio' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
