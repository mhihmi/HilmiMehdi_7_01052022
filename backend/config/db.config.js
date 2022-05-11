require('dotenv').config()

module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
    DB: process.env.DB_NAME,
    dialect: "mysql",
    pool: {
        max: 30, // Maximum number of connection in pool
        min: 0, // Minimum number of connection in pool
        acquire: 30000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 60000 // The maximum time, in milliseconds, that a connection can be idle before being released.
    }
}