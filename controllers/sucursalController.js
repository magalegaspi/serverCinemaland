const sucursalService = require('../services/sucursalService')

exports.readSucursales = async (req, res) => {
    try {
        console.log("entrando a readSucursales")
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await sucursalService.getTodasSucursales())
    } catch (error) {
        console.log("Error en readSucursales - " + error)
        res.status(500).send( { code: 500, message: "Error al obtener las sucursales"})
    }
}

exports.readSucursalOrdered = (req, res) => {
    const sucursal = req.params.sucursal;
    const paramOrdenar = req.query.ordenar;
    const sucursalFiltered = sucursalService.getSucursalesFiltered(sucursal,paramOrdenar)

    if(sucursalFiltered.length === 0){
        return res.status(404).send(`No se encontró la sucursal:${sucursal}`)
    }

    res.setHeader('Content-Type', 'application/json')
    res.status(200)
    res.send(JSON.stringify(sucursalFiltered))
}

exports.createSucursal = async (req, res) => {
    try {
        let sucursalNueva = req.body;
        res.send(await sucursalService.createNewSucursal(sucursalNueva))
    } catch (error) {
        console.log("Error en createSucursal - " + error)
        res.status(500).send( { code: 500, message: "Error al agregar la sucursal"})
    }

}

exports.deleteSucursal = async (req, res) => {
    try {
        const id = req.params.id;
        const sucursales = await sucursalService.deleteSucursal(id)

        if (sucursales.length === 0) {
            return res.status(404).send("Error! No se encuentra la sucursal: " + id)
        }

        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(sucursales)
    } catch (error) {
        console.log("Error en deleteSucursal - " + error)
        res.status(500).send({ code: 500, message: "Error al eliminar la sucursal" })
    }

}

exports.updateSucursal = async (req, res) => {
    try {
        const sucursalActualizada = req.body;
        const id = req.params.id;

        const sucursales = await sucursalService.updateSucursal(id, sucursalActualizada)

        if (sucursales.length === 0) {
            return res.status(404).send("Error! No se encuentra la sucursal: " + id)
        }

        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(sucursales)
    } catch (error) {
        console.log("Error en updateSucursal - " + error)
        res.status(500).send({ code: 500, message: "Error al actualizar la sucursal" })
    }
}

exports.updateSucursalItems = async (req, res) => {
    try {
        const { id } = req.params;
        const sucursalActualizada = req.body;

        const sucursales = await sucursalService.updateSucursalItem(id, sucursalActualizada)

        if (sucursales.length === 0) {
            return res.status(404).send("Error! No se encuentra la sucursal con el id: " + id)
        }

        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(sucursales)
    } catch (error) {
        console.log("Error en updateSucursalItems - " + error)
        res.status(500).send({ code: 500, message: "Error al actualizar la sucursal" })
    }
}