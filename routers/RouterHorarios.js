const express = require("express");
const routerHorarios = express.Router();
const horarioController = require("../controllers/horariosController");

routerHorarios.use(express.json());

// GET todos los horarios
routerHorarios.get("/", horarioController.readHorarios);

// GET horarios por sucursal
routerHorarios.get("/sucursal/:id", horarioController.readHorariosPorSucursal);

// POST crear nuevo horario
routerHorarios.post("/", horarioController.createHorario);

// DELETE horario específico
routerHorarios.delete("/:id/:hora", horarioController.deleteHorario);

module.exports = routerHorarios;
