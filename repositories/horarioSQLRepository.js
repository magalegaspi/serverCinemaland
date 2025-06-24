const { getSQLConnection } = require("../conexion");
const sql = require("mssql");
const queries = require("../queries");

exports.getHorarios = async () => {
  const pool = await getSQLConnection();

  try {
    const resultado = await pool.request().query(`
      USE Cinemaland2;
      SELECT H.ID, H.HORA, S.NOMBRE AS SUCURSAL
      FROM Horarios H
      JOIN Sucursales S ON H.SUCURSAL_ID = S.ID
      ORDER BY S.NOMBRE, H.HORA;
    `);
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
    return resultado.recordset;
  } finally {
    pool.close();
  }
};

exports.createHorario = async (sucursalId, hora) => {
  const pool = await getSQLConnection();

  try {
    const resultado = await pool
      .request()
      .input("SUCURSAL_ID", sql.Int, sucursalId)
      .input("HORA", sql.NVarChar, hora)
      .query(queries.addHorario);
    return resultado.rowsAffected;
  } finally {
    pool.close();
  }
};

exports.deleteHorario = async (sucursalId, hora) => {
  const pool = await getSQLConnection();

  try {
    const resultado = await pool
      .request()
      .input("ID", sql.Int, sucursalId)
      .input("HORA", sql.NVarChar, hora)
      .query(queries.deleteHorario);
    return resultado.rowsAffected;
  } finally {
    pool.close();
  }
};
