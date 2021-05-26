'use strict'

require('dotenv').config();
const express = require('express');
const server = express();
const weatherData = require('./data/weather.json')
const cors = require('cors');
const PORT = process.env.PORT
server.use(cors())


server.get('/test' , (req , res)=>{
    let test='test'
    res.send(test)})


class Forecast {
    constructor(item) {
        this.date = item.valid_date ;
        this.description = item.weather.description;
    }
}

//http://localhost:3001/weather?city_name=Amman
server.get('/weather', (req, res) => {
    // console.log(req.query)
    let cityName = req.query.city_name;
    let lat = req.query.lati;
    // let lon = req.query.lon;
    let searchQuery = weatherData.find(item => {
        if (cityName.toLowerCase() == item.city_name.toLowerCase())
            return item;
    })
   console.log(searchQuery );
    try {
        let date;
        let description;
        let newforecast;
        
       let forecastArr= searchQuery.data.map(item=>{
            // date= item.valid_date
            // description=item.weather.description
        return new Forecast(item);
        // return newforecast;
        })
    //     for (let i = 0; i < searchQuery.data.length; i++) {
    //         date = searchQuery.data[i].valid_date;
    //         description = `Low of ${searchQuery.data[i].low_temp}, high of ${searchQuery.data[i].max_temp} with ${searchQuery.data[i].weather.description}, date: ${date}`;
    //         newforecast = new Forecast(date, description);
    //         forecastArr.push(newforecast);
    //     }
         res.send(forecastArr);
    } 
    catch (errors) {

        res.send('error: the informition that you searched for it are not found');
    }
})
server.get('*', (req, res) => {
    res.send('not found');
    })

server.listen(PORT, ()=>{
    console.log(`listtening on PORT ${PORT}`)
})
