const asientoRepository = require("../repositories/asientoSQLRepository");

exports.getTodosAsientos = async (orden) => {
  const ordenar = orden?.toUpperCase() === "DESC" ? "DESC" : "ASC";
  return await asientoRepository.getAsientoRepository(ordenar);
};

exports.getAsientoSoloPorNombre = async (nombreAsiento) => {
  const asiento = await asientoRepository.getAsientoByNombre(nombreAsiento);
  if (!asiento.length) return null;

  return {
    ...asiento[0],
  };
};

exports.createNewAsiento = async (asiento) => {
  return await asientoRepository.createNewAsientoRepository(asiento);
};

exports.updateAsiento = async (id, asientoActualizado) => {
  if (!asientoActualizado.SUCURSAL_ID || !asientoActualizado.CODIGO) {
    throw new Error("Faltan campos obligatorios: SUCURSAL_ID y/o CODIGO");
  }

  return await asientoRepository.updateAsientoRepository({
    ...asientoActualizado,
    ID: id,
  });
};

exports.deleteAsiento = async (id) => {
  return await asientoRepository.deleteAsientoRepository(id);
};

exports.updateAsientoItem = async (id, asientoActualizado) => {
  try {
    const asientoEncontrado = await asientoRepository.getAsientoByIdRepository(
      id
    );
    if (!asientoEncontrado)
      throw Error("No se encontró el asiento con el id proporcionado");
    const asientoActualizar = {
      ...asientoEncontrado,
      ...asientoActualizado,
    };

    return await asientoRepository.updateAsientoRepository(asientoActualizar);
  } catch (error) {
    console.log("Error en updateAsiento  - " + error);
    throw Error("Error en el service: " + error);
  }
};

exports.getAsientoConSucursal = async (nombreAsiento) => {
  try {
    return await asientoRepository.getAsientoCompleto(nombreAsiento);
  } catch (error) {
    throw new Error("Error en getAsientoConSucursal - " + error);
  }
};
