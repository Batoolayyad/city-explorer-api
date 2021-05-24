'use strict'

const express=require ('express');
const weatherData=require('./data/weather.json')
const cors=require('cors');
require('dotenv').config();

const server=express();
server.use(cors());

const PORT = process.env.PORT;

server.get('/test',(req,res)=>{
    res.send('ghhyjgku')
})
// http://localhost:3001/weather?city_name=Amman
server.get('/weather',(req,res)=>{
    let cityData = req.query.city_name;
    let searchQuery = weatherData.find(item=>{
        if (item.city_name == cityData){
            return item;
        }
    })
    res.send(searchQuery)
})
server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})

