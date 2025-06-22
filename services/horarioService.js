const horarioRepository = require('../repositories/horarioSQLRepository')

exports.getTodosHorarios = async () => {
    try {
        console.log("SERVICE - getTodosHorarios")
        let testDatos = await horarioRepository.getHorariosRepository()
        //console.log("SERVICE - " + testDatos)
        return testDatos
    } catch (error) {
        console.log("Error en getTodosHorarios - " + error)
        //throw Error("Error en getTodosHorarios - " + error) 
    }
}

exports.getHorariosFiltered = (horario, orderBy) => {
    try {
        console.log(`SERVICE - getHorariosFiltered - sucursal:${horario} - orderBy:${orderBy}`)
        return horarioRepository.getHorariosFilteredRepository(horario,orderBy)
    } catch (error) {
        console.log("Error en getHorariosFiltered - " + error)
        throw Error("Error en getHorariosFiltered - " + error)
    }
}

exports.createNewHorarios = async (horario) => {
    try {
        console.log(`SERVICE - createNewHorario - horario:${horario}`)

        return await horarioRepository.createNewHorariosRepository(horario)
    } catch (error) {
        console.log("Error en createNewHorarios - " + error)
        throw Error("Error en el service: " + error)
    }
}

exports.deleteHorario = async (id) => {
    try {
        console.log(`SERVICE - deleteHorario - id:${id}`)
        return await frontendRepository.deleteHorarioRepository(id)
    } catch (error) {
        console.log("Error en deleteHorario  - " + error)
        throw Error("Error en el service: " + error)
    }
}

exports.updateHorario = async (id, horarioActualizado) => {
    try {
        console.log(`SERVICE - updateHorario - id:${id} - horarioActualizado:${horarioActualizado}`)
        return await horarioRepository.updateHorarioRepository(id, horarioActualizado)
    } catch (error) {
        console.log("Error en updateHorario  - " + error)
        throw Error("Error en el service: " + error)
    }
}

exports.updateHorarioItem = async (id, horarioActualizado) => {
    try {
        console.log(`SERVICE - updateHorarioItem - id:${id} - horarioActualizado:${JSON.stringify(horarioActualizado)}`)
        return await horarioRepository.updateHorarioItemRepository(id, horarioActualizado)
    } catch (error) {
        console.log("Error en updateHorario  - " + error)
        throw Error("Error en el service: " + error)
    }
}