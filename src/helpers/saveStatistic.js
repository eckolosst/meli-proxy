const { Pool } = require('pg')
const { USER_PG, HOST_PG, NAME_PG, PASSWORD_PG, PORT_PG } = process.env

const postgreConfig = {
    user: USER_PG,
    host: HOST_PG,
    database: NAME_PG,
    password: PASSWORD_PG,
    port: PORT_PG
}

module.exports = async (ip, path, httpMethod) => {
    const pool = new Pool(postgreConfig)

    const sqlQuery = `INSERT INTO use_statistic (ip_origin, path_destination, http_method)
                VALUES ($1, $2, $3);`

    const values = [ip, path, httpMethod]

    try {
        await pool.query(sqlQuery, values)
        pool.end()
    } catch (error) {
        console.log(error)
    }
}
