const express = require("express");
const app = express();
const HOSTNAME = "0.0.0.0";
const PORT = 3000;

const routerSucursal = require("./routers/RouterSucursales");
const routerAsiento = require("./routers/RouterAsientos");

//Routers
app.use("/api/sucursales", routerSucursal);
app.use("/api/asientos", routerAsiento);

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
