import React, { useState, useEffect, useRef, useCallback } from 'react';
import Dni from './components/marcacionDni/Dni';
import DataUsuario from './components/marcacionDatosUsuario/DataUsuario';
import Registro from './components/marcacionRegistro/Registro';
import Gps from './components/marcacionGeolocalizacion/Gps';
import HoraFecha from './components/marcacionHoraFecha/HoraFecha';
import Modal from './components/marcacionModal/Modal';
import Swal from 'sweetalert2';
import './App.css';
import FullScreenSpinner from './components/FullScreenSpinner';

const arrayBotones = [false,false,false,false];

const App = () => {
  const [entradaFecha, setEntradaFecha]     = useState('-*-');
  const [entradaHorario, setEntradaHorario] = useState('-*-');
  const [loading, setLoading]               = useState(false);
  const [usuario, setUsuario]               = useState(null);
  const [isVisible, setIsVisible]           = useState(false);
  const [tipo, setTipo]                     = useState('');
  const [nroDni, setNroDni]                 = useState('');
  const [controlBotones, setControlBotones] = useState(arrayBotones);
  const inputRef = useRef(null);
  const [objetoNuevo, setObjetoNuevo] = useState(null);
  const [objetoActualizado, setObjetoActualizado] = useState(null);

  const handleOpen = (type) => {
    setTipo(type);
    setIsVisible(true);
  };

  const handleClose = () => setIsVisible(false);

  const handleSetArray = useCallback((controlBotones) => {
    setControlBotones(controlBotones);
  }, []);

  
  /**LA CABECERA SE MANTIENE SI HAY SCROLL */
  useEffect(() => {
    const navegacionFija = () => {
      const headerFijo = document.querySelector('#header');
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          headerFijo.classList.remove('fijo');
        } else {
          headerFijo.classList.add('fijo');
        }
      });
      observer.observe(document.querySelector('#mostrar'));
    };
    navegacionFija();
  }, []);

  const handleChange = (e) => {
    setNroDni(e.target.value);
  };

  /** DNI */
  const handleDataSubmit = useCallback(async (nroDni) => {
    if (nroDni === '') {
      Swal.fire({
        title: 'Aviso',
        text: 'Por favor ingrese el número de DNI',
        icon: 'warning',
        timer: 3000
      });
      return;
    }
    if (nroDni.length !== 8 || !/^\d{8}$/.test(nroDni)) {
      Swal.fire({
        title: 'Aviso',
        text: 'El DNI debe contener exactamente 8 dígitos.',
        icon: 'warning',
        timer: 3000
      });
      document.querySelector('#nroDni').value = '';
      return false;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('dni', nroDni);
      
        const response = await fetch(`http://intranet.gpemsac.com/marcador/controller/BuscarPersonalApi.php`, {
        method: 'POST',
        body: formData       
      });
    
      if (!response.ok) {
        throw new Error(response.status + ' ' + response.statusText);
      }
      const datos = await response.json();
      console.log('MATRIZ DE DATOS:',{datos});
      setObjetoNuevo(datos.data.programacion);
      if (!datos.res) {
        throw new Error(datos.msg);
      }


      //console.log('TRUE', datos);  
      const fecha = document.querySelector('#entrada-fecha').value = datos.data.marcacion.fecha;
      const turno = document.querySelector('#entrada-fecha').value = datos.data.marcacion.turno;

      const mostrarMarcaciones = () => {
        const botones = [
          datos.data.marcacion.asistencia1 !== null,
          datos.data.marcacion.asistencia2 !== null,
          datos.data.marcacion.refrigerio1 !== null,
          datos.data.marcacion.refrigerio2 !== null
        ];
        setControlBotones(botones);
        console.log('MOSTRANDO BOTONES',botones);
      };

      const horaActual = new Date(datos.hora);
      const horaProgramada = new Date(datos.data.programacion.programacion1);
      const horaRefrigerio1 = new Date(datos.data.programacion.refrigerio1);

      if (datos.data.programacion.tecnicosino === 1) {
        console.warn('marcación iniciada');
          const diferenciaMinutos = (horaActual - horaRefrigerio1) / (1000 * 60);
          const redondeoDiferenciaMinutos = Math.round(diferenciaMinutos); 
            console.log('DIFERENCIA MINUTOS',redondeoDiferenciaMinutos);
          // Verificar si han pasado al menos 45 minutos
          if (diferenciaMinutos < 45) {
              //const horaPermitida = datos.data.programacion.Refrigerio1;
              const horaPermitida = new Date(datos.data.programacion.refrigerio1); // Creas una nueva instancia de Date
              // Sumas 45 minutos a la hora actual
              horaPermitida.setMinutes(horaPermitida.getMinutes() + 45);
           
              Swal.fire({
                title: 'Información de Marcación',
                html: `Por favor, espere un tiempo adecuado antes de marcar su regreso de refrigerio. <br><strong>Hora sugerida : ${horaPermitida.toLocaleTimeString()} Hrs.</strong>`,
                icon: 'info',
                timer: 6000
              });
              setUsuario(datos.data);
              mostrarMarcaciones();
              return false;
          }
        setEntradaFecha(fecha);
        setEntradaHorario(turno);
        mostrarMarcaciones();          
      } 
      else {
        console.warn('marcación nueva');
        const diferenciaMinutos = (horaActual - horaProgramada) / (1000 * 60);
        if ( diferenciaMinutos < -5 ) {
          const horas = new Date(datos.data.programacion.programacion1).toTimeString().split(' ')[0];
          Swal.fire({
            title: 'Información de Marcación',
            html: `Por favor, espere un tiempo adecuado antes de marcar su ingreso. Le recuerdo que su hora programada para hoy : ${new Date().toLocaleDateString()} es a la(s) ${horas} Hrs.`,
            icon: 'info',
            timer: 6000
          });
          setUsuario(datos.data);
          mostrarMarcaciones();
          return false;
        }
        setEntradaFecha(fecha);
        setEntradaHorario(turno);
      }
      setEntradaFecha(fecha);
      setEntradaHorario(turno);
      mostrarMarcaciones();        
      setUsuario(datos.data);
    } 
    catch (ex) {
      Swal.fire({
        title: 'Aviso',
        text: ex.message,
        icon: 'warning',
        timer: 3000
      });

      console.log(ex.message);
 
      setLoading(false);
      console.log('Finalizando petición');
      setUsuario(null);
    } 
    finally {
      setTimeout(() => setLoading(false), 1000);
    }
  }, [setUsuario,setLoading,handleSetArray]);

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const nroDni = inputRef.current.value.trim();
      if (nroDni === '') {
        Swal.fire({
          title: 'Aviso',
          text: 'Ingrese DNI válido.',
          icon: 'warning',
          timer: 3000
        });
        setUsuario('');
        setControlBotones(arrayBotones);
        document.querySelector('#btnAsistencia').removeAttribute('disabled','disabled');
        document.querySelector('#btnRefrigerio').removeAttribute('disabled','disabled');
        inputRef.current.focus();
      } else {
        handleDataSubmit(nroDni);
      }
    }
  };
  
  /**NO PERMITE INGRESO DE TEXTO */
  useEffect(() => {
    const restrictText = (event) => {
      let value = event.target.value;
      event.target.value = value.replace(/\D/g, '');
    };
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('input', restrictText);
    }
    return () => {
      if (inputElement) {
        inputElement.removeEventListener('input', restrictText);
      }
    };
  }, []);

  /**SOLO PERMITE INGRESAR 8 DÍGITOS COMO MÁXIMO */
  useEffect(() => {
    const restrictLimitDigit = (event) => {
      let value = event.target.value;
      event.target.value = value.replace(/\D/g, '').slice(0, 8);
    };
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('input', restrictLimitDigit);
    }
    return () => {
      if (inputElement) {
        inputElement.removeEventListener('input', restrictLimitDigit);
      }
    };
  }, []);

  const searchUltimaMaracion = async (id) => {
    const formData = new FormData();
    formData.append('id', id);

    const response = await fetch('http://intranet.gpemsac.com/marcador/controller/BuscarUltimaMarcacion.php', {
      method: 'POST',
      body: formData
    });
    if (!response.ok) {
      throw new Error(response.status + ' ' + response.statusText);
    }
    const datos = await response.json();
    if (!datos.res) {
      throw new Error(datos.msg);
    }
    console.log('Respuesta del servidor: ', datos.data);
    setObjetoActualizado(datos.data);

  };

  console.log('OBJETO ACTUALIZADO', objetoActualizado);

  //Desestructurando objeto nuevo 
  const {asistencia1:a1,asistencia2:a2,refrigerio1:r1,refrigerio2:r2 } = objetoActualizado || {}

  const { asistencia1, asistencia2, refrigerio1, refrigerio2, tecnicosino, fecha, turno, programacion1 } = objetoNuevo || {};

  /** INICIO */
  const removeInactiveClass = (id) => {
    document.querySelector(id).classList.remove('inactivo'); 
  }
  /** FIN */
  
  const handleModalButtonClick = async (event,forma) => {
    const buttonId = event.target.id;
    try {
      const formData = new FormData();
      const latitud = document.querySelector('#latitud').textContent;
      const longitud = document.querySelector('#longitud').textContent;
      const direccion = document.querySelector('#direccion').textContent;
      const codigo = document.querySelector('#codigo').value;

      formData.append('latitud', latitud);
      formData.append('longitud', longitud);
      formData.append('direccion', direccion);
      formData.append('id', codigo);
      formData.append('tipo', tipo);
      formData.append('forma',forma)
     
      console.log('Datos a enviar: ', { longitud, latitud, direccion, codigo, tipo, forma });
      console.log(formData);

      const response = await fetch('http://intranet.gpemsac.com/marcador/controller/RegistrarMarcacion.php', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error(response.status + ' ' + response.statusText);
      }
      const datos = await response.json();

      console.log('SALVAME',datos);

      if (!datos.res) {
        throw new Error(datos.msg);
      }
      console.warn('Respuesta del servidor registro marcacion : ', datos);
      setIsVisible(false);

      await searchUltimaMaracion(codigo);
    
      Swal.fire({
        title: 'Éxito',
        text: 'Datos enviados correctamente.',
        icon: 'success',
        timer: 3000
      });

      /** INICIO */
      switch (buttonId) {
        case 'modalBtnIngresoLabores':
            // AGREGAR LÓGICA DE NEGOCIO
            if(a1!==null)
            removeInactiveClass("#btnIngresoLabores");
            break;
        case 'modalBtnSalidaLabores':
            // AGREGAR LÓGICA DE NEGOCIO
            if(a2!==null)
            removeInactiveClass("#btnSalidaLabores");
            break;
        case 'modalBtnIngresoRefrigerio':
            // AGREGAR LÓGICA DE NEGOCIO
            if(r1!==null)
            removeInactiveClass("#btnIngresoRefrigerio");
            break;
        case 'modalBtnSalidaRefrigerio':
            // AGREGAR LÓGICA DE NEGOCIO
            if(r2!==null);
            removeInactiveClass("#btnSalidaRefrigerio");
            break;
        default:
            return; // SALIR
      }
      /**  FIN */

    } 
    catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        timer: 3000
      });
      console.log(error.message);
    } 
    finally {
      handleClose();
    }
  };

  const handleButtonClick = async (buttonType) => {
    const codigo = document.querySelector('#codigo').value;
    if (!(codigo > 0)) {
      Swal.fire({
        title: 'Aviso',
        html: `<strong>NO SE RECONOCE EL DNI</strong><br>Verifique antes de continuar`,
        icon: 'warning',
        timer: 3000
      });
      return null;
    }
    
    handleOpen(buttonType);
    /**ASISTENCIA */
    if (buttonType === 'asistencia') {
        toggleButtons('.boton-ingreso-lab', '.boton-salida-lab', true);
        toggleButtons('.boton-ingreso-ref', '.boton-salida-ref', false);

        const mIngresoLabores = document.querySelector('#modalBtnIngresoLabores');         
        const mSalidaLabores = document.querySelector('#modalBtnSalidaLabores');         
        if(asistencia1 === null){
          mSalidaLabores.setAttribute('disabled','disabled');
        }
        if(asistencia1 != null && asistencia2 === null ){
          mSalidaLabores.removeAttribute('disabled','disabled');
          mIngresoLabores.setAttribute('disabled','disabled');
        }

        const horaActual = new Date();
        const programacion = new Date(programacion1);
        if(tecnicosino === 0 || tecnicosino === 2){
          console.log('marcación nueva');
          const diferenciaMinutos = (horaActual - programacion) / (1000 * 60);
  
          if ( diferenciaMinutos < -5 ) {
            const horas = new Date(programacion1).toTimeString().split(' ')[0];
            Swal.fire({
              title: 'Información de Marcación',
              html: `Por favor, espere un tiempo adecuado antes de marcar su ingreso. Le recuerdo que su hora programada para hoy : ${new Date().toLocaleDateString()} es a la(s) ${horas} Hrs.`,
              icon: 'info',
              timer: 6000
            });
            handleClose();
            return false;
          }
          setEntradaFecha(fecha);
          setEntradaHorario(turno);
        }

    }
    /**REFRIGERIO */
    if (buttonType === 'refrigerio') {
        toggleButtons('.boton-ingreso-ref', '.boton-salida-ref', true);
        toggleButtons('.boton-ingreso-lab', '.boton-salida-lab', false);
        const mSalidaRefrigerio = document.querySelector('#modalBtnSalidaRefrigerio');
        const mIngresoRefrigerio = document.querySelector('#modalBtnIngresoRefrigerio');
        const btnRefrigerio = document.querySelector('#btnRefrigerio');
        if(refrigerio1 === null){
          mSalidaRefrigerio.setAttribute('disabled','disabled');

        }
        if(refrigerio1 !=null && refrigerio2 === null){
          mIngresoRefrigerio.setAttribute('disabled','disabled');
          btnRefrigerio.removeAttribute('disabled','disabled');
          mSalidaRefrigerio.removeAttribute('disabled','disabled');
        }

        const fechaActual = document.querySelector('#entrada-fecha').value = fecha;
        const turnoActual = document.querySelector('#entrada-fecha').value = turno;

        const horaActual = new Date();
        const horaRefrigerio1 = new Date(refrigerio1);
        if (tecnicosino === 1) {
          console.log('marcación iniciada');
            const diferenciaMinutos = (horaActual - horaRefrigerio1) / (1000 * 60);
            const redondeoDiferenciaMinutos = Math.round(diferenciaMinutos); 
              console.log('DIFERENCIA MINUTOS',redondeoDiferenciaMinutos);
            // Verificar si han pasado al menos 45 minutos
            if (diferenciaMinutos < 45) {
                //const horaPermitida = datos.data.programacion.Refrigerio1;
                const horaPermitida = new Date(horaRefrigerio1); // Creas una nueva instancia de Date
                // Sumas 45 minutos a la hora actual
                horaPermitida.setMinutes(horaPermitida.getMinutes() + 45);   
                Swal.fire({
                  title: 'Información de Marcación',
                  html: `Por favor, espere un tiempo adecuado antes de marcar su regreso de refrigerio. <br><strong>Hora sugerida : ${horaPermitida.toLocaleTimeString()} Hrs.</strong>`,
                  icon: 'info',
                  timer: 6000
                });
                handleClose();
                return false;
            }
          setEntradaFecha(fechaActual);
          setEntradaHorario(turnoActual);
        }
    }
  };

  const toggleButtons = (ingresoClass, salidaClass, show) => {
    const action = show ? 'remove' : 'add';
    document.querySelector(ingresoClass).classList[action]('hidden');
    document.querySelector(salidaClass).classList[action]('hidden');
  };

  return (
    <div>
      <h1 id='header'>Control de marcaciones</h1>
      <div id='mostrar'></div>
      <div className="contenedor">
        {loading && <FullScreenSpinner />}
        <Dni
          inputRef          = { inputRef }
          handleKeyDown     = { handleKeyDown }
          nroDni            = { nroDni }
          handleChange      = { handleChange }
          handleButtonClick = { handleButtonClick }
          objetoNuevo       = { objetoNuevo }
        />
        <DataUsuario 
          usuario         = { usuario } 
        />
        <Registro
          entradaFecha    = { entradaFecha } 
          entradaHorario  = { entradaHorario }
          controlBotones  = { controlBotones }

        />
        <Gps />
        <HoraFecha />
        <Modal
          isVisible               = { isVisible }
          handleClose             = { handleClose }
          handleModalButtonClick  = { handleModalButtonClick }
          tipo                    = { tipo }
        />
      </div>
      <footer>
        <p>
          Desarrollado por{' '}
          <a href="#" rel="noopener noreferrer">
            GPEM S.A.C
          </a>{' '}
          &copy; 2024
        </p>
      </footer>
    </div>
  );
};

export default App;
