const sucursalRepository = require("../repositories/sucursalSQLRepository");

exports.getTodasSucursales = async (orden) => {
  const ordenar = orden?.toUpperCase() === "DESC" ? "DESC" : "ASC";
  return await sucursalRepository.getSucursalesRepository(ordenar);
};

exports.getSucursalCompletaPorNombre = async (nombreSucursal) => {
  const sucursal = await sucursalRepository.getSucursalByNombre(nombreSucursal);
  if (!sucursal.length) return null;

  const sucursalId = sucursal[0].ID;
  const horarios = await sucursalRepository.getHorariosPorSucursal(sucursalId);
  const asientos = await sucursalRepository.getAsientosPorSucursal(sucursalId);

  return {
    ...sucursal[0],
    HORARIOS: horarios,
    ASIENTOS: asientos,
  };
};

exports.createNewSucursal = async (sucursal) => {
  return await sucursalRepository.createNewSucursalRepository(sucursal);
};

exports.updateSucursal = async (id, nombre) => {
  return await sucursalRepository.updateSucursalRepository(id, nombre);
};

exports.deleteSucursal = async (id) => {
  return await sucursalRepository.deleteSucursalRepository(id);
};

exports.getSucursalConHorariosYAsientos = async (nombreSucursal) => {
  try {
    return await sucursalRepository.getSucursalCompleta(nombreSucursal);
  } catch (error) {
    throw new Error("Error en getSucursalConHorariosYAsientos - " + error);
  }
};

exports.deleteHorarioDeSucursal = async (id, hora) => {
  return await sucursalRepository.deleteHorarioDeSucursal(id, hora);
};

exports.deleteAsientoDeSucursal = async (id, codigo) => {
  return await sucursalRepository.deleteAsientoDeSucursal(id, codigo);
};

exports.updateSucursalItem = async (id, sucursalActualizada) => {
  try {
    const sucursalEncontrada =
      await sucursalRepository.getSucursalesByIdRepository(id);
    if (!sucursalEncontrada)
      throw Error("No se encontró la sucursal con el id proporcionado");
    const sucursalActualizar = {
      ...sucursalEncontrada,
      ...sucursalActualizada,
    };
    console.log(
      `SERVICE - updateSucursal - id:${id} - sucursalActualizada:${sucursalActualizada}`
    );
    return await sucursalRepository.updateSucursalRepository(
      id,
      sucursalActualizar.NOMBRE
    );
  } catch (error) {
    console.log("Error en updateSucursal  - " + error);
    throw Error("Error en el service: " + error);
  }
};