const sucursalRepository = require("../repositories/sucursalSQLRepository");

exports.getTodasSucursales = async (paramOrdenar) => {
  try {
    console.log("SERVICE - getTodasSucursales");
    const ordenar = paramOrdenar.toLowerCase() == "asc" ? "ASC" : "DESC";
    console.log(paramOrdenar);
    console.log(`Ordenar por: ${ordenar}`);
    let testDatos = await sucursalRepository.getSucursalesRepository(ordenar);
    //console.log("SERVICE - " + testDatos)
    return testDatos;
  } catch (error) {
    console.log("Error en getTodasSucursales - " + error);
    throw Error("Error en getTodasSucursales - " + error);
  }
};

exports.getSucursalesFiltered = async (sucursal) => {
  try {
    console.log(`SERVICE - getSucursalesFiltered - sucursal: ${sucursal}`);
    return await sucursalRepository.getSucursalesFilteredRepository(sucursal);
  } catch (error) {
    console.log("Error en getSucursalesFiltered - " + error);
    throw new Error("Error en getSucursalesFiltered - " + error);
  }
};

exports.createNewSucursal = async (sucursal) => {
  try {
    console.log(`SERVICE - createNewSucursal - sucursal:${sucursal}`);

    return await sucursalRepository.createNewSucursalRepository(sucursal);
  } catch (error) {
    console.log("Error en createNewSucursal - " + error);
    throw Error("Error en el service: " + error);
  }
};

exports.deleteSucursal = async (id) => {
  try {
    const sucursalEncontrada =
      await sucursalRepository.getSucursalesByIdRepository(id);
    if (!sucursalEncontrada)
      throw Error("No se encontró la sucursal con el id proporcionado");

    console.log(`SERVICE - deleteSucursal - id:${id}`);
    return await sucursalRepository.deleteSucursalRepository(id);
  } catch (error) {
    console.log("Error en deleteSucursal  - " + error);
    throw Error("Error en el service: " + error);
  }
};

exports.updateSucursal = async (id, sucursalActualizada) => {
  try {
    const { id, NOMBRE_SUCURSAL, HORARIOS, ASIENTOS } = sucursalActualizada;
    if (!id || !NOMBRE_SUCURSAL || !HORARIOS || !ASIENTOS)
      throw Error("No se proporcionaron datos para actualizar la sucursal");
    console.log(
      `SERVICE - updateSucursal - id:${id} - sucursalActualizada:${sucursalActualizada}`
    );
    return await sucursalRepository.updateSucursalRepository(
      id,
      sucursalActualizada
    );
  } catch (error) {
    console.log("Error en updateSucursal  - " + error);
    throw Error("Error en el service: " + error);
  }
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
      sucursalActualizar
    );
  } catch (error) {
    console.log("Error en updateSucursal  - " + error);
    throw Error("Error en el service: " + error);
  }
};
