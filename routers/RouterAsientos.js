const express = require("express");
const routerAsiento = express.Router();
const asientoController = require("../controllers/asientoController");

routerAsiento.use(express.json());

// get
routerAsiento.get("/", asientoController.readAsientos);
routerAsiento.get("/:asiento", asientoController.readAsientoSolo);
routerAsiento.get("/detalle/:nombre", asientoController.readAsientoCompleto);

// post
routerAsiento.post("/", asientoController.createAsiento);

// put
routerAsiento.put("/:id", asientoController.updateAsiento);

// delete
routerAsiento.delete("/:id", asientoController.deleteAsiento);

// patch
routerAsiento.patch("/:id", asientoController.updateAsientoItems);

module.exports = routerAsiento;
