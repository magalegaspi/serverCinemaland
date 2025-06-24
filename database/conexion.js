const sql = require("mssql");
const configDB = require("./config").configDB;

const getSQLConnection = async () => {
  console.log("invocando el método getSQLConnection");
  try {
    const pool = await sql.connect(configDB);

    console.log("Servidor funcionando: " + JSON.stringify(pool));

    return pool;
  } catch (error) {
    console.log("Error en getConnection: " + error);
  }
};

getSQLConnection();

exports.getSQLConnection = getSQLConnection;
