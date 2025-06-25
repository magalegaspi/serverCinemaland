const horarioRepository = require("../repositories/horarioSQLRepository");

exports.getTodosHorarios = async (orden) => {
  const ordenar = orden?.toUpperCase() === "DESC" ? "DESC" : "ASC";
  return await horarioRepository.getHorariosRepository(ordenar);
};

exports.getHorarioSoloPorNombre = async (nombreHorario) => {
  const horario = await horarioRepository.getHorarioByNombre(nombreHorario);
  if (!horario.length) return null;

  return {
    ...horario[0],
  };
};

exports.createNewHorario = async (horario) => {
  return await horarioRepository.createNewHorariosRepository(horario);
};

exports.updateHorario = async (id, horarioActualizado) => {
  if (!horarioActualizado.SUCURSAL_ID || !horarioActualizado.HORA) {
    throw new Error("Faltan campos obligatorios: SUCURSAL_ID y/o HORA");
  }

  return await horarioRepository.updateHorarioRepository({
    ...horarioActualizado,
    ID: id,
  });
};

exports.deleteHorario = async (id) => {
  return await horarioRepository.deleteHorarioRepository(id);
};

exports.updateHorarioItem = async (id, horarioActualizado) => {
  try {
    const horarioEncontrado = await horarioRepository.getHorarioByIdRepository(
      id
    );
    if (!horarioEncontrado)
      throw Error("No se encontró el horario con el id proporcionado");
    const horarioActualizar = {
      ...horarioEncontrado,
      ...horarioActualizado,
    };

    return await horarioRepository.updateHorarioRepository(horarioActualizar);
  } catch (error) {
    console.log("Error en updateHorario  - " + error);
    throw Error("Error en el service: " + error);
  }
};

exports.getHorarioConSucursal = async (nombreHorario) => {
  try {
    return await horarioRepository.getHorarioCompleto(nombreHorario);
  } catch (error) {
    throw new Error("Error en getHorarioConSucursal - " + error);
  }
};
