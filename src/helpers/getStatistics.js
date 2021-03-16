const { Pool } = require('pg')
const { USER_PG, HOST_PG, NAME_PG, PASSWORD_PG, PORT_PG } = process.env

const postgreConfig = {
    user: USER_PG,
    host: HOST_PG,
    database: NAME_PG,
    password: PASSWORD_PG,
    port: PORT_PG
}

module.exports = async (ip, path) => {
    const pool = new Pool(postgreConfig)

    let sqlQuery = 'SELECT * FROM use_statistic'

    if (ip) sqlQuery += ` WHERE ip_origin='${ip}'`

    if (path) {
        const pre = ip ? ' AND ' : ' WHERE '
        sqlQuery += `${pre}path_destination='${path}'`
    }

    try {
        const { rows } = await pool.query(sqlQuery)
        pool.end()

        return rows
    } catch (error) {
        console.log(error)
    }
}
