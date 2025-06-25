const express = require("express");
const routerHorario = express.Router();
const horarioController = require("../controllers/horariosController");

routerHorario.use(express.json());

// get
routerHorario.get("/", horarioController.readHorarios);
routerHorario.get("/:horario", horarioController.readHorarioSolo);
routerHorario.get("/detalle/:nombre", horarioController.readHorarioCompleto);

// post
routerHorario.post("/", horarioController.createHorario);

// put
routerHorario.put("/:id", horarioController.updateHorario);

// delete
routerHorario.delete("/:id", horarioController.deleteHorario);

// patch
routerHorario.patch("/:id", horarioController.updateHorarioItems);

module.exports = routerHorario;
