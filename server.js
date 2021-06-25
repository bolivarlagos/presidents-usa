const express = require('express')
const getData = require('./app')

const app = express()

app.listen(3000)

app.get('/', (req, res) => {       
    res.send('Home')
})

app.get('/presidents', async (req, res) => {
    const data = await getData()    
    res.send(data)
})

