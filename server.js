'use strict'

require('dotenv').config();
const express = require ('express');
const server =express();
const weatherData =require('./data/weather.json')
const cors = require('cors');
const PORT = process.env.PORT
server.use(cors())

// server.get('/' , (req , res)=>{
//     let test='hello from me'
//     res.send(test)
// })http://localhost:3001/getweather?city_name=Amman
server.get('/getWeather', (req, res) => {
    console.log(req.query)
    let cityName= req.query.city_name
    let wetherItem = weatherData.find(item => {
        if (item.city_name == cityName)
            return item
    })
    res.send(wetherItem)
})


server.get('*', (req, res) => {
    res.send('not found');
})



server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})
