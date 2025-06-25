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

  // HORARIOS POR SUCURSAL

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

  // ASIENTOS POR SUCURSAL

  getAsientosPorSucursal: `
    USE Cinemaland2;
    SELECT CODIGO FROM Asientos WHERE SUCURSAL_ID = @sucursalId ORDER BY CODIGO;
  `,

  deleteAsiento: `
  USE Cinemaland2;
  DELETE FROM Asientos WHERE SUCURSAL_ID = @ID AND CODIGO = @CODIGO;
`,

  // ASIENTOS

  getAsientoAsc: `
    USE Cinemaland2;
    SELECT DISTINCT CODIGO FROM Asientos ORDER BY CODIGO ASC;
  `,

  getAsientoDesc: `
    USE Cinemaland2;
    SELECT DISTINCT CODIGO FROM Asientos ORDER BY CODIGO DESC;
  `,

  getAsiento: `
    USE Cinemaland2;
    SELECT * FROM Asientos 
    WHERE LOWER(CODIGO) = LOWER(@nombreAsiento);
  `,

  updateAsiento: `
    USE Cinemaland2;
    UPDATE Asientos
    SET SUCURSAL_ID = @SUCURSAL_ID, CODIGO = @CODIGO
    WHERE ID = @ID;
  `,
  addAsiento: `
    USE Cinemaland2;
    INSERT INTO Asientos (SUCURSAL_ID, CODIGO) VALUES (@SUCURSAL_ID, @CODIGO);
  `,

  getAsientoById: `
    USE Cinemaland2;
    SELECT * FROM Asientos WHERE ID = @ID;
  `,

  getAsientoCompleto: `
  USE Cinemaland2;
SELECT 
  a.ID AS ASIENTO_ID,
  a.CODIGO AS ASIENTO,
  s.NOMBRE AS SUCURSAL
FROM Asientos a
JOIN Sucursales s ON a.SUCURSAL_ID = s.ID
WHERE a.CODIGO = @nombreAsiento;
  `,

  deleteAsientoId: `
  USE Cinemaland2;
  DELETE FROM Asientos WHERE ID = @ID;
`,

// HORARIOS

  getHorariosAsc: `
    USE Cinemaland2;
    SELECT DISTINCT HORA FROM Horarios ORDER BY HORA ASC;
  `,

  getHorariosDesc: `
    USE Cinemaland2;
    SELECT DISTINCT HORA FROM Horarios ORDER BY HORA DESC;
  `,

  getHorario: `
    USE Cinemaland2;
    SELECT * FROM Horarios 
    WHERE LOWER(HORA) = LOWER(@nombreHorario);
  `,

  updateHorario: `
    USE Cinemaland2;
    UPDATE Horarios
    SET SUCURSAL_ID = @SUCURSAL_ID, HORA = @HORA
    WHERE ID = @ID;
  `,
  addHorario: `
    USE Cinemaland2;
    INSERT INTO Horarios (SUCURSAL_ID, HORA) VALUES (@SUCURSAL_ID, @HORA);
  `,

  getHorarioById: `
    USE Cinemaland2;
    SELECT * FROM Horarios WHERE ID = @ID;
  `,

  getHorarioCompleto: `
  USE Cinemaland2;
SELECT 
  a.ID AS HORARIO_ID,
  a.HORA AS HORARIO,
  s.NOMBRE AS SUCURSAL
FROM Horarios a
JOIN Sucursales s ON a.SUCURSAL_ID = s.ID
WHERE a.HORA = @nombreHorario;
  `,

  deleteHorarioId: `
  USE Cinemaland2;
  DELETE FROM Horarios WHERE ID = @ID;
`,

};
