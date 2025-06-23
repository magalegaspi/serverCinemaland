const { get } = require("../routers/RouterSucursales");
const { updateSucursal } = require("../services/sucursalService");

module.exports = {
  getSucursales: `USE CINEMALAND;
    SELECT DISTINCT NOMBRE_SUCURSAL FROM SUCURSALES;`,

  getSucursal: `USE CINEMALAND;
    SELECT * FROM SUCURSALES 
    WHERE LOWER(NOMBRE_SUCURSAL) = LOWER(@nombreSucursal);`,

  addSucursal: `USE CINEMALAND INSERT INTO SUCURSALES
    (NOMBRE_SUCURSAL,
    HORARIOS,
    ASIENTOS) 
    VALUES (
    @NOMBRE_SUCURSAL,
    @HORARIOS,
    @ASIENTOS);`,

  updateSucursal: `USE CINEMALAND
    UPDATE SUCURSALES
    SET NOMBRE_SUCURSAL = @NOMBRE_SUCURSAL,
    HORARIOS = @HORARIOS,
    ASIENTOS = @ASIENTOS
    WHERE id = @id;`,

  getSucursalById: `USE CINEMALAND SELECT * FROM SUCURSALES WHERE ID = @ID`,

  deleteSucursal: `USE CINEMALAND DELETE FROM SUCURSALES WHERE ID = @ID`,
};
