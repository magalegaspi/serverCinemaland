const { get } = require("../routers/RouterSucursales");
const { updateSucursal } = require("../services/sucursalService");

module.exports = {

    // SUCURSALES
  getSucursalesAsc: `
    USE Cinemaland2;
    SELECT DISTINCT NOMBRE FROM Sucursales ORDER BY NOMBRE ASC;
  `,

  getSucursalesDesc: `
    USE Cinemaland2;
    SELECT DISTINCT NOMBRE FROM Sucursales ORDER BY NOMBRE DESC;
  `,

  getSucursal: `
    USE Cinemaland2;
    SELECT * FROM Sucursales 
    WHERE LOWER(NOMBRE) = LOWER(@nombreSucursal);
  `,

  addSucursal: `
    USE Cinemaland2;
    INSERT INTO Sucursales (NOMBRE) 
    VALUES (@NOMBRE);
    SELECT SCOPE_IDENTITY() AS ID;
  `,
  
  updateSucursal: `
    USE Cinemaland2;
    UPDATE Sucursales
    SET NOMBRE = @NOMBRE
    WHERE ID = @ID;
  `,

  getSucursalById: `
    USE Cinemaland2;
    SELECT * FROM Sucursales WHERE ID = @ID;
  `,

  deleteSucursalCompleta: `
  USE Cinemaland2;
  DELETE FROM Horarios WHERE SUCURSAL_ID = @ID;
  DELETE FROM Asientos WHERE SUCURSAL_ID = @ID;
  DELETE FROM Sucursales WHERE ID = @ID;
`,


  getSucursalCompleta: `
  USE Cinemaland2;
  SELECT 
    s.ID AS SUCURSAL_ID,
    s.NOMBRE AS SUCURSAL,
    h.HORA AS HORARIO,
    a.CODIGO AS ASIENTO
  FROM Sucursales s
  LEFT JOIN Horarios h ON s.ID = h.SUCURSAL_ID
  LEFT JOIN Asientos a ON s.ID = a.SUCURSAL_ID
  WHERE s.NOMBRE = @nombreSucursal;
`,



  // HORARIOS

  getHorariosPorSucursal: `
    USE Cinemaland2;
    SELECT HORA FROM Horarios WHERE SUCURSAL_ID = @sucursalId ORDER BY HORA;
  `,

  addHorario: `
    USE Cinemaland2;
    INSERT INTO Horarios (SUCURSAL_ID, HORA) VALUES (@SUCURSAL_ID, @HORA);
  `,

  deleteHorario: `
  USE Cinemaland2;
  DELETE FROM Horarios WHERE SUCURSAL_ID = @ID AND HORA = @HORA;
`,


  // ASIENTOS

  getAsientosPorSucursal: `
    USE Cinemaland2;
    SELECT CODIGO FROM Asientos WHERE SUCURSAL_ID = @sucursalId ORDER BY CODIGO;
  `,

  addAsiento: `
    USE Cinemaland2;
    INSERT INTO Asientos (SUCURSAL_ID, CODIGO) VALUES (@SUCURSAL_ID, @CODIGO);
  `,

  deleteAsiento: `
  USE Cinemaland2;
  DELETE FROM Asientos WHERE SUCURSAL_ID = @ID AND CODIGO = @CODIGO;
`
};
