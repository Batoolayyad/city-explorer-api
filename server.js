'use strict'

require('dotenv').config();
const express = require ('express');
const server =express();
const weatherData =require('./weather.json')
const cors = require('cors');
const PORT = process.env.PORT
server.use(cors())

// server.get('/' , (req , res)=>{
//     let test='hello from me'
//     res.send(test)
// })http://localhost:3001/getweather?city_name=Amman
server.get('/getWeather', (req, res) => {
    console.log(req.query)
    let weatherCity= req.query.city_name
    let wetherItem = weatherData.find(item => {
        if (item.city_name == weatherCity)
            return item
    })
    res.send(wetherItem)
})


server.get('*', (req, res) => {
    res.status(500).send('the weather for this city is not found');
})


server.listen(PORT, () =>{
    console.log(`listiningg on PORT ${PORT}`)
})
