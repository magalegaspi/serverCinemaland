const { param } = require("../routers/RouterHorarios");
const horarioService = require("../services/horarioService");

exports.readHorarios = async (req, res) => {
  try {
    const ordenar = req.query.ordenar || "ASC";
    const horarios = await horarioService.getTodosHorarios(ordenar);
    res.json(horarios);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener horarios", error: error.message });
  }
};

exports.readHorarioSolo = async (req, res) => {
  try {
    const nombreHorarios = req.params.horario;
    const horario = await horarioService.getHorarioSoloPorNombre(nombreHorario);
    if (!horario)
      return res.status(404).json({ message: "Horario no encontrado" });

    res.json(horario);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener horario", error: error.message });
  }
};

exports.createHorario = async (req, res) => {
  try {
    const horarioNuevo = req.body;
    const resultado = await horarioService.createNewHorario(horarioNuevo);
    res.status(201).json(resultado);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear horario", error: error.message });
  }
};
exports.updateHorario = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { SUCURSAL_ID, HORA } = req.body;

    if (!SUCURSAL_ID || !HORA) {
      return res
        .status(400)
        .json({ message: "Faltan datos obligatorios: SUCURSAL_ID y HORA" });
    }

    const resultado = await horarioService.updateHorario(id, {
      SUCURSAL_ID,
      HORA,
    });

    if (!resultado) {
      return res.status(404).json({ message: "Horario no encontrado" });
    }

    res.json({ message: "Horario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar Horario",
      error: error.message,
    });
  }
};

exports.deleteHorario = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).send("ID inválido");
    }

    await horarioService.deleteHorario(id);

    res
      .status(200)
      .send({ message: `Horario con id ${id} eliminado correctamente` });
  } catch (error) {
    console.error("Error al eliminar horario:", error);
    res
      .status(500)
      .send({ message: "Error al eliminar horario", error: error.message });
  }
};

exports.readHorarioCompleto = async (req, res) => {
  const nombreHorario = req.params.nombre;

  try {
    const resultado = await horarioService.getHorarioConSucursal(nombreHorario);
    if (!resultado || resultado.length === 0) {
      return res.status(404).json({ mensaje: "Horario no encontrado" });
    }
    res.json(resultado);
  } catch (error) {
    console.error("Error en readHorarioCompleto -", error);
    res.status(500).json({ mensaje: error.message });
  }
};

exports.updateHorarioItems = async (req, res) => {
  try {
    const { id } = req.params;
    const horarioActualizado = req.body;

    const horarios = await horarioService.updateHorarioItem(
      id,
      horarioActualizado
    );

    if (horarios.length === 0) {
      return res
        .status(404)
        .send("Error! No se encuentra el horarios con el id: " + id);
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(horarios);
  } catch (error) {
    console.log("Error en updateHorariosItems - " + error);
    res
      .status(500)
      .send({ code: 500, message: "Error al actualizar el horarios" });
  }
};
