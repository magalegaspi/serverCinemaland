const horariosService = require('../services/sucursalHorarios')

exports.readHorarios = async (req, res) => {
    try {
        console.log("entrando a readHorarios")
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await sucursalService.getTodasHorarios())
    } catch (error) {
        console.log("Error en readHorarios - " + error)
        res.status(500).send( { code: 500, message: "Error al obtener las Horarios"})
    }
  }

// Exportamos la función para usarla en rutas de Express
exports.readHorariosOrdered = (req, res) => {

    // Obtenemos el parámetro de ruta 'horarios' (ej: /turnos, /lunes)
    const horarios = req.params.horarios;

    // Obtenemos el parámetro de consulta 'ordenar' (ej: ?ordenar=hora)
    const paramOrdenar = req.query.ordenar;

    // Llamamos al servicio que devuelve los horarios filtrados y ordenados
    const horariosFiltered = horariosService.getHorariosFiltered(horarios, paramOrdenar);

    // Si no se encontraron horarios, respondemos con un error 404
    if (horariosFiltered.length === 0) {
        return res.status(404).send(`No se encontraron los horarios: ${horarios}`);
    }

    // Indicamos que la respuesta será de tipo JSON
    res.setHeader('Content-Type', 'application/json');

    // Establecemos el código de estado HTTP a 200 (OK)
    res.status(200);

    // Enviamos la respuesta en formato JSON con los horarios filtrados
    res.send(JSON.stringify(horariosFiltered));
}
 

 exports.createHorarios = async (req, res) => {
     try {
         let horariosNuevos = req.body;
         res.send(await horariosService.createNewHorarios(horariosNuevos))
     } catch (error) {
         console.log("Error en createHorarios " + error)
         res.status(500).send( { code: 500, message: "Error al agregar un horario"})
     }
 
 }

 exports.deleteHorarios = async (req, res) => {
     try {
         const id = req.params.id;
         const horarios = await horariosService.deleteHorarios(id)
 
         if (horarios.length === 0) {
             return res.status(404).send("Error! No se encuentra el horario buscado " + id)
         }
 
         res.setHeader('Content-Type', 'application/json')
         res.status(200)
         res.send(horarios)
     } catch (error) {
         console.log("Error en deleteHorarios - " + error)
         res.status(500).send({ code: 500, message: "Error al eliminar el horarios seleccionado" })
     }
 
 }

exports.updateHorarios = async (req, res) => {
    try {
        const horarioActualizado = req.body;
        const id = req.params.id;

        const horarios = await sucursalService.updateHorarios(id, horarioActualizado)

        if (horarios.length === 0) {
            return res.status(404).send("Error! No se encuentra la sucursal: " + id)
        }

        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(horarios)
    } catch (error) {
        console.log("Error en updateHorario - " + error)
        res.status(500).send({ code: 500, message: "Error al actualizar los horarios" })
    }
}

exports.updateHorariosItems = async (req, res) => {
    try {
        const { id } = req.params;
        const horarioActualizado = req.body;

        const horarios = await sucursalService.updateHorariosItem(id, horaroActualizado)

        if (horarios.length === 0) {
            return res.status(404).send("Error! No se encuentra el horario especifico con el id: " + id)
        }

        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(horarios)
    } catch (error) {
        console.log("Error en updateHorarioItems - " + error)
        res.status(500).send({ code: 500, message: "Error al actualizar los horarios" })
    }
}