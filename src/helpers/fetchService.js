const axios = require('axios')
const path = require('path')

const { readFileSync } = require('fs')

module.exports = async (axiosConfig) => {
    const response = await axios(axiosConfig)

    // const { url } = axiosConfig
    // const dataPath = path.join(__dirname, `../../mock${url}.json`)
    // const { data: response } = JSON.parse(readFileSync(dataPath, 'utf8'))

    return response
}
