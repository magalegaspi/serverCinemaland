const express = require('express')
const app = express()
const HOSTNAME = '127.0.0.1';
const PORT = 3000;

// CAMBIAR
const routerSucursal = require('./routers/RouterSucursales');
//const routerApiPrincipal = require('./routers/RouterApiPrincipal');

// CAMBIAR
//Routers
app.use('/api/sucursales', routerSucursal);
//app.use('/api', routerApiPrincipal);


//Metodos HTTP
app.get('/', (req, res) => {
    res.send('<h1>Servidor CinemaLand</h1>')
})

app.get('/{*any}', (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    res.status(404)
    res.send("Ups! La ruta no existe.")
})

app.listen(PORT, HOSTNAME, () => {
    console.log(`El servidor Express está corriendo en http://${HOSTNAME}:${PORT}/`);
});
