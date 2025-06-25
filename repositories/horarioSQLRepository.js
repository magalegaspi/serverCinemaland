const { getSQLConnection } = require("../database/conexion");
const queries = require("../database/queries");
const sql = require("mssql");

exports.getHorariosRepository = async (orden = "ASC") => {
  const pool = await getSQLConnection();

  try {
    const query =
      orden.toUpperCase() === "DESC"
        ? queries.getHorariosDesc
        : queries.getHorariosAsc;
    const resultado = await pool.request().query(query);
    return resultado.recordset;
  } catch (error) {
    throw new Error("Error en getHorariosRepository - " + error);
  } finally {
    pool.close();
  }
};

exports.getHorariosByNombre = async (nombreHorarios) => {
  const pool = await getSQLConnection();

  try {
    const resultado = await pool
      .request()
      .input("nombreHorarios", sql.NVarChar, nombreHorarios)
      .query(queries.getHorarios);
    return resultado.recordset;
  } finally {
    pool.close();
  }
};

exports.createNewHorariosRepository = async (HORARIOS) => {
  const pool = await getSQLConnection();
  try {
    await pool
      .request()
      .input("SUCURSAL_ID", HORARIOS.SUCURSAL_ID)
      .input("HORA", HORARIOS.HORA)
      .query(queries.addHorario);

    return { HORARIOS };
  } finally {
    pool.close();
  }
};

exports.updateHorarioRepository = async (HORARIO) => {
  const pool = await getSQLConnection();
  console.log(HORARIO);
  console.log(HORARIO.HORA);
  try {
    await pool
      .request()
      .input("ID", HORARIO.ID)
      .input("SUCURSAL_ID", HORARIO.SUCURSAL_ID)
      .input("HORA", HORARIO.HORA)
      .query(queries.updateHorario);

    return { updated: true };
  } finally {
    pool.close();
  }
};

exports.deleteHorarioRepository = async (id) => {
  const pool = await getSQLConnection();

  try {
    await pool
      .request()
      .input("ID", sql.Int, id)
      .query(queries.deleteHorarioId);

    return true;
  } catch (error) {
    console.error("Error en deleteHorarioRepository -", error);
    throw new Error("Error en deleteHorarioRepository - " + error);
  } finally {
    pool.close();
  }
};

exports.getHorarioCompleto = async (nombreHorario) => {
  const pool = await getSQLConnection();

  try {
    const resultado = await pool
      .request()
      .input("nombreHorario", sql.NVarChar, nombreHorario)
      .query(queries.getHorarioCompleto);
    return resultado.recordset;
  } catch (error) {
    console.error("Error en getHorarioCompleto -", error);
    throw error;
  } finally {
    pool.close();
  }
};

exports.getHorarioByIdRepository = async (id) => {
  const pool = await getSQLConnection();
  try {
    const result = await pool
      .request()
      .input("ID", id)
      .query(queries.getHorarioById);

    return result.recordset[0] || null;
  } finally {
    pool.close();
  }
};
