const express = require('express')
const getData = require('./app')

const app = express()

app.listen(3000)

app.use(express.json())

app.get('/', (req, res) => {       
    res.status(200).send('Home')
})

app.get('/presidents', async (req, res) => {
    try {
        const data = await getData()    
        res.status(200).send(data)        
    } catch (error) {
        res.status(500).send({message: error})     
    }
})

app.get('/presidents/:number', async (req, res) => {
    try {
        const data = await getData()
        let presidentNum = data.filter(president => president.number == req.params.number)       
        if(presidentNum.length === 0) throw new Error
        res.status(200).send(presidentNum)        
    } catch (error) {
        res.status(500).send({message: 'This president number does not exist'})        
    }
})

