//const frontend = require('../src/lenguajesFrontBack').infoLenguajes.frontend // CAMBIAR ESTOOOO
const { getSQLConnection } = require('../database/conexion')
const queries = require('../database/queries')
const sql = require('mssql');


// ACA VAN TODOS LOS SCRIPTS PARA LLAMAR A LA BASE DE DATOS Y TRAER LAS SUCURSALES


// GET SUCURSALES
exports.getSucursalesRepository = async () => {
    const pool = await getSQLConnection()
    
    try{
        const resultado = await pool.request().query(queries.getSucursales)
        console.table(resultado.recordset)

        return resultado.recordset
    } catch (error) {
        console.log("Error en getSucursalesRepository - " + error)
        //throw Error("Error en getSucursalesRepository - " + error) 
    } finally {
        pool.close()
    }

}

// NO SE SI DEJAR ESTO

exports.getSucursalesFilteredRepository = (sucursal, orderBy) => {
    console.log(`REPOSITORY - getSucursalesLanguagesFiltered - sucursal:${sucursal} - orderBy:${orderBy}`)
    const filtrado = sucursal.filter(
        sucursales => sucursales.nombre.toLocaleLowerCase() === sucursal.toLocaleLowerCase()
    )

    console.log("El valor del query param ordenar es:", orderBy)

    if(filtrado.length === 0){
        return []
    }

    if(orderBy === "arriba"){
        return filtrado.sort(
            (a,b) => b.cantidadSucursales - a.cantidadSucursales
        )
    }else if (orderBy === "abajo"){
        return filtrado.sort(
            (a,b) => a.cantidadSucursales - b.cantidadSucursales
        )
    }else{
        return filtrado
    }
}


exports.createNewSucursalRepository = async (sucursal) => {
    const { NOMBRE_SUCURSAL, HORARIOS, ASIENTOS } = sucursal;
    const pool = await getSQLConnection();

    try {
        console.log(`REPOSITORY  - createNewSucursal - sucursal:${sucursal}`)

        const resultado = await pool.request()
        .input('NOMBRE_SUCURSAL', sql.NVarChar, NOMBRE_SUCURSAL)
        .input('HORARIOS', sql.NVarChar, HORARIOS)
        .input('ASIENTOS', sql.NVarChar, ASIENTOS)
        .query(queries.addSucursal)

        const sucursalNueva = { NOMBRE_SUCURSAL, HORARIOS, ASIENTOS }
        console.table(sucursalNueva)

        return resultado.recordset
    } catch (error) {
        console.log("createNewSucursalRepository - " + error)
        //throw Error("Error al intentar crear el nuevo lenguaje: - " + error)
    } finally {
        pool.close()
    }
}

exports.deleteSucursalRepository = async (id) => {
    const pool = await getSQLConnection();

    try {
        console.log(`REPOSITORY  - deleteSucursal - id:${id}`)
        const sucursalEncontrada = await pool.request()
        .input('id', sql.Int, id)
        .query(queries.getSucursalById)

        if(sucursalEncontrada.recordset.length == 0){
            console.log("Sucursal no encontrada");
        }else{
            console.log("Se eliminó la sucursal de la lista, id:" + id)
            console.table(sucursalEncontrada.recordset[0])
            await pool.request()
            .input('id', sql.Int, id)
            .query(queries.deleteSucursal)

            return sucursalEncontrada.recordset[0]
        }

    } catch (error) {
        console.log("deleteSucursalRepository - " + error)
        //throw Error("Error al intentar eliminar sucursal: - " + error)
    } finally {
        pool.close()
    }
}

exports.updateSucursalRepository = async (id, sucursalActualizada) => {
    console.log(`REPOSITORY  - updateSucursal - id:${id} - sucursalActualizada:${sucursalActualizada}`)
    const { NOMBRE_SUCURSAL, HORARIOS, ASIENTOS } = sucursalActualizada;
    const pool = await getSQLConnection();

    try {

        await pool.request().query('USE IFTS11')
                
        const requestActualizado = pool.request().input('id', sql.Int, id)
        if(NOMBRE_SUCURSAL != null) requestActualizado.input('NOMBRE_SUCURSAL', sql.Int, NOMBRE_SUCURSAL)
        if(HORARIOS != null) requestActualizado.input('HORARIOS', sql.NVarChar, HORARIOS)
        if(ASIENTOS != null) requestActualizado.input('ASIENTOS', sql.Int, ASIENTOS)
            
        let queryActualizada = 'UPDATE Lenguajes SET ';
        if(NOMBRE_SUCURSAL != null) queryActualizada += 'NOMBRE_SUCURSAL = @NOMBRE_SUCURSAL, '
        if(HORARIOS != null) queryActualizada += 'HORARIOS = @HORARIOS, '
        if(ASIENTOS != null) queryActualizada += 'ASIENTOS = @ASIENTOS, '

        //console.log(queryActualizada)
        queryActualizada = queryActualizada.trim().replace(/,$/, '')
        //console.log(queryActualizada)
        queryActualizada += ' WHERE id = @id'
        //console.log(queryActualizada)

        const sucursalActualizada = await requestActualizado.query(queryActualizada)
        
        if(sucursalActualizada.rowsAffected[0] == 0){
            return null
        }

        return { NOMBRE_SUCURSAL, HORARIOS, ASIENTOS }

    } catch (error) {
        console.log("updateSucursalRepository - " + error)
        //throw Error("Error al intentar actualizar el lenguaje: - " + error)
    } finally {
        pool.close()
    }
}

exports.updateSucursalItemRepository = async (id, sucursalActualizada) => {
    console.log(`REPOSITORY  - updateSucursalItem - id:${id} - sucursalActualizada:${JSON.stringify(sucursalActualizada)}`)

    const { NOMBRE_SUCURSAL, HORARIOS, ASIENTOS } = sucursalActualizada;
    const pool = await getSQLConnection();

    try {

        await pool.request().query('USE IFTS11')

        let queryActualizada = 'UPDATE Lenguajes SET ';
        const requestActualizado = pool.request().input('id', sql.Int, id)
        if (NOMBRE_SUCURSAL != null) {
            requestActualizado.input('NOMBRE_SUCURSAL', sql.Int, NOMBRE_SUCURSAL)
            queryActualizada += 'NOMBRE_SUCURSAL = @NOMBRE_SUCURSAL, '
        }
        if (HORARIOS != null) {
            requestActualizado.input('HORARIOS', sql.NVarChar, HORARIOS)
            queryActualizada += 'HORARIOS = @HORARIOS, '
        }
        if (ASIENTOS != null) {
            requestActualizado.input('ASIENTOS', sql.Int, ASIENTOS)
            queryActualizada += 'ASIENTOS = @ASIENTOS, '
        }

        //console.log(queryActualizada)
        queryActualizada = queryActualizada.trim().replace(/,$/, '')
        //console.log(queryActualizada)
        queryActualizada += ' WHERE id = @id'
        //console.log(queryActualizada)

        const sucursalActualizada = await requestActualizado.query(queryActualizada)

        if (sucursalActualizada.rowsAffected[0] == 0) {
            return null
        }

        return { NOMBRE_SUCURSAL, HORARIOS, ASIENTOS }
    } catch (error) {
        console.log("updateSucursalItemRepository - " + error)
        //throw Error("Error al intentar actualizar la sucursal: - " + error)
    } finally {
        pool.close()
    }
}