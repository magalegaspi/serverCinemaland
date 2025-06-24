const { getSQLConnection } = require("../database/conexion");
const queries = require("../database/queries");
const sql = require("mssql");

exports.getSucursalesRepository = async (orden = "ASC") => {
  const pool = await getSQLConnection();

  try {
    const query = orden.toUpperCase() === "DESC" ? queries.getSucursalesDesc : queries.getSucursalesAsc;
    const resultado = await pool.request().query(query);
    return resultado.recordset;
  } catch (error) {
    throw new Error("Error en getSucursalesRepository - " + error);
  } finally {
    pool.close();
  }
};

exports.getSucursalByNombre = async (nombreSucursal) => {
  const pool = await getSQLConnection();

  try {
    const resultado = await pool
      .request()
      .input("nombreSucursal", sql.NVarChar, nombreSucursal)
      .query(queries.getSucursal);
    return resultado.recordset;
  } finally {
    pool.close();
  }
};

exports.getHorariosPorSucursal = async (sucursalId) => {
  const pool = await getSQLConnection();

  try {
    const resultado = await pool
      .request()
      .input("sucursalId", sql.Int, sucursalId)
      .query(queries.getHorariosPorSucursal);
    return resultado.recordset.map((r) => r.HORA);
  } finally {
    pool.close();
  }
};

exports.getAsientosPorSucursal = async (sucursalId) => {
  const pool = await getSQLConnection();

  try {
    const resultado = await pool
      .request()
      .input("sucursalId", sql.Int, sucursalId)
      .query(queries.getAsientosPorSucursal);
    return resultado.recordset.map((r) => r.CODIGO);
  } finally {
    pool.close();
  }
};

exports.createNewSucursalRepository = async ({ NOMBRE, HORARIOS, ASIENTOS }) => {
  const pool = await getSQLConnection();

  try {
    // Insertar sucursal
    const insertSucursal = await pool
      .request()
      .input("NOMBRE", sql.NVarChar, NOMBRE)
      .query(queries.addSucursal);

    const sucursalID = insertSucursal.recordset[0].ID;

    // Insertar horarios
    for (const hora of HORARIOS.split(",")) {
      await pool
        .request()
        .input("SUCURSAL_ID", sql.Int, sucursalID)
        .input("HORA", sql.VarChar, hora.trim())
        .query(queries.addHorario);
    }

    // Insertar asientos
    for (const asiento of ASIENTOS.split(",")) {
      await pool
        .request()
        .input("SUCURSAL_ID", sql.Int, sucursalID)
        .input("CODIGO", sql.VarChar, asiento.trim())
        .query(queries.addAsiento);
    }

    return { ID: sucursalID, NOMBRE, HORARIOS, ASIENTOS };
  } finally {
    pool.close();
  }
};

exports.updateSucursalRepository = async (id, nombre) => {
  const pool = await getSQLConnection();

  try {
    await pool
      .request()
      .input("ID", sql.Int, id)
      .input("NOMBRE", sql.NVarChar, nombre)
      .query(queries.updateSucursal);

    return true;
  } finally {
    pool.close();
  }
};

exports.deleteSucursalRepository = async (id) => {
  const pool = await getSQLConnection();

  try {
    await pool.request()
      .input("ID", sql.Int, id)
      .query(queries.deleteSucursalCompleta);

    return true; // o lo que devuelvas
  } catch (error) {
    console.error("Error en deleteSucursalRepository -", error);
    throw new Error("Error en deleteSucursalRepository - " + error);
  } finally {
    pool.close();
  }
};



exports.getSucursalCompleta = async (nombreSucursal) => {
  const pool = await getSQLConnection();

  try {
    const resultado = await pool
      .request()
      .input("nombreSucursal", sql.NVarChar, nombreSucursal)
      .query(queries.getSucursalCompleta);
    return resultado.recordset;
  } catch (error) {
    console.error("Error en getSucursalCompleta -", error);
    throw error;
  } finally {
    pool.close();
  }
};

exports.deleteHorarioDeSucursal = async (id, hora) => {
  const pool = await getSQLConnection();
  try {
    await pool.request()
      .input("ID", sql.Int, id)
      .input("HORA", sql.VarChar, hora)
      .query(queries.deleteHorario);
    return true;
  } catch (error) {
    throw new Error("Error al eliminar el horario: " + error);
  } finally {
    pool.close();
  }
};

exports.deleteAsientoDeSucursal = async (id, codigo) => {
  const pool = await getSQLConnection();
  try {
    await pool.request()
      .input("ID", sql.Int, id)
      .input("CODIGO", sql.VarChar, codigo)
      .query(queries.deleteAsiento);
    return true;
  } catch (error) {
    throw new Error("Error al eliminar el asiento: " + error);
  } finally {
    pool.close();
  }
};

exports.getSucursalesByIdRepository = async (id) => {
  const pool = await getSQLConnection();

  try {
    const sucursalEncontrada = await pool
      .request()
      .input("id", sql.Int, id)
      .query(queries.getSucursalById);
    return sucursalEncontrada.recordset[0];
  } catch (error) {
    console.log("Error en getSucursalesRepository - " + error);
    throw Error("Error en getSucursalesRepository - " + error);
  } finally {
    pool.close();
  }
};