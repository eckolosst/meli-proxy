require('dotenv').config()
const express = require('express')

const fetchService = require('./src/helpers/fetchService')
const getStatistics = require('./src/helpers/getStatistics')
const saveStatistic = require('./src/helpers/saveStatistic')

const app = express()

const { PORT, PROXY_DOMAIN } = process.env

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/statistics', async (req, res) => {
    const {
        query: { ip, path }
    } = req

    const data = await getStatistics(ip, path)

    res.render('statistics.pug', { data })
})

app.all('/*', async (req, res) => {
    const { originalUrl, method, body, headers } = req
    const ip = req.headers['x-forwarded-for'] || req.ip
    // TODO: Authentication is needed?
    // TODO: save the response in cache

    const config = {
        method,
        baseURL: PROXY_DOMAIN,
        headers,
        url: originalUrl,
        data: body
    }

    try {
        const { data } = await fetchService(config)

        saveStatistic(ip, originalUrl, method)

        res.send(data)
    } catch (error) {
        const { message, response } = error
        let status = 500

        if (response) status = response.status

        res.status(status).send(message)
    }
})

app.listen(PORT, () => {
    console.log(`MeLi proxy listening at http://localhost:${PORT}`)
})
