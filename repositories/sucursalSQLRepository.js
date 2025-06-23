//const frontend = require('../src/lenguajesFrontBack').infoLenguajes.frontend // CAMBIAR ESTOOOO
const { getSQLConnection } = require("../database/conexion");
const queries = require("../database/queries");
const sql = require("mssql");

// ACA VAN TODOS LOS SCRIPTS PARA LLAMAR A LA BASE DE DATOS Y TRAER LAS SUCURSALES

// GET SUCURSALES
exports.getSucursalesRepository = async (orden) => {
  const pool = await getSQLConnection();

  try {
    const resultado = await pool.request().query(`USE CINEMALAND;
        SELECT DISTINCT NOMBRE_SUCURSAL FROM SUCURSALES ORDER BY NOMBRE_SUCURSAL ${orden} ;`);
    console.table(resultado.recordset);

    return resultado.recordset;
  } catch (error) {
    console.log("Error en getSucursalesRepository - " + error);
    throw Error("Error en getSucursalesRepository - " + error);
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

exports.getSucursalesFilteredRepository = async (nombreSucursal) => {
  const pool = await getSQLConnection();

  const query = `
    USE CINEMALAND;
    SELECT * FROM SUCURSALES 
    WHERE LOWER(NOMBRE_SUCURSAL) = LOWER(@nombreSucursal);
  `;

  try {
    const result = await pool
      .request()
      .input("nombreSucursal", sql.NVarChar, nombreSucursal)
      .query(query);

    if (result.recordset.length === 0) {
      console.log("No se encontró la sucursal:", nombreSucursal);
      return null;
    }

    console.log("Sucursal encontrada:", result.recordset[0]);
    return result.recordset[0];
  } catch (error) {
    console.error("Error en getSucursalRepository:", error);
    throw error;
  } finally {
    pool.close();
  }
};

exports.createNewSucursalRepository = async (sucursal) => {
  const { NOMBRE_SUCURSAL, HORARIOS, ASIENTOS } = sucursal;
  const pool = await getSQLConnection();

  try {
    console.log(`REPOSITORY  - createNewSucursal - sucursal:${sucursal}`);

    const resultado = await pool
      .request()
      .input("NOMBRE_SUCURSAL", sql.NVarChar, NOMBRE_SUCURSAL)
      .input("HORARIOS", sql.NVarChar, HORARIOS)
      .input("ASIENTOS", sql.NVarChar, ASIENTOS)
      .query(queries.addSucursal);

    const sucursalNueva = { NOMBRE_SUCURSAL, HORARIOS, ASIENTOS };
    console.table(sucursalNueva);

    return resultado.recordset;
  } catch (error) {
    console.log("createNewSucursalRepository - " + error);
    throw Error("Error al intentar crear el nuevo lenguaje: - " + error);
  } finally {
    pool.close();
  }
};

exports.deleteSucursalRepository = async (id) => {
  const pool = await getSQLConnection();

  try {
    await pool.request().input("id", sql.Int, id).query(queries.deleteSucursal);

    return { message: "Sucursal eliminada correctamente" };
  } catch (error) {
    console.log("deleteSucursalRepository - " + error);
    throw Error("Error al intentar eliminar sucursal: - " + error);
  } finally {
    pool.close();
  }
};

exports.updateSucursalRepository = async (id, sucursalActualizada) => {
  console.log(
    `REPOSITORY  - updateSucursal - id:${id} - sucursalActualizada:${sucursalActualizada}`
  );
  const { NOMBRE_SUCURSAL, HORARIOS, ASIENTOS } = sucursalActualizada;
  const pool = await getSQLConnection();

  try {
    const requestActualizado = pool.request().input("id", sql.Int, id);
    if (NOMBRE_SUCURSAL != null)
      requestActualizado.input(
        "NOMBRE_SUCURSAL",
        sql.NVarChar,
        NOMBRE_SUCURSAL
      );
    if (HORARIOS != null)
      requestActualizado.input("HORARIOS", sql.NVarChar, HORARIOS);
    if (ASIENTOS != null)
      requestActualizado.input("ASIENTOS", sql.NVarChar, ASIENTOS);

    let queryActualizada = "UPDATE Sucursales SET ";
    if (NOMBRE_SUCURSAL != null)
      queryActualizada += "NOMBRE_SUCURSAL = @NOMBRE_SUCURSAL, ";
    if (HORARIOS != null) queryActualizada += "HORARIOS = @HORARIOS, ";
    if (ASIENTOS != null) queryActualizada += "ASIENTOS = @ASIENTOS, ";

    //console.log(queryActualizada)
    queryActualizada = queryActualizada.trim().replace(/,$/, "");
    //console.log(queryActualizada)
    queryActualizada += " WHERE id = @id";
    //console.log(queryActualizada)

    const sucursalActualizada = await requestActualizado.query(
      queryActualizada
    );

    if (sucursalActualizada.rowsAffected[0] == 0) {
      return null;
    }

    return { NOMBRE_SUCURSAL, HORARIOS, ASIENTOS };
  } catch (error) {
    console.log("updateSucursalRepository - " + error);
    throw Error("Error al intentar actualizar el lenguaje: - " + error);
  } finally {
    pool.close();
  }
};
