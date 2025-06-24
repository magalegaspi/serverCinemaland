const horarioService = require("../services/horariosService");

exports.readHorarios = async (req, res) => {
  try {
    const horarios = await horarioService.getTodosHorarios();
    res.json(horarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener horarios", error: error.message });
  }
};

exports.readHorariosPorSucursal = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const horarios = await horarioService.getHorariosPorSucursal(id);
    res.json(horarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener horarios por sucursal", error: error.message });
  }
};

exports.createHorario = async (req, res) => {
  try {
    const { sucursalId, hora } = req.body;
    const result = await horarioService.createNuevoHorario(sucursalId, hora);
    res.status(201).json({ message: "Horario creado", result });
  } catch (error) {
    res.status(500).json({ message: "Error al crear horario", error: error.message });
  }
};

exports.deleteHorario = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const hora = req.params.hora;
    const result = await horarioService.deleteHorario(id, hora);
    res.status(200).json({ message: "Horario eliminado", result });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar horario", error: error.message });
  }
};
