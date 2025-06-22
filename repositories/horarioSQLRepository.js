//const frontend = require('../src/lenguajesFrontBack').infoLenguajes.frontend // CAMBIAR ESTOOOO
const { getSQLConnection } = require('../database/conexion')
const queries = require('../database/queries')
const sql = require('mssql');


// ACA VAN TODOS LOS SCRIPTS PARA LLAMAR A LA BASE DE DATOS Y TRAER LAS SUCURSALES


// GET SUCURSALES
exports.getHorariosRepository = async () => {
    const pool = await getSQLConnection()
    
    try{
        const resultado = await pool.request().query(queries.getHorarios)
        console.table(resultado.recordset)

        return resultado.recordset
    } catch (error) {
        console.log("Error en getHorariosRepository - " + error)
        //throw Error("Error en getHorariosRepository - " + error) 
    } finally {
        pool.close()
    }

}

// NO SE SI DEJAR ESTO

exports.getHorariosFilteredRepository = (horario, orderBy) => {
    console.log(`REPOSITORY - getHorariosLanguagesFiltered - horario:${horario} - orderBy:${orderBy}`)
    const filtrado = horario.filter(
        horarios  => horarios .nombre.toLocaleLowerCase() === horario.toLocaleLowerCase()
    )

    console.log("El valor del query param ordenar es:", orderBy)

    if(filtrado.length === 0){
        return []
    }

    if(orderBy === "arriba"){
        return filtrado.sort(
            (a,b) => b.cantidadHorarios - a.cantidadHorarios
        )
    }else if (orderBy === "abajo"){
        return filtrado.sort(
            (a,b) => a.cantidadHorarios - b.cantidadHorarios
        )
    }else{
        return filtrado
    }
}

exports.createNewHorariosRepository = async (sucursal) => {
    const { NOMBRE_SUCURSAL, HORARIOS, ASIENTOS } = sucursal;
    const pool = await getSQLConnection();

    try {
        console.log(`REPOSITORY  - createNewHorario - sucursal:${horario}`)

        const resultado = await pool.request()
        .input('NOMBRE_SUCURSAL', sql.NVarChar, NOMBRE_SUCURSAL)
        .input('HORARIOS', sql.NVarChar, HORARIOS)
        .input('ASIENTOS', sql.NVarChar, ASIENTOS)
        .query(queries.addHorario)

        const horarioNuevo = { NOMBRE_SUCURSAL, HORARIOS, ASIENTOS }
        console.table(HorarioNuevo)

        return resultado.recordset
    } catch (error) {
        console.log("createNewHorariosRepository - " + error)
        //throw Error("Error al intentar crear el nuevo horario: - " + error)
    } finally {
        pool.close()
    }
}

exports.deleteHorarioRepository = async (id) => {
    const pool = await getSQLConnection();

    try {
        console.log(`REPOSITORY  - deleteHorario - id:${id}`)
        const horarioEncontrado = await pool.request()
        .input('id', sql.Int, id)
        .query(queries.getHorarioById)

        if(horarioEncontrado.recordset.length == 0){
            console.log("Horario no encontrado");
        }else{
            console.log("Se eliminó el horario de la lista, id:" + id)
            console.table(horarioEncontrado.recordset[0])
            await pool.request()
            .input('id', sql.Int, id)
            .query(queries.deleteHorario)

            return horarioEncontrado.recordset[0]
        }

    } catch (error) {
        console.log("deleteHorarioRepository - " + error)
        //throw Error("Error al intentar eliminar horario: - " + error)
    } finally {
        pool.close()
    }
}

exports.updateHorarioRepository = async (id, horarioActualizado) => {
    console.log(`REPOSITORY  - updateHorario - id:${id} - horarioActualizada:${horarioActualizado}`)
    const { NOMBRE_SUCURSAL, HORARIOS, ASIENTOS } = horarioActualizado;
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

        const horarioActualizado = await requestActualizado.query(queryActualizada)
        
        if(horarioActualizado.rowsAffected[0] == 0){
            return null
        }

        return { NOMBRE_SUCURSAL, HORARIOS, ASIENTOS }

    } catch (error) {
        console.log("updateHorarioRepository - " + error)
        //throw Error("Error al intentar actualizar el horario: - " + error)
    } finally {
        pool.close()
    }
}

exports.updateHorarioItemRepository = async (id, horarioActualizado) => {
    console.log(`REPOSITORY  - updateHorarioItem - id:${id} - horarioActualizado:${JSON.stringify(horarioActualizado)}`)

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

        const horarioActualizado = await requestActualizado.query(queryActualizada)

        if (horarioActualizado.rowsAffected[0] == 0) {
            return null
        }

        return { NOMBRE_SUCURSAL, HORARIOS, ASIENTOS }
    } catch (error) {
        console.log("updateHorarioItemRepository - " + error)
        //throw Error("Error al intentar actualizar la sucursal: - " + error)
    } finally {
        pool.close()
    }
}