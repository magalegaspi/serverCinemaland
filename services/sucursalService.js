const sucursalRepository = require('../repositories/sucursalSQLRepository')

exports.getTodasSucursales = async () => {
    try {
        console.log("SERVICE - getTodasSucursales")
        let testDatos = await sucursalRepository.getSucursalesRepository()
        //console.log("SERVICE - " + testDatos)
        return testDatos
    } catch (error) {
        console.log("Error en getTodasSucursales - " + error)
        //throw Error("Error en getTodasSucursales - " + error) 
    }
}

exports.getSucursalesFiltered = (sucursal, orderBy) => {
    try {
        console.log(`SERVICE - getSucursalesFiltered - sucursal:${sucursal} - orderBy:${orderBy}`)
        return sucursalRepository.getSucursalesFilteredRepository(sucursal,orderBy)
    } catch (error) {
        console.log("Error en getSucursalesFiltered - " + error)
        throw Error("Error en getSucursalesFiltered - " + error)
    }
}

exports.createNewSucursal = async (sucursal) => {
    try {
        console.log(`SERVICE - createNewSucursal - sucursal:${sucursal}`)

        return await sucursalRepository.createNewSucursalRepository(sucursal)
    } catch (error) {
        console.log("Error en createNewSucursal - " + error)
        throw Error("Error en el service: " + error)
    }
}

exports.deleteSucursal = async (id) => {
    try {
        console.log(`SERVICE - deleteSucursal - id:${id}`)
        return await frontendRepository.deleteSucursalRepository(id)
    } catch (error) {
        console.log("Error en deleteSucursal  - " + error)
        throw Error("Error en el service: " + error)
    }
}

exports.updateSucursal = async (id, sucursalActualizada) => {
    try {
        console.log(`SERVICE - updateSucursal - id:${id} - sucursalActualizada:${sucursalActualizada}`)
        return await sucursalRepository.updateSucursalRepository(id, sucursalActualizada)
    } catch (error) {
        console.log("Error en updateSucursal  - " + error)
        throw Error("Error en el service: " + error)
    }
}

exports.updateSucursalItem = async (id, sucursalActualizada) => {
    try {
        console.log(`SERVICE - updateSucursalItem - id:${id} - sucursalActualizada:${JSON.stringify(sucursalActualizada)}`)
        return await sucursalRepository.updateSucursalItemRepository(id, sucursalActualizada)
    } catch (error) {
        console.log("Error en updateSucursal  - " + error)
        throw Error("Error en el service: " + error)
    }
}