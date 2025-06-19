const frontend = require('../src/lenguajesFrontBack').infoLenguajes.frontend // CAMBIAR ESTOOOO
const { getSQLConnection } = require('../database/conexion')
const queries = require('../database/queries')
const sql = require('mssql');


// ACA VAN TODOS LOS SCRIPTS PARA LLAMAR A LA BASE DE DATOS Y TRAER LAS SUCURSALES