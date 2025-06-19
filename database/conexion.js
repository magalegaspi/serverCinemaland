const sql = require('mssql');
const configDB = require('./config').configDB;

const getSQLConnection = async () => {
    console.log("invocando el método getSQLConnection");
    try {
        const pool = await sql.connect(configDB);

        // Ejemplo de consulta (opcional):
        // const resultado = await pool.request().query('SELECT TOP 1 * FROM Lenguajes');
        // console.log(resultado.recordset);

        return pool;
    } catch (error) {
        console.log("Error en getConnection: " + error);
    }
};

// Ejecutar si querés probar directamente
getSQLConnection();

// Exportar para usar en otros módulos
exports.getSQLConnection = getSQLConnection;
