const dotenv = require('dotenv')

dotenv.config();

const configDB = {
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
    server: process.env.SERVER_NAME,
    port: parseInt(process.env.PORT_DB),
    options: {
        trustServerCertificate: true
    }
}

module.exports = { configDB }