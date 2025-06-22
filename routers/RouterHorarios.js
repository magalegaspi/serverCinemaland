// Importa Express para crear rutas
const express = require('express');

// Crea un enrutador para manejar las rutas relacionadas a horarios
const routerHorarios = express.Router();

// Permite que el enrutador procese datos en formato JSON
routerHorarios.use(express.json());

// Importa el controlador que contiene las funciones para manejar horarios
const horariosController = require('../controllers/horariosController');

// Ruta GET que lista todos los horarios
routerHorarios.get('/', horariosController.readHorarios);

// Ruta GET que lista horarios ordenados según algún criterio (recibe un parámetro dinámico)
routerHorarios.get('/:horario', horariosController.readHorarioOrdered);

// Ruta POST que permite crear un nuevo horario
routerHorarios.post('/', horariosController.createHorario);

// Ruta DELETE que elimina un horario por ID
routerHorarios.delete('/:id', horariosController.deleteHorario);

// Ruta PUT que actualiza por completo un horario existente por ID
routerHorarios.put('/:id', horariosController.updateHorario);

// Ruta PATCH que actualiza parcialmente un horario existente por ID
routerHorarios.patch('/:id', horariosController.updateHorarioItems);

// Exporta el enrutador para ser usado en otros archivos (por ejemplo, en el archivo principal del servidor)
module.exports = routerHorarios;
