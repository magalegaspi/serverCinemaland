const express = require('express');

const routerSucursal = express.Router();

routerSucursal.use(express.json());

const sucursalController = require('../controllers/sucursalController')

routerSucursal.get('/', sucursalController.readSucursales)
routerSucursal.get('/:sucursal', sucursalController.readSucursalOrdered)
routerSucursal.get('/:sucursal', sucursalController.readSucursalOrdered)
routerSucursal.post('/', sucursalController.createSucursal)
routerSucursal.delete('/:id', sucursalController.deleteSucursal)
routerSucursal.put("/:id", sucursalController.updateSucursal)
routerSucursal.patch("/:id", sucursalController.updateSucursalItems)


module.exports = routerSucursal