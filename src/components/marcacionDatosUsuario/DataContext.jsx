import React, { createContext, useContext } from 'react';

const personal = [
  {
    pers_codigo: 1,
    idcargo: 1,
    idarea: 1,
    pers_nombres: "Fernando Edilberto",
    pers_apellidos: "Hernández Gonzales",
    pers_alias: "fernando",
    pers_dni: "50505050",
    pers_fechaIngreso: "2024-01-01",
    pers_fechaNac: "1980-01-01",
    pers_direccion: "Dirección 100",
    pers_telefono: "989898989",
    pers_telefono2: "979798987",
    pers_fechaCese: "2024-02-10",
    pers_motivoCese: "Solicitud",
    pers_estado: 2,
    pers_nivel: null,
    bib_acceso: 1,
    ccrh: 0,
    pers_actualizacion: null
  },
  {
    pers_codigo: 2,
    idcargo: 2,
    idarea: 1,
    pers_nombres: "Maria Fernanda",
    pers_apellidos: "Perez Lopez",
    pers_alias: "maria",
    pers_dni: "40404040",
    pers_fechaIngreso: "2024-02-01",
    pers_fechaNac: "1988-02-01",
    pers_direccion: "Dirección 200",
    pers_telefono: "979797979",
    pers_telefono2: "960606060",
    pers_fechaCese: "2024-06-10",
    pers_motivoCese: "Solicitud",
    pers_estado: 2,
    pers_nivel: null,
    bib_acceso: 1,
    ccrh: 0,
    pers_actualizacion: null
  }
];

const marcaciones = [
  {
    idmarcacion: 1,
    idpersonal: 1,
    idturno: 1,
    fecha: "2024-06-19",
    condicion: 1,
    turnoinicio: "08:00 A 18:00",
    turnofinal: "08:00 A 18:00",
    programacion1: "2024-06-13 08:00:00",
    programacion2: "2024-06-13 18:00:00",
    asistencia1: null,
    asistencia2: null,
    desayuno1: null,
    desayuno2: null,
    refrigerio1: null,
    refrigerio2: null,
    tecnicosino: 0,
    estado: 0,
    observacion: null,
    ccnivel: 51,
    actualizacion: null,
    gps_direccion: null,
    gps_longitud: null,
    gps_latitud: null
  },
  {
    idmarcacion: 2,
    idpersonal: 2,
    idturno: 1,
    fecha: "2024-06-18",
    condicion: 1,
    turnoinicio: "13:00 A 22:00",
    turnofinal: "13:00 A 22:00",
    programacion1: "2024-06-18 13:00:00",
    programacion2: "2024-06-18 22:00:00",
    asistencia1: null,
    asistencia2: null,
    desayuno1: null,
    desayuno2: null,
    refrigerio1: null,
    refrigerio2: null,
    tecnicosino: 0,
    estado: 0,
    observacion: null,
    ccnivel: 51,
    actualizacion: null,
    gps_direccion: null,
    gps_longitud: null,
    gps_latitud: null
  }
];

const areas = [
  {
    idarea: 1,
    area: "Sistemas",
    estado: 2,
    usuario: null
  },
  {
    idarea: 2,
    area: "Administracion",
    estado: 2,
    usuario: null
  }
];

const cargos = [
  {
    idcargo: 1,
    idarea: 1,
    cargo: "Programador",
    estado: 2,
    usuario: null
  },
  {
    idcargo: 2,
    idarea: 1,
    cargo: "Analista TI",
    estado: 2,
    usuario: null
  }
];

const turnos = [
  {
    idturno: 1,
    turno: "diurno",
    idturnomtn: 0,
    horainicio: "08:00:00",
    horafin: "18:00:00",
    cambiodia: 0,
    tipo: 0,
    bancohrs: 0,
    estado: 2,
    actualizacion: 1
  }
];

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const data = { personal, cargos, areas, marcaciones, turnos };

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);


