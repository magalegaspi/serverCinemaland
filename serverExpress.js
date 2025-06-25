const express = require("express");
const app = express();
const HOSTNAME = "0.0.0.0";
const PORT = 3000;

const routerSucursal = require("./routers/RouterSucursales");
const routerAsiento = require("./routers/RouterAsientos");
const routerHorario = require("./routers/RouterHorarios");

//Routers
app.use("/api/sucursales", routerSucursal);
app.use("/api/asientos", routerAsiento);
app.use("/api/horarios", routerHorario);

//Metodos HTTP
app.get("/", (req, res) => {
  res.send("<h1>Servidor CinemaLand</h1>");
});

app.get("/{*any}", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.status(404);
  res.send("Ups! La ruta no existe.");
});

app.listen(PORT, HOSTNAME, () => {
  console.log(
    `El servidor Express está corriendo en http://${HOSTNAME}:${PORT}/`
  );
});
