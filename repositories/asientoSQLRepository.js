const { getSQLConnection } = require("../database/conexion");
const queries = require("../database/queries");
const sql = require("mssql");

exports.getAsientoRepository = async (orden = "ASC") => {
  const pool = await getSQLConnection();

  try {
    const query =
      orden.toUpperCase() === "DESC"
        ? queries.getAsientoDesc
        : queries.getAsientoAsc;
    const resultado = await pool.request().query(query);
    return resultado.recordset;
  } catch (error) {
    throw new Error("Error en getAsientoRepository - " + error);
  } finally {
    pool.close();
  }
};

exports.getAsientoByNombre = async (nombreAsiento) => {
  const pool = await getSQLConnection();

  try {
    const resultado = await pool
      .request()
      .input("nombreAsiento", sql.NVarChar, nombreAsiento)
      .query(queries.getAsiento);
    return resultado.recordset;
  } finally {
    pool.close();
  }
};

exports.createNewAsientoRepository = async (ASIENTO) => {
  const pool = await getSQLConnection();
  try {
    await pool
      .request()
      .input("SUCURSAL_ID", ASIENTO.SUCURSAL_ID)
      .input("CODIGO", ASIENTO.CODIGO)
      .query(queries.addAsiento);

    return { ASIENTO };
  } finally {
    pool.close();
  }
};

exports.updateAsientoRepository = async (ASIENTO) => {
  const pool = await getSQLConnection();
  console.log(ASIENTO);
  console.log(ASIENTO.CODIGO);
  try {
    await pool
      .request()
      .input("ID", ASIENTO.ID)
      .input("SUCURSAL_ID", ASIENTO.SUCURSAL_ID)
      .input("CODIGO", ASIENTO.CODIGO)
      .query(queries.updateAsiento);

    return { updated: true };
  } finally {
    pool.close();
  }
};

exports.deleteAsientoRepository = async (id) => {
  const pool = await getSQLConnection();

  try {
    await pool
      .request()
      .input("ID", sql.Int, id)
      .query(queries.deleteAsientoId);

    return true;
  } catch (error) {
    console.error("Error en deleteAsientoRepository -", error);
    throw new Error("Error en deleteAsientoRepository - " + error);
  } finally {
    pool.close();
  }
};

exports.getAsientoCompleto = async (nombreAsiento) => {
  const pool = await getSQLConnection();

  try {
    const resultado = await pool
      .request()
      .input("nombreAsiento", sql.NVarChar, nombreAsiento)
      .query(queries.getAsientoCompleto);
    return resultado.recordset;
  } catch (error) {
    console.error("Error en getAsientolCompleto -", error);
    throw error;
  } finally {
    pool.close();
  }
};

exports.getAsientoByIdRepository = async (id) => {
  const pool = await getSQLConnection();
  try {
    const result = await pool
      .request()
      .input("ID", id)
      .query(queries.getAsientoById);

    return result.recordset[0] || null;
  } finally {
    pool.close();
  }
};
