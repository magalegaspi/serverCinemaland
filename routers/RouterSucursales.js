const express = require("express");
const routerSucursal = express.Router();
const sucursalController = require("../controllers/sucursalController");

routerSucursal.use(express.json());

// get
routerSucursal.get("/", sucursalController.readSucursales);
routerSucursal.get("/:sucursal", sucursalController.readSucursalCompleta);
routerSucursal.get("/detalle/:nombre", sucursalController.readSucursalCompleta);

// post
routerSucursal.post("/", sucursalController.createSucursal);

// put
routerSucursal.put("/:id", sucursalController.updateSucursal);

// delete
routerSucursal.delete("/:id", sucursalController.deleteSucursal);
routerSucursal.delete("/:id/horario/:hora", sucursalController.deleteHorario);
routerSucursal.delete("/:id/asiento/:codigo", sucursalController.deleteAsiento);

// patch
routerSucursal.patch("/:id", sucursalController.updateSucursalItems);


module.exports = routerSucursal;
