const horarioRepository = require("../repositories/horarioSQLRepository");

exports.getTodosHorarios = async () => {
  return await horarioRepository.getTodosHorariosRepository();
};

exports.getHorarioPorSucursal = async (nombreSucursal) => {
  const sucursal = await horarioRepository.getSucursalByNombre(nombreSucursal);
  if (!sucursal.length) return null;

  const sucursalId = sucursal[0].ID;
  const horarios = await horarioRepository.getHorariosPorSucursal(sucursalId);

  return {
    ...sucursal[0],
    HORARIOS: horarios,
  };
};

exports.createNuevoHorario = async (horario) => {
  return await horarioRepository.createNuevoHorarioRepository(horario);
};

exports.updateHorario = async (id, datosHorario) => {
  return await horarioRepository.updateHorarioRepository(id, datosHorario);
};

exports.deleteHorario = async (id) => {
  return await horarioRepository.deleteHorarioRepository(id);
};
